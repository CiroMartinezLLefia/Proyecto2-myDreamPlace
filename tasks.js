// tasks.js - JS Task Manager Controller (IA4)

let tasks = [];
let currentCategoryFilter = 'all';
let currentSearchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize DOM references
  initFormAndPreview();
  
  // 2. Load tasks from LocalStorage
  loadTasks();

  // 3. Setup event listeners for filtering
  setupFilters();

  // 4. Render current tasks
  renderBoard();
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

  // Animation trigger
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  // Timeout cleanup
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 3500);
}

// ==========================================================================
// Form & Live Preview Sync
// ==========================================================================
function initFormAndPreview() {
  const form = document.getElementById('task-creation-form');
  const titleInput = document.getElementById('task-title-input');
  const categoryInput = document.getElementById('task-category-input');
  const priorityInput = document.getElementById('task-priority-input');
  const dateInput = document.getElementById('task-date-input');
  const descInput = document.getElementById('task-desc-input');

  const previewCard = document.getElementById('live-task-preview');
  const previewTitle = document.getElementById('preview-task-title');
  const previewCategory = document.getElementById('preview-badge-category');
  const previewPriority = document.getElementById('preview-badge-priority');
  const previewDesc = document.getElementById('preview-task-desc');
  const previewDate = document.getElementById('preview-task-date');

  const cancelEditBtn = document.getElementById('task-cancel-edit-btn');

  // Input event listeners to sync live preview
  const updatePreview = () => {
    // Sync Title
    previewTitle.textContent = titleInput.value.trim() || 'Títol de la tasca...';
    
    // Sync Category
    previewCategory.textContent = categoryInput.value;
    
    // Sync Priority
    const priority = priorityInput.value;
    previewPriority.textContent = priority;
    
    // Sync Priority Classes on Preview Card
    previewCard.className = 'task-card'; // Reset
    previewCard.classList.add(`priority-${priority.toLowerCase()}`);
    
    previewPriority.className = 'task-badge badge-priority';
    previewPriority.classList.add(`badge-priority-${priority.toLowerCase()}`);

    // Sync Description
    previewDesc.textContent = descInput.value.trim() || 'La descripció del que vols fer es mostrarà aquí en temps real a mesura que escrius...';

    // Sync Date
    if (dateInput.value) {
      const formattedDate = formatDate(dateInput.value);
      previewDate.textContent = `Fins el ${formattedDate}`;
    } else {
      previewDate.textContent = 'Sense data límit';
    }
  };

  // Attach event listeners
  [titleInput, categoryInput, priorityInput, dateInput, descInput].forEach(input => {
    input.addEventListener('input', updatePreview);
    input.addEventListener('change', updatePreview);
  });

  // Submit Handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    saveTask();
  });

  // Cancel edit button click
  cancelEditBtn.addEventListener('click', () => {
    resetForm();
    showToast('Edició cancel·lada.');
  });
}

// Format date helper (YYYY-MM-DD -> DD/MM/YYYY)
function formatDate(dateString) {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}

// ==========================================================================
// CRUD Actions & Data Syncing
// ==========================================================================
function loadTasks() {
  const localTasks = localStorage.getItem('mydreamplace_tasks');
  if (localTasks) {
    tasks = JSON.parse(localTasks);
  } else {
    // Load some mock tasks on first visit
    tasks = [
      {
        id: 'task-mock-1',
        title: 'Reservar vols directes a Sydney',
        category: 'Viatge',
        priority: 'Alta',
        date: '2026-07-01',
        desc: 'Cercar vols a través de diferents cercadors i comparar preus per aconseguir bitllets barats.',
        status: 'progress'
      },
      {
        id: 'task-mock-2',
        title: 'Maquetar landing en HTML/CSS (IA2)',
        category: 'Estudis',
        priority: 'Mitjana',
        date: '2026-06-15',
        desc: 'Completar el desenvolupament del currículum responsive segons el prototip indicat a l\'examen.',
        status: 'completed'
      },
      {
        id: 'task-mock-3',
        title: 'Configurar taules a Supabase (IA5)',
        category: 'Treball',
        priority: 'Alta',
        date: '2026-06-20',
        desc: 'Crear les taules de destinacions, allotjaments i inspiracions a la consola de control de Supabase.',
        status: 'pending'
      }
    ];
    saveTasksToStorage();
  }
}

function saveTasksToStorage() {
  localStorage.setItem('mydreamplace_tasks', JSON.stringify(tasks));
}

