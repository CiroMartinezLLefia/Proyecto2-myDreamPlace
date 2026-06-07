document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // Theme Switcher Logic
  // ==========================================================================
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Retrieve theme from local storage or check system preferences
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const setDarkTheme = () => {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  };

  const setLightTheme = () => {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    localStorage.setItem('theme', 'light');
  };

  // Initial theme check
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    setDarkTheme();
  } else {
    setLightTheme();
  }

  // Toggle button event listener
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      if (body.classList.contains('light-theme')) {
        setDarkTheme();
      } else {
        setLightTheme();
      }
    });
  }

  // ==========================================================================
  // Dynamic Year Update
  // ==========================================================================
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ==========================================================================
  // Copy to Clipboard (Email & Phone)
  // ==========================================================================
  const emailLink = document.getElementById('email-link');
  const phoneLink = document.getElementById('phone-link');

  const handleCopy = (textToCopy, displayType) => {
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        showToast(`${displayType} copiat al porta-retalls!`);
      })
      .catch((err) => {
        console.error('Error copying text to clipboard: ', err);
      });
  };

  if (emailLink) {
    emailLink.addEventListener('click', (e) => {
      e.preventDefault();
      handleCopy('ciromartinezmartin@gmail.com', 'Correu electrònic');
    });
  }

  if (phoneLink) {
    phoneLink.addEventListener('click', (e) => {
      e.preventDefault();
      handleCopy('+34 691 93 13 27', 'Telèfon');
    });
  }

  // ==========================================================================
  // Toast Notification System
  // ==========================================================================
  const showToast = (message) => {
    let container = document.getElementById('toast-container');
    
    // Create container if it doesn't exist
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    // Animate out and remove
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 300); // Wait for CSS opacity transition
    }, 3000);
  };
});
