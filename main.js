// main.js - myDreamPlace Landing Page Controller

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize Welcome Modal
  initWelcomeModal();

  // Initialize Search Panel
  initSearchPanel();

  // Load and render page content
  await loadLandingPageData();
});

// ==========================================================================
// Toast Notification Utility
// ==========================================================================
function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  // Remove toast after delay
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 4000);
}

// ==========================================================================
// Welcome Modal Logic
// ==========================================================================
function initWelcomeModal() {
  const overlay = document.getElementById('welcome-modal-overlay');
  const closeBtn = document.getElementById('welcome-close-btn');

  if (!overlay || !closeBtn) return;

  const modalDismissed = localStorage.getItem('mydreamplace_welcome_dismissed');

  if (!modalDismissed) {
    // Show modal with a slight delay
    setTimeout(() => {
      overlay.classList.add('active');
    }, 800);
  }

  closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
    localStorage.setItem('mydreamplace_welcome_dismissed', 'true');
    showToast('Benvingut a myDreamPlace! Que tinguis un viatge fantàstic.');
  });
}

// ==========================================================================
// Search Panel Submissions
// ==========================================================================
function initSearchPanel() {
  const searchBtn = document.getElementById('search-submit-btn');
  if (!searchBtn) return;

  searchBtn.addEventListener('click', () => {
    const destination = document.getElementById('search-destination').value.trim();
    const checkin = document.getElementById('search-checkin').value;
    const checkout = document.getElementById('search-checkout').value;
    const guests = document.getElementById('search-guests').value || 1;

    if (!destination) {
      showToast('⚠️ Si us plau, introdueix una destinació per cercar.');
      document.getElementById('search-destination').focus();
      return;
    }

    let searchMsg = `🔍 Cercant allotjaments a "${destination}" per a ${guests} persona/es`;
    if (checkin) searchMsg += ` des del ${checkin}`;
    if (checkout) searchMsg += ` fins al ${checkout}`;
    
    showToast(searchMsg + '...');
    
    // Smooth scroll to hotels section to show results
    const hotelsSection = document.getElementById('hotels-section');
    if (hotelsSection) {
      hotelsSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// ==========================================================================
// Load and Render Data (Supabase with Local Fallback)
// ==========================================================================
async function loadLandingPageData() {
  const destContainer = document.getElementById('destinations-container');
  const inspContainer = document.getElementById('inspirations-container');
  const hotelsContainer = document.getElementById('hotels-container');

  // 1. Render Destinations
  if (destContainer) {
    try {
      const destinations = await window.db.getDestinations();
      destContainer.innerHTML = '';
      
      if (destinations.length === 0) {
        destContainer.innerHTML = '<div class="loading-placeholder">No hi ha destinacions disponibles.</div>';
      } else {
        destinations.forEach(dest => {
          const card = document.createElement('div');
          card.className = 'dest-card';
          card.id = `dest-${dest.id}`;
          card.innerHTML = `
            <div class="dest-img-wrapper">
              <img src="${dest.image_url}" alt="${dest.name}" class="dest-img" loading="lazy">
            </div>
            <div class="dest-info">
              <h3 class="dest-name">${dest.name}</h3>
              <p class="dest-count">${dest.properties_count.toLocaleString()} allotjaments</p>
            </div>
          `;
          
          // Add click event for demo
          card.addEventListener('click', () => {
            document.getElementById('search-destination').value = dest.name;
            showToast(`S'ha seleccionat la destinació: ${dest.name}`);
            const hero = document.getElementById('hero-section');
            if (hero) hero.scrollIntoView({ behavior: 'smooth' });
          });
          
          destContainer.appendChild(card);
        });
      }
    } catch (e) {
      console.error(e);
      destContainer.innerHTML = '<div class="loading-placeholder text-danger">Error al carregar destinacions.</div>';
    }
  }

  // 2. Render Inspirations
  if (inspContainer) {
    try {
      const inspirations = await window.db.getInspirations();
      inspContainer.innerHTML = '';

      if (inspirations.length === 0) {
        inspContainer.innerHTML = '<div class="loading-placeholder">No hi ha articles d\'inspiració.</div>';
      } else {
        inspirations.forEach(insp => {
          const card = document.createElement('article');
          card.className = 'insp-card';
          card.id = `insp-${insp.id}`;
          card.innerHTML = `
            <div class="insp-img-wrapper">
              <img src="${insp.image_url}" alt="${insp.title}" class="insp-img" loading="lazy">
            </div>
            <div class="insp-content">
              <h3 class="insp-title">${insp.title}</h3>
              <p class="insp-desc">${insp.description}</p>
            </div>
          `;
          inspContainer.appendChild(card);
        });
      }
    } catch (e) {
      console.error(e);
      inspContainer.innerHTML = '<div class="loading-placeholder text-danger">Error al carregar inspiració.</div>';
    }
  }

  // 3. Render Hotels
  if (hotelsContainer) {
    try {
      const hotels = await window.db.getHotels();
      hotelsContainer.innerHTML = '';

      if (hotels.length === 0) {
        hotelsContainer.innerHTML = '<div class="loading-placeholder">No hi ha allotjaments disponibles.</div>';
      } else {
        hotels.forEach(hotel => {
          const card = document.createElement('div');
          card.className = 'hotel-card';
          card.id = `hotel-${hotel.id}`;
          card.innerHTML = `
            <div class="hotel-img-wrapper">
              <img src="${hotel.image_url}" alt="${hotel.name}" class="hotel-img" loading="lazy">
            </div>
            <div class="hotel-content">
              <h3 class="hotel-name">${hotel.name}</h3>
              <p class="hotel-location">📍 ${hotel.location}</p>
              <div class="hotel-meta">
                <p class="hotel-price">$${hotel.price_per_night} <span>/ nit</span></p>
                <div class="hotel-rating-box">
                  <span class="star-icon">★</span>
                  <span class="rating-value">${hotel.rating.toFixed(1)}</span>
                  <span class="rating-count">(${hotel.reviews_count})</span>
                </div>
              </div>
            </div>
          `;
          
          card.addEventListener('click', () => {
            showToast(`Reserva a "${hotel.name}" disponible mitjançant l'Admin Panel.`);
          });
          
          hotelsContainer.appendChild(card);
        });
      }
    } catch (e) {
      console.error(e);
      hotelsContainer.innerHTML = '<div class="loading-placeholder text-danger">Error al carregar hotels.</div>';
    }
  }
}