// Save or Update Task
function saveTask() {
  const titleInput = document.getElementById('task-title-input');
  const categoryInput = document.getElementById('task-category-input');
  const priorityInput = document.getElementById('task-priority-input');
  const dateInput = document.getElementById('task-date-input');
  const descInput = document.getElementById('task-desc-input');
  const editIdField = document.getElementById('edit-task-id');

  const editId = editIdField.value;

  const taskData = {
    title: titleInput.value.trim(),
    category: categoryInput.value,
    priority: priorityInput.value,
    date: dateInput.value,
    desc: descInput.value.trim()
  };

  if (editId) {
    // Edit existing task
    const taskIdx = tasks.findIndex(t => t.id === editId);
    if (taskIdx !== -1) {
      tasks[taskIdx] = {
        ...tasks[taskIdx],
        ...taskData
      };
      showToast('Tasca modificada correctament.');
    }
  } else {
    // Create new task
    const newTask = {
      id: 'task-' + Date.now(),
      status: 'pending', // Pending by default
      ...taskData
    };
    tasks.push(newTask);
    showToast('Tasca creada correctament.');
  }

  saveTasksToStorage();
  resetForm();
  renderBoard();
}

// Reset the task creation form and restore live preview fallback
function resetForm() {
  const form = document.getElementById('task-creation-form');
  const editIdField = document.getElementById('edit-task-id');
  const submitBtn = document.getElementById('task-submit-btn');
  const cancelBtn = document.getElementById('task-cancel-edit-btn');
  const formTitle = document.getElementById('form-header-title');

  form.reset();
  editIdField.value = '';
  formTitle.textContent = 'Crear Nova Tasca';
  submitBtn.textContent = 'Afegir Tasca';
  cancelBtn.style.display = 'none';

  // Force trigger input change event on title input to reset live preview layout
  document.getElementById('task-title-input').dispatchEvent(new Event('input'));
}

// Populate form for editing
function editTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  const titleInput = document.getElementById('task-title-input');
  const categoryInput = document.getElementById('task-category-input');
  const priorityInput = document.getElementById('task-priority-input');
  const dateInput = document.getElementById('task-date-input');
  const descInput = document.getElementById('task-desc-input');
  const editIdField = document.getElementById('edit-task-id');
  const submitBtn = document.getElementById('task-submit-btn');
  const cancelBtn = document.getElementById('task-cancel-edit-btn');
  const formTitle = document.getElementById('form-header-title');

  // Fill inputs
  editIdField.value = task.id;
  titleInput.value = task.title;
  categoryInput.value = task.category;
  priorityInput.value = task.priority;
  dateInput.value = task.date;
  descInput.value = task.desc;

  // Update Form styling for active editing state
  formTitle.textContent = 'Editar Tasca';
  submitBtn.textContent = 'Desar Canvis';
  cancelBtn.style.display = 'block';

  // Scroll form into view
  document.getElementById('task-creation-form').scrollIntoView({ behavior: 'smooth' });

  // Update Live Preview values
  titleInput.dispatchEvent(new Event('input'));
  showToast(`Editant: "${task.title}"`);
}

// Delete Task
function deleteTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  if (confirm(`Estàs segur que vols eliminar la tasca "${task.title}"?`)) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasksToStorage();
    showToast('Tasca eliminada correctament.');
    
    // If we were editing this task, reset form
    const editId = document.getElementById('edit-task-id').value;
    if (editId === id) {
      resetForm();
    }
    
    renderBoard();
  }
}

// Advance task state (Pending -> Progress -> Completed -> Pending)
function toggleTaskState(id) {
  const taskIdx = tasks.findIndex(t => t.id === id);
  if (taskIdx === -1) return;

  const currentStatus = tasks[taskIdx].status;
  let nextStatus = 'pending';
  let message = '';

  if (currentStatus === 'pending') {
    nextStatus = 'progress';
    message = 'Tasca moguda a "En curs"';
  } else if (currentStatus === 'progress') {
    nextStatus = 'completed';
    message = 'Tasca marcada com a "Completada" 🎉';
  } else {
    nextStatus = 'pending';
    message = 'Tasca moguda a "Pendent"';
  }

  tasks[taskIdx].status = nextStatus;
  saveTasksToStorage();
  showToast(message);
  renderBoard();
}

// Move state back (Progress -> Pending)
function moveTaskStateBack(id) {
  const taskIdx = tasks.findIndex(t => t.id === id);
  if (taskIdx === -1) return;

  const currentStatus = tasks[taskIdx].status;
  if (currentStatus === 'progress') {
    tasks[taskIdx].status = 'pending';
    saveTasksToStorage();
    showToast('Tasca retornada a "Pendent"');
    renderBoard();
  }
}

// ==========================================================================
// Filtering & Searching Event Listeners
// ==========================================================================
function setupFilters() {
  const searchInput = document.getElementById('task-search-input');
  const categoryTabs = document.querySelectorAll('.filter-tab');

  // Input event on Search
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.toLowerCase().trim();
      renderBoard();
    });
  }

  // Click events on Tabs
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategoryFilter = tab.getAttribute('data-category');
      renderBoard();
    });
  });
}

