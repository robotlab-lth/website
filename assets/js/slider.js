// Front page slideshow. Pauses when the tab is hidden, when a control has
// focus, and when the visitor has asked for reduced motion.
(function () {
  var root = document.querySelector('[data-slider]');
  if (!root) return;

  var slides = root.querySelectorAll('.slide');
  if (slides.length < 2) return;

  var index = 0;
  var timer = null;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var toggle = root.querySelector('[data-slider-toggle]');

  function show(next) {
    slides[index].classList.remove('is-active');
    index = (next + slides.length) % slides.length;
    slides[index].classList.add('is-active');
  }

  function start() {
    if (reduced || timer) return;
    timer = window.setInterval(function () { show(index + 1); }, 6000);
    if (toggle) toggle.setAttribute('aria-label', 'Pause slideshow');
  }

  function stop() {
    window.clearInterval(timer);
    timer = null;
    if (toggle) toggle.setAttribute('aria-label', 'Play slideshow');
  }

  root.querySelector('[data-slider-next]').addEventListener('click', function () { stop(); show(index + 1); });
  root.querySelector('[data-slider-prev]').addEventListener('click', function () { stop(); show(index - 1); });
  if (toggle) toggle.addEventListener('click', function () { timer ? stop() : start(); });

  document.addEventListener('visibilitychange', function () {
    document.hidden ? stop() : start();
  });

  start();
})();
