// admin.js - Admin CRUD Panel Controller (IA5)

let hotelsList = [];
let currentSearchQuery = '';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Initialize Supabase Config Panel Toggler
  initAccordion();

  // 2. Initialize database status & form values
  initDbConfigForm();

  // 3. Setup event listeners for search and modal actions
  setupListingsEvents();

  // 4. Load hotels table list
  await loadHotelsList();
});

// ==========================================================================
// Toast Notification System (Internal implementation for decoupling)
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
  }, 3500);
}

// ==========================================================================
// Accordion Toggle
// ==========================================================================
function initAccordion() {
  const toggleHeader = document.getElementById('config-toggle-header');
  const configBody = document.getElementById('config-fields-container');

  if (!toggleHeader || !configBody) return;

  toggleHeader.addEventListener('click', () => {
    toggleHeader.classList.toggle('active');
    configBody.classList.toggle('collapsed');
  });
}

// ==========================================================================
// Supabase Database Connection Config Form
// ==========================================================================
function initDbConfigForm() {
  const form = document.getElementById('db-config-form');
  const urlInput = document.getElementById('config-url-input');
  const keyInput = document.getElementById('config-key-input');
  const clearBtn = document.getElementById('config-clear-btn');
  const badge = document.getElementById('db-status-badge');
  const badgeText = document.getElementById('db-status-text');

  if (!form) return;

  // Load existing credentials
  const config = window.db.getSupabaseConfig();
  if (config.url && config.key) {
    urlInput.value = config.url;
    keyInput.value = config.key;
    
    // Update Connection Status Badge
    badge.className = 'db-status-badge supabase-connected';
    badgeText.textContent = 'Supabase Connectat';
  } else {
    // Default Mock Mode
    badge.className = 'db-status-badge mock-active';
    badgeText.textContent = 'Mode Local (Dades Simulades)';
  }

  // Handle connection submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = urlInput.value.trim();
    const key = keyInput.value.trim();

    if (!url || !key) {
      showToast('⚠️ Si us plau, omple ambdós camps de connexió.');
      return;
    }

    // Attempt configuration save
    window.db.saveSupabaseConfig(url, key);
    showToast('🔌 Connexió guardada. Reconnectant...');

    // Wait a brief moment and reload table listings
    setTimeout(async () => {
      location.reload();
    }, 500);
  });

  // Handle clear/disconnect button click
  clearBtn.addEventListener('click', () => {
    urlInput.value = '';
    keyInput.value = '';
    window.db.saveSupabaseConfig('', '');
    showToast('🔌 S\'ha restablert el mode de dades local.');

    setTimeout(() => {
      location.reload();
    }, 500);
  });
}

// ==========================================================================
// Setup Listings and CRUD Modal Handlers
// ==========================================================================
function setupListingsEvents() {
  const searchInput = document.getElementById('admin-search-input');
  const openModalBtn = document.getElementById('btn-open-add-modal');
  const modalOverlay = document.getElementById('hotel-modal-overlay');
  
  const closeBtnX = document.getElementById('hotel-modal-close-x');
  const cancelBtn = document.getElementById('hotel-modal-cancel-btn');
  const crudForm = document.getElementById('hotel-crud-form');

  // Input event on Search
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.toLowerCase().trim();
      renderTable();
    });
  }

  // Open Modal for adding
  if (openModalBtn) {
    openModalBtn.addEventListener('click', () => {
      openCrudModal();
    });
  }

  // Close modal events
  const closeModal = () => {
    modalOverlay.classList.remove('active');
  };

  if (closeBtnX) closeBtnX.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // CRUD Form submit handler
  if (crudForm) {
    crudForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await saveHotelForm();
    });
  }
}

// Open modal either in create or edit mode
function openCrudModal(hotelId = null) {
  const overlay = document.getElementById('hotel-modal-overlay');
  const formTitle = document.getElementById('hotel-modal-title');
  const form = document.getElementById('hotel-crud-form');
  
  // Fields
  const idInput = document.getElementById('hotel-id-input');
  const nameInput = document.getElementById('hotel-name-input');
  const locationInput = document.getElementById('hotel-location-input');
  const priceInput = document.getElementById('hotel-price-input');
  const ratingInput = document.getElementById('hotel-rating-input');
  const reviewsInput = document.getElementById('hotel-reviews-input');
  const imageSelect = document.getElementById('hotel-image-select');

  form.reset();
  
  if (hotelId) {
    // EDIT MODE
    const hotel = hotelsList.find(h => h.id === hotelId);
    if (!hotel) return;

    formTitle.textContent = "Editar Allotjament";
    idInput.value = hotel.id;
    nameInput.value = hotel.name;
    locationInput.value = hotel.location;
    priceInput.value = hotel.price_per_night;
    ratingInput.value = hotel.rating;
    reviewsInput.value = hotel.reviews_count;
    imageSelect.value = hotel.image_url;
  } else {
    // CREATE MODE
    formTitle.textContent = "Afegir Nou Allotjament";
    idInput.value = '';
  }

  overlay.classList.add('active');
  nameInput.focus();
}

