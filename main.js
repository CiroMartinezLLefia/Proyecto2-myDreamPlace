// main.js - Core application engine for my Dream Place

document.addEventListener('DOMContentLoaded', () => {
  initNavbarSync();

  // Detect and route to the correct page renderer
  if (document.getElementById('destinations-grid')) {
    renderHomePage();
  } else if (document.getElementById('results-container')) {
    renderSearchResultsPage();
  } else if (document.getElementById('gallery-container')) {
    renderProductDetailPage();
  } else if (document.getElementById('checkout-complete-btn')) {
    renderCheckoutPage();
  } else if (document.getElementById('booked-trips-container')) {
    renderMyTripsPage();
  }
});

// Helper to generate star HTML depending on page context
function renderStarsHTML(rating, pageType) {
  let html = '';
  const rounded = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < rounded) {
      if (pageType === 'detail') {
        html += `<img class="hotel-header__star" src="imgs/Star.png" alt="" />`;
      } else if (pageType === 'trips' || pageType === 'checkout') {
        html += `<img class="star star--full" src="imgs/Star.png" alt="" />`;
      } else {
        html += `<img class="result-card__star star-filled" src="imgs/Star.png" alt="" />`;
      }
    } else if (i === rounded && hasHalf) {
      if (pageType === 'detail') {
        html += `<img class="hotel-header__star" style="opacity:.5" src="imgs/Star.png" alt="" />`;
      } else if (pageType === 'trips' || pageType === 'checkout') {
        html += `<img class="star star--half" src="imgs/Star.png" alt="" />`;
      } else {
        html += `<img class="result-card__star star-half" src="imgs/Star.png" alt="" />`;
      }
    } else {
      if (pageType === 'detail') {
        html += `<img class="hotel-header__star" style="opacity:.2" src="imgs/Star.png" alt="" />`;
      } else if (pageType === 'trips' || pageType === 'checkout') {
        html += `<img class="star" style="opacity:.2" src="imgs/Star.png" alt="" />`;
      } else {
        html += `<img class="result-card__star" style="opacity:.2" src="imgs/Star.png" alt="" />`;
      }
    }
  }
  return html;
}

// Keep the search bars inputs synced across navigation click-throughs
function initNavbarSync() {
  // Try to parse values from URL parameters and set inputs
  const params = new URLSearchParams(window.location.search);
  const destVal = params.get('destination');
  if (destVal) {
    const inputs = document.querySelectorAll('.search-bar__input, .hero-search__input');
    inputs.forEach(input => {
      if (input.placeholder && input.placeholder.includes('going')) {
        input.value = destVal;
      } else if (input.getAttribute('aria-label') === 'Destination') {
        input.value = destVal;
      }
    });
  }
}

/* ==========================================================================
   HOME PAGE (index.html) RENDERER
   ========================================================================== */
