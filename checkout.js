// Payment options tab switching (Checkout page)
(function () {
  var tabs = document.querySelectorAll('.tabs__item');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) {
        t.classList.remove('tabs__item--active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('tabs__item--active');
      tab.setAttribute('aria-selected', 'true');
    });
  });
})();