// Save or Update Property
async function saveHotelForm() {
  const overlay = document.getElementById('hotel-modal-overlay');
  const idInput = document.getElementById('hotel-id-input').value;
  
  const nameVal = document.getElementById('hotel-name-input').value.trim();
  const locationVal = document.getElementById('hotel-location-input').value.trim();
  const priceVal = parseFloat(document.getElementById('hotel-price-input').value);
  const ratingVal = parseFloat(document.getElementById('hotel-rating-input').value);
  const reviewsVal = parseInt(document.getElementById('hotel-reviews-input').value, 10);
  const imageVal = document.getElementById('hotel-image-select').value;

  const hotelData = {
    name: nameVal,
    location: locationVal,
    price_per_night: priceVal,
    rating: ratingVal,
    reviews_count: reviewsVal,
    image_url: imageVal
  };

  let response;
  if (idInput) {
    // Update existing hotel
    response = await window.db.updateHotel(idInput, hotelData);
    if (response.success) {
      showToast(`S'han desat els canvis a "${nameVal}"`);
    }
  } else {
    // Add new hotel
    response = await window.db.addHotel(hotelData);
    if (response.success) {
      showToast(`S'ha creat l'allotjament "${nameVal}"`);
    }
  }

  if (response.success) {
    overlay.classList.remove('active');
    await loadHotelsList(); // Reload table
  } else {
    showToast(`⚠️ Error al desar: ${response.error || 'Problema de xarxa'}`);
  }
}

// Delete Property
async function handleDeleteHotel(id) {
  const hotel = hotelsList.find(h => h.id === id);
  if (!hotel) return;

  if (confirm(`Estàs segur que vols eliminar l'allotjament "${hotel.name}"?`)) {
    const response = await window.db.deleteHotel(id);
    if (response.success) {
      showToast(`S'ha eliminat l'allotjament "${hotel.name}"`);
      await loadHotelsList();
    } else {
      showToast(`⚠️ Error al eliminar: ${response.error || 'Problema de xarxa'}`);
    }
  }
}

// ==========================================================================
// Load list from db wrapper and Render table rows
// ==========================================================================
async function loadHotelsList() {
  const listBody = document.getElementById('properties-list-body');
  if (!listBody) return;

  listBody.innerHTML = '<tr><td colspan="7" class="loading-placeholder">Carregant llista d\'allotjaments...</td></tr>';

  try {
    hotelsList = await window.db.getHotels();
    renderTable();
  } catch (e) {
    console.error("Failed to load hotels list:", e);
    listBody.innerHTML = '<tr><td colspan="7" class="loading-placeholder text-danger">Error al carregar allotjaments.</td></tr>';
  }
}

function renderTable() {
  const listBody = document.getElementById('properties-list-body');
  if (!listBody) return;

  listBody.innerHTML = '';

  const filteredHotels = hotelsList.filter(hotel => {
    return hotel.name.toLowerCase().includes(currentSearchQuery) || 
           hotel.location.toLowerCase().includes(currentSearchQuery);
  });

  if (filteredHotels.length === 0) {
    listBody.innerHTML = '<tr><td colspan="7" class="loading-placeholder">No s\'ha trobat cap allotjament coincident.</td></tr>';
    return;
  }

  filteredHotels.forEach(hotel => {
    const row = document.createElement('tr');
    row.id = `property-row-${hotel.id}`;
    row.innerHTML = `
      <td><img src="${hotel.image_url}" alt="${hotel.name}" class="table-img" onerror="this.src='assets/hotel-1.png'"></td>
      <td><strong>${hotel.name}</strong></td>
      <td class="hotel-location-td">${hotel.location}</td>
      <td><span class="price-bold">$${hotel.price_per_night}</span>/nit</td>
      <td><span class="badge-rating-table">★ ${hotel.rating.toFixed(1)}</span></td>
      <td>${hotel.reviews_count} opinions</td>
      <td>
        <div class="action-buttons">
          <button class="btn-table-edit" onclick="openEditModal('${hotel.id}')" title="Editar allotjament">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          <button class="btn-table-delete" onclick="handleDeleteHotel('${hotel.id}')" title="Eliminar allotjament">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      </td>
    `;
    listBody.appendChild(row);
  });
}

// Bind globally for inline onclick actions
window.openEditModal = openCrudModal;
window.handleDeleteHotel = handleDeleteHotel;