// ==========================================================================
// Renderer Functions
// ==========================================================================
function renderBoard() {
  const pendingContainer = document.getElementById('tasks-pending');
  const progressContainer = document.getElementById('tasks-progress');
  const completedContainer = document.getElementById('tasks-completed');

  if (!pendingContainer || !progressContainer || !completedContainer) return;

  // Clear lists
  pendingContainer.innerHTML = '';
  progressContainer.innerHTML = '';
  completedContainer.innerHTML = '';

  // Filter current tasks
  const filteredTasks = tasks.filter(task => {
    const matchesCategory = currentCategoryFilter === 'all' || task.category === currentCategoryFilter;
    const matchesSearch = task.title.toLowerCase().includes(currentSearchQuery) || 
                          task.desc.toLowerCase().includes(currentSearchQuery);
    return matchesCategory && matchesSearch;
  });

  // Keep count references
  let pendingCount = 0;
  let progressCount = 0;
  let completedCount = 0;

  // Render cards
  filteredTasks.forEach(task => {
    const card = document.createElement('div');
    card.className = `task-card priority-${task.priority.toLowerCase()}`;
    if (task.status === 'completed') {
      card.classList.add('completed');
    }
    card.id = `task-item-${task.id}`;

    // Render inner card structure
    const dateFormatted = task.date ? formatDate(task.date) : 'Sense data límit';
    
    // Status button text and classes
    let statusToggleBtn = '';
    let statusBackBtn = '';
    
    if (task.status === 'pending') {
      statusToggleBtn = `<button class="btn-icon btn-state start-btn" onclick="toggleTaskState('${task.id}')" title="Començar tasca">▶ Iniciar</button>`;
    } else if (task.status === 'progress') {
      statusBackBtn = `<button class="btn-icon btn-state back-btn" onclick="moveTaskStateBack('${task.id}')" title="Retornar a pendents">◀ Enrere</button>`;
      statusToggleBtn = `<button class="btn-icon btn-state complete-btn" onclick="toggleTaskState('${task.id}')" title="Completar tasca">✓ Completar</button>`;
    } else if (task.status === 'completed') {
      statusToggleBtn = `<button class="btn-icon btn-state completed-btn" onclick="toggleTaskState('${task.id}')" title="Reiniciar tasca">↺ Reiniciar</button>`;
    }

    card.innerHTML = `
      <div class="task-card-header">
        <span class="badge-category">${task.category}</span>
        <span class="badge-priority badge-priority-${task.priority.toLowerCase()}">${task.priority}</span>
      </div>
      <h3 class="task-card-title">${task.title}</h3>
      <p class="task-card-desc">${task.desc || 'Sense descripció.'}</p>
      
      <div class="task-card-footer">
        <span class="task-card-date">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span>${dateFormatted}</span>
        </span>
        
        <div class="task-card-actions">
          ${statusBackBtn}
          ${statusToggleBtn}
          <button class="btn-icon btn-edit" onclick="editTask('${task.id}')" title="Editar tasca">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          <button class="btn-icon btn-delete" onclick="deleteTask('${task.id}')" title="Eliminar tasca">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      </div>
    `;

    // Append to correct board container column
    if (task.status === 'pending') {
      pendingContainer.appendChild(card);
      pendingCount++;
    } else if (task.status === 'progress') {
      progressContainer.appendChild(card);
      progressCount++;
    } else if (task.status === 'completed') {
      completedContainer.appendChild(card);
      completedCount++;
    }
  });

  // Update counts
  document.getElementById('count-pending').textContent = pendingCount;
  document.getElementById('count-progress').textContent = progressCount;
  document.getElementById('count-completed').textContent = completedCount;

  // Render placeholders if columns are empty
  renderPlaceholderIfEmpty(pendingContainer, 'Pendent');
  renderPlaceholderIfEmpty(progressContainer, 'En curs');
  renderPlaceholderIfEmpty(completedContainer, 'Completat');
}

function renderPlaceholderIfEmpty(container, columnName) {
  if (container.children.length === 0) {
    const placeholder = document.createElement('div');
    placeholder.className = 'empty-column-placeholder';
    
    let icon = '📂';
    if (columnName === 'Pendent') icon = '💤';
    else if (columnName === 'En curs') icon = '⚡';
    else if (columnName === 'Completat') icon = '🎉';

    placeholder.innerHTML = `
      <span class="empty-icon">${icon}</span>
      <p>Sense tasques en estat "${columnName.toLowerCase()}"</p>
    `;
    container.appendChild(placeholder);
  }
}

// Bind methods globally since we used inline onclick attributes
window.editTask = editTask;
window.deleteTask = deleteTask;
window.toggleTaskState = toggleTaskState;
window.moveTaskStateBack = moveTaskStateBack;
