// Hamburger menu toggle (Trips page navigation)
(function () {
  var hamburger = document.querySelector('.header__hamburger');
  var nav = document.querySelector('.header__nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('header__nav--open');
      hamburger.classList.toggle('header__hamburger--active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }
})();