function renderHomePage() {
  const data = window.myDreamPlaceData;
  if (!data) return;

  // 1. Render Destinations
  const destGrid = document.getElementById('destinations-grid');
  if (destGrid) {
    destGrid.innerHTML = '';
    data.destinations.forEach(dest => {
      const card = document.createElement('a');
      card.href = `search-results.html?destination=${encodeURIComponent(dest.name)}`;
      card.innerHTML = `
        <article class="destination-card">
          <div class="destination-card__img-wrap">
            <img class="destination-card__img" src="${dest.image}" alt="${dest.alt}" />
          </div>
          <h3 class="destination-card__name">${dest.name}</h3>
          <p class="destination-card__count">${dest.properties} properties</p>
        </article>
      `;
      destGrid.appendChild(card);
    });
  }

  // 2. Render Popular Hotels
  const hotelsGrid = document.getElementById('hotels-grid');
  if (hotelsGrid) {
    hotelsGrid.innerHTML = '';
    const popularHotels = data.hotels.filter(h => h.popular);
    popularHotels.forEach(hotel => {
      const card = document.createElement('a');
      card.href = `product-detail.html?hotel=${hotel.id}`;
      card.innerHTML = `
        <article class="hotel-card">
          <div class="hotel-card__img-wrap">
            <img class="hotel-card__img" src="${hotel.image}" alt="${hotel.name} exterior view" />
          </div>
          <h3 class="hotel-card__name">${hotel.name}</h3>
          <p class="hotel-card__count">${hotel.reviews} reviews</p>
        </article>
      `;
      hotelsGrid.appendChild(card);
    });
  }

  // 3. Render Inspirations
  const inspirationsGrid = document.getElementById('inspirations-grid');
  if (inspirationsGrid) {
    inspirationsGrid.innerHTML = '';
    data.inspirations.forEach(ins => {
      const card = document.createElement('article');
      card.className = 'inspiration-card';
      card.innerHTML = `
        <img class="inspiration-card__img" src="${ins.image}" alt="${ins.alt}" />
        <div class="inspiration-card__overlay" aria-hidden="true"></div>
        <div class="inspiration-card__content">
          <h3 class="inspiration-card__title">${ins.title}</h3>
          <p class="inspiration-card__desc">${ins.description}</p>
        </div>
      `;
      inspirationsGrid.appendChild(card);
    });
  }
}

/* ==========================================================================
   SEARCH RESULTS PAGE (search-results.html) RENDERER
   ========================================================================== */
