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

  const PLANETS = [
    { id: 'wishes',  x: .111, y: .154, radius: .055, period: '70s', shiftX: '18px', shiftY: '-4px' },
    { id: 'diary',   x: .249, y: .294, radius: .108, period: '64s', shiftX: '-28px', shiftY: '6px' },
    { id: 'letters', x: .457, y: .216, radius: .056, period: '62s', shiftX: '17px', shiftY: '4px' },
    { id: 'signal',  x: .650, y: .288, radius: .054, period: '72s', shiftX: '-17px', shiftY: '-4px' },
    { id: 'gallery', x: .800, y: .343, radius: .057, period: '64s', shiftX: '20px', shiftY: '4px' },
    { id: 'stats',   x: .912, y: .221, radius: .062, period: '80s', shiftX: '-18px', shiftY: '5px' },
    { id: 'timeline',x: .226, y: .659, radius: .188, period: '96s', shiftX: '32px', shiftY: '-6px' },
    { id: 'map',     x: .600, y: .798, radius: .130, period: '78s', shiftX: '-26px', shiftY: '6px' },
    { id: 'room',    x: .857, y: .599, radius: .102, period: '88s', shiftX: '24px', shiftY: '-5px' }
  ];

  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const compact = window.matchMedia('(max-width: 700px)');

  function buildPlanetMotion() {
    const layer = document.querySelector('.ambient-planet-layer');
    if (!layer || layer.childElementCount) return;
    PLANETS.forEach((planet, index) => {
      const surface = document.createElement('i');
      surface.className = `ambient-planet-surface ambient-planet-surface--${planet.id}`;
      surface.dataset.planet = planet.id;
      surface.style.setProperty('--surface-left', `${(planet.x - planet.radius) * 100}%`);
      surface.style.setProperty('--surface-top', `${(planet.y - planet.radius) * 100}%`);
      surface.style.setProperty('--surface-size', `${planet.radius * 200}%`);
      surface.style.setProperty('--surface-period', planet.period);
      surface.style.setProperty('--surface-shift-x', planet.shiftX);
      surface.style.setProperty('--surface-shift-y', planet.shiftY);
      surface.style.setProperty('--surface-delay', `-${index * 13}s`);
      layer.appendChild(surface);
    });
  }

  function alignPlanetSurfaces() {
    const atlas = document.querySelector('.galaxy-map');
    if (!atlas) return;
    const bounds = atlas.getBoundingClientRect();
    PLANETS.forEach((planet) => {
      const surface = document.querySelector(`[data-planet="${planet.id}"]`);
      if (!surface) return;
      surface.style.setProperty('--surface-bg-width', `${bounds.width}px`);
      surface.style.setProperty('--surface-bg-height', `${bounds.height}px`);
      surface.style.setProperty('--surface-bg-x', `${-(planet.x - planet.radius) * bounds.width}px`);
      surface.style.setProperty('--surface-bg-y', `${-(planet.y - planet.radius) * bounds.height}px`);
    });
  }

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
  buildPlanetMotion();
  applyMotion();
  alignPlanetSurfaces();
  updateVisibility();

  function listen(media, handler) {
    if (media.addEventListener) media.addEventListener('change', handler);
    else media.addListener(handler);
  }

  listen(reduced, applyMotion);
  listen(compact, applyMotion);
  window.addEventListener('resize', alignPlanetSurfaces, { passive: true });
  document.addEventListener('visibilitychange', updateVisibility, { passive: true });
})();
