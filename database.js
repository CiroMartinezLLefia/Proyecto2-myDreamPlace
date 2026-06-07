// database.js - Supabase & Local Mock Database Wrapper

const DB_KEYS = {
  SUPABASE_URL: 'mydreamplace_supabase_url',
  SUPABASE_KEY: 'mydreamplace_supabase_key',
  LOCAL_HOTELS: 'mydreamplace_local_hotels',
  LOCAL_DESTINATIONS: 'mydreamplace_local_destinations',
  LOCAL_INSPIRATIONS: 'mydreamplace_local_inspirations'
};

// Initial data load if localStorage is empty
function initializeLocalStorage() {
  if (!localStorage.getItem(DB_KEYS.LOCAL_HOTELS)) {
    localStorage.setItem(DB_KEYS.LOCAL_HOTELS, JSON.stringify(window.hotelsData || []));
  }
  if (!localStorage.getItem(DB_KEYS.LOCAL_DESTINATIONS)) {
    localStorage.setItem(DB_KEYS.LOCAL_DESTINATIONS, JSON.stringify(window.destinationsData || []));
  }
  if (!localStorage.getItem(DB_KEYS.LOCAL_INSPIRATIONS)) {
    localStorage.setItem(DB_KEYS.LOCAL_INSPIRATIONS, JSON.stringify(window.inspirationsData || []));
  }
}

// Retrieve connection settings
function getSupabaseConfig() {
  return {
    url: localStorage.getItem(DB_KEYS.SUPABASE_URL) || '',
    key: localStorage.getItem(DB_KEYS.SUPABASE_KEY) || ''
  };
}

// Save connection settings
function saveSupabaseConfig(url, key) {
  if (url && key) {
    localStorage.setItem(DB_KEYS.SUPABASE_URL, url.trim());
    localStorage.setItem(DB_KEYS.SUPABASE_KEY, key.trim());
    return true;
  } else {
    localStorage.removeItem(DB_KEYS.SUPABASE_URL);
    localStorage.removeItem(DB_KEYS.SUPABASE_KEY);
    return false;
  }
}

// Check if Supabase client library is available and keys are set
let supabaseClient = null;
function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;

  const config = getSupabaseConfig();
  if (config.url && config.key && window.supabase) {
    try {
      supabaseClient = window.supabase.createClient(config.url, config.key);
      return supabaseClient;
    } catch (e) {
      console.error("Failed to initialize Supabase client:", e);
      return null;
    }
  }
  return null;
}

// API methods
async function getDestinations() {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('destinations')
        .select('*')
        .order('name', { ascending: true });
      if (!error && data) return data;
      console.warn("Supabase fetch error, using local data:", error);
    } catch (e) {
      console.warn("Supabase fetch failed, using local data:", e);
    }
  }
  
  // Local Fallback
  initializeLocalStorage();
  return JSON.parse(localStorage.getItem(DB_KEYS.LOCAL_DESTINATIONS)) || [];
}

async function getInspirations() {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('inspirations')
        .select('*')
        .order('id', { ascending: true });
      if (!error && data) return data;
      console.warn("Supabase fetch error, using local data:", error);
    } catch (e) {
      console.warn("Supabase fetch failed, using local data:", e);
    }
  }
  
  // Local Fallback
  initializeLocalStorage();
  return JSON.parse(localStorage.getItem(DB_KEYS.LOCAL_INSPIRATIONS)) || [];
}

async function getHotels() {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('hotels')
        .select('*')
        .order('name', { ascending: true });
      if (!error && data) return data;
      console.warn("Supabase fetch error, using local data:", error);
    } catch (e) {
      console.warn("Supabase fetch failed, using local data:", e);
    }
  }
  
  // Local Fallback
  initializeLocalStorage();
  return JSON.parse(localStorage.getItem(DB_KEYS.LOCAL_HOTELS)) || [];
}

// CRUD Operations for Hotels (Admin Panel)
async function addHotel(hotel) {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('hotels')
        .insert([hotel])
        .select();
      if (!error && data) return { success: true, data: data[0] };
      throw error;
    } catch (e) {
      console.error("Supabase insert failed, resorting to local fallback:", e);
    }
  }

  // Local fallback persistence
  initializeLocalStorage();
  const localHotels = JSON.parse(localStorage.getItem(DB_KEYS.LOCAL_HOTELS)) || [];
  const newHotel = {
    ...hotel,
    id: hotel.id || 'local-hotel-' + Date.now()
  };
  localHotels.push(newHotel);
  localStorage.setItem(DB_KEYS.LOCAL_HOTELS, JSON.stringify(localHotels));
  return { success: true, data: newHotel, local: true };
}

async function updateHotel(id, updatedHotelFields) {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('hotels')
        .update(updatedHotelFields)
        .eq('id', id)
        .select();
      if (!error && data) return { success: true, data: data[0] };
      throw error;
    } catch (e) {
      console.error("Supabase update failed, resorting to local fallback:", e);
    }
  }

  // Local fallback persistence
  initializeLocalStorage();
  let localHotels = JSON.parse(localStorage.getItem(DB_KEYS.LOCAL_HOTELS)) || [];
  const idx = localHotels.findIndex(h => h.id === id);
  if (idx !== -1) {
    localHotels[idx] = { ...localHotels[idx], ...updatedHotelFields };
    localStorage.setItem(DB_KEYS.LOCAL_HOTELS, JSON.stringify(localHotels));
    return { success: true, data: localHotels[idx], local: true };
  }
  return { success: false, error: 'Hotel not found locally.' };
}

async function deleteHotel(id) {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { error } = await client
        .from('hotels')
        .delete()
        .eq('id', id);
      if (!error) return { success: true };
      throw error;
    } catch (e) {
      console.error("Supabase delete failed, resorting to local fallback:", e);
    }
  }

  // Local fallback persistence
  initializeLocalStorage();
  let localHotels = JSON.parse(localStorage.getItem(DB_KEYS.LOCAL_HOTELS)) || [];
  const originalLength = localHotels.length;
  localHotels = localHotels.filter(h => h.id !== id);
  if (localHotels.length < originalLength) {
    localStorage.setItem(DB_KEYS.LOCAL_HOTELS, JSON.stringify(localHotels));
    return { success: true, local: true };
  }
  return { success: false, error: 'Hotel not found locally.' };
}

// Export modules if running in Node environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getSupabaseConfig,
    saveSupabaseConfig,
    getDestinations,
    getInspirations,
    getHotels,
    addHotel,
    updateHotel,
    deleteHotel
  };
} else {
  window.db = {
    getSupabaseConfig,
    saveSupabaseConfig,
    getDestinations,
    getInspirations,
    getHotels,
    addHotel,
    updateHotel,
    deleteHotel
  };
}