function renderSearchResultsPage() {
  const data = window.myDreamPlaceData;
  if (!data) return;

  const params = new URLSearchParams(window.location.search);
  const searchDestination = params.get('destination') || 'Melbourne';

  // Filters State
  let textQuery = '';
  let selectedRating = null;
  const activeBudgets = new Set();
  let activeType = 'Our top picks'; // default tab
  let currentSort = 'Recommended';

  // Grab nodes
  const resultsContainer = document.getElementById('results-container');
  const titleText = document.getElementById('results-title-text');
  const nameFilter = document.getElementById('name-filter');
  const budgetFilters = document.getElementById('budget-filters');
  const ratingFilters = document.getElementById('rating-filters');
  const sortSelect = document.getElementById('sort-select');
  const typeTabsContainer = document.getElementById('type-tabs');

  // Initialize tabs UI
  if (typeTabsContainer) {
    typeTabsContainer.innerHTML = `
      <button class="filter-tab active" role="tab" aria-selected="true" data-type="Our top picks">Our top picks</button>
      <button class="filter-tab" role="tab" aria-selected="false" data-type="hotel">Hotel and apartments</button>
      <button class="filter-tab" role="tab" aria-selected="false" data-type="residence">Residence</button>
      <button class="filter-tab" role="tab" aria-selected="false" data-type="resort">Resort</button>
      <button class="filter-tab" role="tab" aria-selected="false" data-type="shared space">Shared Space</button>
    `;

    typeTabsContainer.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        typeTabsContainer.querySelectorAll('.filter-tab').forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        activeType = tab.getAttribute('data-type');
        filterAndRender();
      });
    });
  }

  // Setup Listeners
  if (nameFilter) {
    nameFilter.addEventListener('input', (e) => {
      textQuery = e.target.value.trim().toLowerCase();
      filterAndRender();
    });
  }

  if (budgetFilters) {
    // We bind change events to standard checkboxes
    budgetFilters.addEventListener('change', () => {
      activeBudgets.clear();
      const checkboxes = budgetFilters.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((cb, index) => {
        if (cb.checked) {
          // ranges index-based mapping:
          // 0: 0-200, 1: 200-500, 2: 500-1000, 3: 1000-2000, 4: 2000-5000
          activeBudgets.add(index);
        }
      });
      filterAndRender();
    });
  }

  if (ratingFilters) {
    const buttons = ratingFilters.querySelectorAll('.rating-btn');
    buttons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        // Toggle selected rating
        const ratingVal = index + 1;
        if (selectedRating === ratingVal) {
          selectedRating = null;
          btn.classList.remove('active');
        } else {
          selectedRating = ratingVal;
          buttons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        }
        filterAndRender();
      });
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      filterAndRender();
    });
  }

  // Filter and Render Core Function
  function filterAndRender() {
    let filtered = [...data.hotels];

    // Filter by destination name (Melbourne vs others)
    // For general prototype usage, let's keep all hotels if searchDestination isn't specifically matched in database,
    // but if it matches Melbourne, show melbourne-associated properties.
    if (searchDestination.toLowerCase() !== 'all') {
      filtered = filtered.filter(h => h.location.toLowerCase() === searchDestination.toLowerCase());
    }

    // 1. Text Search Name
    if (textQuery) {
      filtered = filtered.filter(h => h.name.toLowerCase().includes(textQuery));
    }

    // 2. Rating Filter (more than selectedRating)
    if (selectedRating !== null) {
      filtered = filtered.filter(h => h.rating >= selectedRating);
    }

    // 3. Budget Filter
    if (activeBudgets.size > 0) {
      filtered = filtered.filter(h => {
        const price = h.pricePerNight;
        let matched = false;
        activeBudgets.forEach(rangeIdx => {
          if (rangeIdx === 0 && price <= 200) matched = true;
          if (rangeIdx === 1 && price > 200 && price <= 500) matched = true;
          if (rangeIdx === 2 && price > 500 && price <= 1000) matched = true;
          if (rangeIdx === 3 && price > 1000 && price <= 2000) matched = true;
          if (rangeIdx === 4 && price > 2000 && price <= 5000) matched = true;
        });
        return matched;
      });
    }

    // 4. Type Tab Filter
    if (activeType !== 'Our top picks') {
      filtered = filtered.filter(h => h.type.toLowerCase() === activeType.toLowerCase());
    }

    // 5. Sorting
    if (currentSort === 'Price: Low to High') {
      filtered.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (currentSort === 'Price: High to Low') {
      filtered.sort((a, b) => b.pricePerNight - a.pricePerNight);
    } else if (currentSort === 'Rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    // Update title text
    if (titleText) {
      titleText.textContent = `${searchDestination} : ${filtered.length} search results found`;
    }

    // Render cards
    if (resultsContainer) {
      resultsContainer.innerHTML = '';
      if (filtered.length === 0) {
        resultsContainer.innerHTML = `
          <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
            <p style="font-size: 1.2rem; margin-bottom: 8px;">No hotels match your filters</p>
            <p style="font-size: 0.9rem;">Try adjusting your search criteria in the sidebar.</p>
          </div>
        `;
        return;
      }

      filtered.forEach(hotel => {
        let promoBadgeHTML = '';
        if (hotel.promoBadge) {
          const isRestaurant = hotel.promoBadge.toLowerCase().includes('restaurant');
          const badgeClass = isRestaurant ? 'result-card__restaurant-badge' : 'result-card__promo-badge';
          promoBadgeHTML = `<span class="${badgeClass}">${hotel.promoBadge}</span>`;
        }

        const card = document.createElement('article');
        card.className = 'result-card';
        card.innerHTML = `
          <div class="result-card__img-wrap">
            <img class="result-card__img" src="${hotel.image}" alt="${hotel.name} view" />
          </div>
          <div class="result-card__body">
            <h2 class="result-card__name">${hotel.name}</h2>
            <div class="result-card__stars">
              ${renderStarsHTML(hotel.rating, 'results')}
              <span class="result-card__rating-text">${hotel.rating} (${hotel.reviews} Reviews)</span>
            </div>
            <p class="result-card__desc">Live a little and celebrate with champagne</p>
            <p class="result-card__desc">Reats include a glass of French champagne, parking and a late checkout. Gym included. Flexible cancellation applies</p>
            <a href="product-detail.html?hotel=${hotel.id}" class="result-card__avail-btn">See availability</a>
          </div>
          <div class="result-card__price-col">
            <div class="result-card__price-top">
              ${promoBadgeHTML}
            </div>
            <div class="result-card__price-bottom">
              ${hotel.pricePerNightOriginal ? `<span class="result-card__discount-badge">${hotel.discountBadge || ''}</span>` : ''}
              <div class="result-card__room-meta">1 room 2 days</div>
              <div class="result-card__price-wrap">
                ${hotel.pricePerNightOriginal ? `<span class="result-card__price-original">$${hotel.pricePerNightOriginal}</span>` : ''}
                <span class="result-card__price">$${hotel.pricePerNight}</span>
              </div>
              <div class="result-card__price-note">Includes taxes and fees</div>
            </div>
          </div>
        `;
        resultsContainer.appendChild(card);
      });
    }
  }

  // Initial call
  filterAndRender();
}

/* ==========================================================================
   PRODUCT DETAIL PAGE (product-detail.html) RENDERER
   ========================================================================== */
function renderProductDetailPage() {
  const data = window.myDreamPlaceData;
  if (!data) return;

  const params = new URLSearchParams(window.location.search);
  const hotelId = params.get('hotel') || 'lakeside-motel';

  const hotel = data.hotels.find(h => h.id === hotelId) || data.hotels[0];
  if (!hotel) return;

  // 1. Update text fields
  const hotelNameEl = document.getElementById('hotel-name');
  if (hotelNameEl) hotelNameEl.textContent = hotel.name;

  const hotelStarsEl = document.getElementById('hotel-stars');
  if (hotelStarsEl) {
    hotelStarsEl.innerHTML = `
      ${renderStarsHTML(hotel.rating, 'detail')}
      <span class="hotel-header__rating">${hotel.rating} (${hotel.reviews} Reviews)</span>
    `;
  }

  const hotelAddressEl = document.getElementById('hotel-address');
  if (hotelAddressEl) {
    hotelAddressEl.innerHTML = `
      <img class="hotel-header__address-icon" src="imgs/LocationBlue.png" alt="" aria-hidden="true" />
      ${hotel.address}
    `;
  }

  // 2. Gallery functionality
  const galleryMain = document.getElementById('gallery-main-img');
  const galleryThumbs = document.getElementById('gallery-thumbs');
  if (galleryMain && hotel.gallery && hotel.gallery.length > 0) {
    // Set initial main image
    galleryMain.innerHTML = `<img src="${hotel.gallery[0]}" alt="${hotel.name} main photo" />`;

    // Render thumbnails
    if (galleryThumbs) {
      galleryThumbs.innerHTML = '';
      hotel.gallery.forEach((imgSrc, idx) => {
        const thumbDiv = document.createElement('div');
        thumbDiv.className = `gallery__thumb ${idx === 0 ? 'gallery__thumb--active' : ''}`;
        thumbDiv.innerHTML = `<img src="${imgSrc}" alt="${hotel.name} thumbnail ${idx + 1}" />`;
        
        // click event to swap image and class
        thumbDiv.addEventListener('click', () => {
          galleryMain.querySelector('img').src = imgSrc;
          galleryThumbs.querySelectorAll('.gallery__thumb').forEach(t => t.classList.remove('gallery__thumb--active'));
          thumbDiv.classList.add('gallery__thumb--active');
        });

        galleryThumbs.appendChild(thumbDiv);
      });
    }
  }

  // 3. Overview box text
  const overviewParas = document.getElementById('overview-paragraphs');
  if (overviewParas && hotel.overview) {
    overviewParas.innerHTML = '';
    hotel.overview.forEach(text => {
      const p = document.createElement('p');
      p.className = 'overview-box__text';
      p.textContent = text;
      overviewParas.appendChild(p);
    });
  }

  // 4. Facilities list
  const facilitiesGrid = document.getElementById('facilities-grid');
  if (facilitiesGrid && hotel.facilities) {
    facilitiesGrid.innerHTML = '';
    hotel.facilities.forEach(fac => {
      const facDiv = document.createElement('div');
      facDiv.className = 'facility-item';
      facDiv.innerHTML = `<span class="facility-item__icon">${fac.icon}</span> ${fac.name}`;
      facilitiesGrid.appendChild(facDiv);
    });
  }

  // 5. Map box
  const mapImg = document.getElementById('map-img');
  if (mapImg) {
    mapImg.src = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(hotel.location + ',' + hotel.name)}&zoom=13&size=600x400&maptype=roadmap&key=AIzaSyD-PLACEHOLDER`;
  }

  // 6. Explore Area
  const exploreGrid = document.getElementById('explore-grid');
  if (exploreGrid && hotel.explore) {
    exploreGrid.innerHTML = '';
    hotel.explore.forEach(exp => {
      const row = document.createElement('div');
      row.className = 'explore-row';
      row.innerHTML = `
        <div class="explore-row__place">
          <img class="explore-row__icon" src="${exp.icon}" alt="" aria-hidden="true" />
          ${exp.name}
        </div>
        <div class="explore-row__dist">${exp.distance}</div>
      `;
      exploreGrid.appendChild(row);
    });
  }

  // 7. Rooms grid
  const roomsGrid = document.getElementById('rooms-grid');
  if (roomsGrid && hotel.rooms) {
    roomsGrid.innerHTML = '';

    // Add Orlando promo card first
    const promoCard = document.createElement('div');
    promoCard.className = 'promo-card';
    promoCard.setAttribute('aria-label', 'Promotional offer');
    promoCard.style.padding = '0';
    promoCard.style.background = 'none';
    promoCard.innerHTML = `
      <img src="imgs/promo.png" alt="Promotional offer: 20% off. Use Promotional Coupon Code: Orlando" style="width: 100%; height: 100%; object-fit: cover;" />
    `;
    roomsGrid.appendChild(promoCard);

    // Add rooms
    hotel.rooms.forEach(room => {
      const roomCard = document.createElement('article');
      roomCard.className = 'room-card';
      roomCard.innerHTML = `
        <img class="room-card__img" src="${room.image}" alt="${room.name}" />
        <div class="room-card__body">
          <h3 class="room-card__name">${room.name}</h3>
          <div class="room-card__meta">
            <div class="room-card__meta-item"><span class="room-card__meta-icon">📐</span> ${room.size}</div>
            <div class="room-card__meta-item"><span class="room-card__meta-icon">🛏</span> ${room.sleeps}</div>
            <div class="room-card__meta-item"><span class="room-card__meta-icon">🛏</span> ${room.beds}</div>
          </div>
          <a href="checkout.html?hotel=${hotel.id}&room=${room.id}" class="room-card__reserve-btn">Reserve suite</a>
        </div>
      `;
      roomsGrid.appendChild(roomCard);
    });
  }
}

/* ==========================================================================
   CHECKOUT PAGE (checkout.html) RENDERER
   ========================================================================== */
function renderCheckoutPage() {
  const data = window.myDreamPlaceData;
  if (!data) return;

  const params = new URLSearchParams(window.location.search);
  const hotelId = params.get('hotel') || 'lakeside-motel';
  const roomId = params.get('room') || 'twin-multiple';

  const hotel = data.hotels.find(h => h.id === hotelId) || data.hotels[0];
  if (!hotel) return;

  const room = hotel.rooms.find(r => r.id === roomId) || hotel.rooms[0];
  if (!room) return;

  // 1. Update Subtitle info
  const subtitleEl = document.getElementById('room-details-subtitle');
  if (subtitleEl) {
    subtitleEl.textContent = `${room.sleeps}, ${room.beds}, Non-smoking`;
  }

  // 2. Update Hotel Summary Sidebar
  const summaryLink = document.getElementById('checkout-summary-link');
  if (summaryLink) summaryLink.href = `product-detail.html?hotel=${hotel.id}`;

  const summaryImg = document.getElementById('checkout-hotel-image');
  if (summaryImg) {
    summaryImg.src = hotel.image;
    summaryImg.alt = `${hotel.name} exterior`;
  }

  const summaryTitle = document.getElementById('checkout-hotel-title');
  if (summaryTitle) summaryTitle.textContent = hotel.name;

  const summaryRating = document.getElementById('checkout-hotel-rating');
  if (summaryRating) summaryRating.textContent = `${hotel.rating} (${hotel.reviews} Reviews)`;

  const summaryStars = document.getElementById('checkout-hotel-stars');
  if (summaryStars) {
    summaryStars.innerHTML = renderStarsHTML(hotel.rating, 'checkout');
  }

  // 3. Price details dynamic calculation
  const nights = 2; // Default stay length
  const subtotal = room.pricePerNight * nights;
  const taxes = Math.round(subtotal * 0.15); // 15% taxes
  let total = subtotal + taxes;
  let isCouponApplied = false;
  let discount = 0;

  const roomLabel = document.getElementById('checkout-price-room-label');
  if (roomLabel) roomLabel.textContent = `1 room x ${nights} nights`;

  const roomValue = document.getElementById('checkout-price-room-value');
  if (roomValue) roomValue.textContent = `$${subtotal}`;

  const taxesValue = document.getElementById('checkout-price-taxes-value');
  if (taxesValue) taxesValue.textContent = `$${taxes}`;

  const totalValue = document.getElementById('checkout-price-total-value');
  if (totalValue) totalValue.textContent = `$${total}`;

  // 4. Coupon features
  const couponToggle = document.getElementById('coupon-toggle');
  const couponContainer = document.getElementById('coupon-container');
  if (couponToggle && couponContainer) {
    // Hide coupon container initially, show on click
    couponContainer.style.display = 'none';
    couponToggle.addEventListener('click', (e) => {
      e.preventDefault();
      couponContainer.style.display = couponContainer.style.display === 'none' ? 'block' : 'none';
    });
  }

  const couponApplyBtn = document.getElementById('coupon-apply-btn');
  const couponCodeInput = document.getElementById('coupon-code');
  const couponMsg = document.getElementById('coupon-msg');
  const discountRow = document.getElementById('checkout-discount-row');
  const discountValue = document.getElementById('checkout-price-discount-value');

  if (couponApplyBtn && couponCodeInput && couponMsg) {
    couponApplyBtn.addEventListener('click', () => {
      const code = couponCodeInput.value.trim().toLowerCase();
      if (code === 'orlando') {
        isCouponApplied = true;
        discount = Math.round(total * 0.20); // 20% discount
        const finalPrice = total - discount;

        // Update display
        if (discountRow) discountRow.style.display = 'flex';
        if (discountValue) discountValue.textContent = `-$${discount}`;
        if (totalValue) totalValue.textContent = `$${finalPrice}`;

        couponMsg.textContent = 'Coupon applied successfully! 20% off total price.';
        couponMsg.style.color = '#10B981';
        couponMsg.style.display = 'block';
      } else {
        // Reset discount
        isCouponApplied = false;
        discount = 0;
        if (discountRow) discountRow.style.display = 'none';
        if (totalValue) totalValue.textContent = `$${total}`;

        couponMsg.textContent = 'Invalid coupon code. Try code "Orlando".';
        couponMsg.style.color = '#EF4444';
        couponMsg.style.display = 'block';
      }
    });
  }

  // 5. Complete Booking
  const completeBtn = document.getElementById('checkout-complete-btn');
  if (completeBtn) {
    completeBtn.addEventListener('click', (e) => {
      e.preventDefault();

      // Retrieve names and validate basics
      const firstName = document.getElementById('first-name').value.trim() || 'Guest';
      const lastName = document.getElementById('last-name').value.trim() || 'User';

      // Assemble new booked trip
      const newTrip = {
        hotelId: hotel.id,
        roomId: room.id,
        checkIn: "Sunday, March 18, 2026",
        checkOut: "Tuesday, March 20, 2026",
        nights: nights,
        pricePaid: isCouponApplied ? (total - discount) : total,
        originalPrice: subtotal + taxes,
        guests: "2 adults, 1 room",
        firstName: firstName,
        lastName: lastName
      };

      // Add to localStorage
      const bookedTrips = JSON.parse(localStorage.getItem('bookedTrips') || '[]');
      bookedTrips.push(newTrip);
      localStorage.setItem('bookedTrips', JSON.stringify(bookedTrips));

      // Redirect to my trips
      window.location.href = 'my-trips.html';
    });
  }
}

/* ==========================================================================
   MY TRIPS PAGE (my-trips.html) RENDERER
   ========================================================================== */
function renderMyTripsPage() {
  const data = window.myDreamPlaceData;
  if (!data) return;

  const bookedContainer = document.getElementById('booked-trips-container');
  if (bookedContainer) {
    bookedContainer.innerHTML = '';

    // Load booked trips
    let bookedTrips = JSON.parse(localStorage.getItem('bookedTrips') || '[]');

    // If empty, seed with default initial trips from data.js
    if (bookedTrips.length === 0) {
      bookedTrips = [...data.defaultTrips];
    }

    bookedTrips.forEach(trip => {
      // Find corresponding hotel and room
      const hotel = data.hotels.find(h => h.id === trip.hotelId) || data.hotels[0];
      const room = hotel.rooms.find(r => r.id === trip.roomId) || hotel.rooms[0];

      const article = document.createElement('article');
      article.className = 'trip-card';
      article.innerHTML = `
        <img class="trip-card__image" src="${hotel.image}" alt="${hotel.name} exterior view">

        <div class="trip-card__content">
          <div class="trip-card__details">
            <h2 class="trip-card__title">${hotel.name}</h2>

            <div class="trip-card__rating">
              <div class="trip-card__stars" role="img" aria-label="Rating: ${hotel.rating} out of 5 stars">
                ${renderStarsHTML(hotel.rating, 'trips')}
              </div>
              <span class="trip-card__rating-text">${hotel.rating} (${hotel.reviews} Reviews)</span>
            </div>

            <p class="trip-card__refund">Non refundable</p>
            <p class="trip-card__date">Check in: ${trip.checkIn}</p>
            <p class="trip-card__date">Check out: ${trip.checkOut}</p>
            <p class="trip-card__nights">${trip.nights} night stay</p>
            <p class="trip-card__date" style="font-weight: 500; color: var(--text-primary);">Booked by: ${trip.firstName} ${trip.lastName}</p>
          </div>

          <div class="trip-card__price-section">
            <p class="trip-card__room-info">${trip.guests}</p>
            <p class="trip-card__price">
              ${trip.originalPrice > trip.pricePaid ? `<span class="trip-card__price-old">$${trip.originalPrice}</span>` : ''}
              <span class="trip-card__price-new">$${trip.pricePaid}</span>
            </p>
            <p class="trip-card__taxes">Includes taxes and fees</p>
            <a href="product-detail.html?hotel=${hotel.id}" class="trip-card__button">View trip details</a>
          </div>
        </div>
      `;
      bookedContainer.appendChild(article);
    });
  }

  // Render Based on History Destinations Grid
  const historyGrid = document.getElementById('history-destinations-grid');
  if (historyGrid) {
    historyGrid.innerHTML = '';
    data.destinations.forEach(dest => {
      const link = document.createElement('a');
      link.href = `search-results.html?destination=${encodeURIComponent(dest.name)}`;
      link.className = 'history__card-link';
      link.innerHTML = `
        <article class="history__card">
          <img class="history__image" src="${dest.image}" alt="${dest.alt}">
          <h3 class="history__card-title">${dest.name}</h3>
          <p class="history__card-subtitle">${dest.properties} properties</p>
        </article>
      `;
      historyGrid.appendChild(link);
    });
  }
}
