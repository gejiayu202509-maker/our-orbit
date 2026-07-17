/*
 * OUR ORBIT ambient motion configuration.
 * Every duration and intensity lives here so the universe can be tuned as one
 * quiet cinematic system instead of accumulating unrelated animations.
 */
(function () {
  const MOTION = {
    desktop: {
      camera: '34s', galaxy: '240s', nebula: '66s', core: '48s',
      dust: '28s', aurora: '54s', marker: '96s', intensity: '1'
    },
    mobile: {
      camera: '48s', galaxy: '360s', nebula: '88s', core: '70s',
      dust: '46s', aurora: '76s', marker: '150s', intensity: '.58'
    }
  };

  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const compact = window.matchMedia('(max-width: 700px)');

  function applyMotion() {
    const disabled = reduced.matches;
    const config = compact.matches ? MOTION.mobile : MOTION.desktop;
    root.dataset.motion = disabled ? 'reduced' : 'ambient';
    Object.entries(config).forEach(([name, value]) => {
      root.style.setProperty(`--motion-${name}`, value);
    });
  }

  function updateVisibility() {
    root.dataset.motionPaused = document.hidden ? 'true' : 'false';
  }

  window.OUR_ORBIT_MOTION = MOTION;
  applyMotion();
  updateVisibility();

  function listen(media, handler) {
    if (media.addEventListener) media.addEventListener('change', handler);
    else media.addListener(handler);
  }

  listen(reduced, applyMotion);
  listen(compact, applyMotion);
  document.addEventListener('visibilitychange', updateVisibility, { passive: true });
})();
