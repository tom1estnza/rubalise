// Rubalise : page « bêta bientôt ».
// Fond de courbes de niveau qui dérivent lentement, se soulèvent en colline sous le doigt ou la souris
// et ondulent au toucher (d'après le composant « Topography Background » de 21st.dev, réécrit sans React),
// puis apparition des blocs avec Motion (rm-motion.js, déjà utilisé par l'appli).
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var root = document.documentElement;

  // ---------- apparition des blocs (Motion) ----------
  var items = document.querySelectorAll('[data-reveal]');
  if (root.classList.contains('anim') && window.RM && items.length) {
    window.RM.animate(items,
      { opacity: [0, 1], transform: ['translateY(16px)', 'translateY(0px)'] },
      { duration: 0.6, delay: window.RM.stagger(0.07, { startDelay: 0.1 }), ease: [0.22, 1, 0.36, 1] });
  }
  root.classList.remove('anim');

  // ---------- bruit de Perlin (3D : x, y et le temps) ----------
  var P = new Uint8Array(512);
  (function () {
    var t = [], seed = 1013, i, j, k;
    for (i = 0; i < 256; i++) t[i] = i;
    for (i = 255; i > 0; i--) { seed = (seed * 16807) % 2147483647; j = seed % (i + 1); k = t[i]; t[i] = t[j]; t[j] = k; }
    for (i = 0; i < 512; i++) P[i] = t[i & 255];
  })();
  function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function grad(h, x, y, z) {
    h &= 15;
    var u = h < 8 ? x : y, v = h < 4 ? y : (h === 12 || h === 14 ? x : z);
    return ((h & 1) ? -u : u) + ((h & 2) ? -v : v);
  }
  function noise(x, y, z) {
    var X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255;
    x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z);
    var u = fade(x), v = fade(y), w = fade(z);
    var A = P[X] + Y, AA = P[A] + Z, AB = P[A + 1] + Z, B = P[X + 1] + Y, BA = P[B] + Z, BB = P[B + 1] + Z;
    return lerp(
      lerp(lerp(grad(P[AA], x, y, z), grad(P[BA], x - 1, y, z), u),
           lerp(grad(P[AB], x, y - 1, z), grad(P[BB], x - 1, y - 1, z), u), v),
      lerp(lerp(grad(P[AA + 1], x, y, z - 1), grad(P[BA + 1], x - 1, y, z - 1), u),
           lerp(grad(P[AB + 1], x, y - 1, z - 1), grad(P[BB + 1], x - 1, y - 1, z - 1), u), v), w);
  }

  // ---------- courbes de niveau ----------
  var canvas = document.getElementById('topo');
  var ctx = canvas && canvas.getContext && canvas.getContext('2d');
  if (!ctx) return;

  var CELL = 14;          // taille d'une maille (px CSS)
  var FEATURE = 300;      // taille des reliefs (px CSS)
  var STEP = 0.11;        // écart entre deux courbes
  var HILL_R = 110;       // rayon de la colline sous le pointeur
  var HILL_H = 0.55;      // hauteur de la colline
  var RIPPLE_W = 60;      // largeur d'une onde
  var FPS = 30;

  var W = 0, H = 0, dpr = 1, cols = 0, rows = 0, field = null;
  var z = 0, color = '16,49,43', alpha = 0.13;
  var ptr = { x: -9999, y: -9999, tx: -9999, ty: -9999, on: false, lift: 0 };
  var ripples = [];

  function readColors() {
    var cs = getComputedStyle(root);
    color = (cs.getPropertyValue('--topo') || '16,49,43').trim();
    alpha = parseFloat(cs.getPropertyValue('--topo-a')) || 0.13;
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    cols = Math.ceil(W / CELL) + 1; rows = Math.ceil(H / CELL) + 1;
    field = new Float32Array(cols * rows);
    draw(performance.now());
  }

  function sample(now) {
    var i, j, x, y, v, dx, dy, d, k, r;
    for (j = 0; j < rows; j++) {
      y = j * CELL;
      for (i = 0; i < cols; i++) {
        x = i * CELL;
        v = noise(x / FEATURE, y / FEATURE, z);
        if (ptr.lift > 0.001) {
          dx = x - ptr.x; dy = y - ptr.y; d = dx * dx + dy * dy;
          v += HILL_H * ptr.lift * Math.exp(-d / (HILL_R * HILL_R));
        }
        for (k = 0; k < ripples.length; k++) {
          r = ripples[k];
          dx = x - r.x; dy = y - r.y; d = Math.sqrt(dx * dx + dy * dy) - r.r;
          v += r.a * Math.exp(-(d * d) / (RIPPLE_W * RIPPLE_W)) * Math.cos(d / 18);
        }
        field[j * cols + i] = v;
      }
    }
  }

  // Marching squares : un segment par maille et par niveau traversé
  function draw(now) {
    if (!field) return;
    sample(now);
    var thin = new Path2D(), thick = new Path2D();
    var i, j, a, b, c, d, lo, hi, L, n, s, p, x0, y0;
    for (j = 0; j < rows - 1; j++) {
      for (i = 0; i < cols - 1; i++) {
        a = field[j * cols + i]; b = field[j * cols + i + 1];
        c = field[(j + 1) * cols + i + 1]; d = field[(j + 1) * cols + i];
        lo = Math.min(a, b, c, d); hi = Math.max(a, b, c, d);
        x0 = i * CELL; y0 = j * CELL;
        for (n = Math.ceil(lo / STEP); n * STEP <= hi; n++) {
          L = n * STEP;
          s = (a > L ? 8 : 0) | (b > L ? 4 : 0) | (c > L ? 2 : 0) | (d > L ? 1 : 0);
          if (s === 0 || s === 15) continue;
          p = (n % 5 === 0) ? thick : thin;
          seg(p, s, L, a, b, c, d, x0, y0);
        }
      }
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(' + color + ',' + alpha + ')';
    ctx.lineWidth = 1; ctx.stroke(thin);
    ctx.strokeStyle = 'rgba(' + color + ',' + Math.min(alpha * 1.9, 1) + ')';
    ctx.lineWidth = 1.4; ctx.stroke(thick);
  }

  function seg(p, s, L, a, b, c, d, x, y) {
    var C = CELL;
    var top = [x + C * (L - a) / (b - a), y], right = [x + C, y + C * (L - b) / (c - b)];
    var bottom = [x + C * (L - d) / (c - d), y + C], left = [x, y + C * (L - a) / (d - a)];
    function ln(u, v) { p.moveTo(u[0], u[1]); p.lineTo(v[0], v[1]); }
    switch (s) {
      case 1: case 14: ln(left, bottom); break;
      case 2: case 13: ln(bottom, right); break;
      case 3: case 12: ln(left, right); break;
      case 4: case 11: ln(top, right); break;
      case 6: case 9: ln(top, bottom); break;
      case 7: case 8: ln(left, top); break;
      case 5: ln(left, top); ln(bottom, right); break;
      case 10: ln(top, right); ln(left, bottom); break;
    }
  }

  // ---------- boucle d'animation ----------
  var raf = 0, last = 0;
  function tick(now) {
    raf = requestAnimationFrame(tick);
    if (now - last < 1000 / FPS) return;
    var dt = Math.min((now - last) / 1000, 0.1); last = now;
    z += dt * 0.045;                                   // dérive lente du relief
    var k = 1 - Math.exp(-dt * 9);                     // ressort amorti : la colline suit le pointeur en douceur
    ptr.x += (ptr.tx - ptr.x) * k; ptr.y += (ptr.ty - ptr.y) * k;
    ptr.lift += ((ptr.on ? 1 : 0) - ptr.lift) * (1 - Math.exp(-dt * 4));
    for (var i = ripples.length - 1; i >= 0; i--) {
      var r = ripples[i]; r.r += dt * 260; r.a *= Math.exp(-dt * 1.6);
      if (r.a < 0.01) ripples.splice(i, 1);
    }
    draw(now);
  }
  function start() { if (!raf && !reduce.matches && !document.hidden) { last = performance.now(); raf = requestAnimationFrame(tick); } }
  function stop() { cancelAnimationFrame(raf); raf = 0; }

  function move(e) {
    if (e.pointerType === 'touch' && e.type === 'pointermove' && !e.isPrimary) return;
    if (!ptr.on && ptr.lift < 0.01) { ptr.x = e.clientX; ptr.y = e.clientY; }
    ptr.tx = e.clientX; ptr.ty = e.clientY; ptr.on = true;
  }
  window.addEventListener('pointermove', move, { passive: true });
  window.addEventListener('pointerdown', function (e) {
    move(e);
    if (reduce.matches) return;
    ripples.push({ x: e.clientX, y: e.clientY, r: 0, a: 0.35 });
    if (ripples.length > 4) ripples.shift();
  }, { passive: true });
  document.addEventListener('pointerleave', function () { ptr.on = false; });
  window.addEventListener('pointerup', function (e) { if (e.pointerType === 'touch') ptr.on = false; }, { passive: true });
  window.addEventListener('blur', function () { ptr.on = false; });

  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
  if (reduce.addEventListener) reduce.addEventListener('change', function () { reduce.matches ? (stop(), draw(0)) : start(); });
  var dark = window.matchMedia('(prefers-color-scheme: dark)');
  if (dark.addEventListener) dark.addEventListener('change', function () { readColors(); draw(0); });
  var rt = 0;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(resize, 120); });

  readColors();
  resize();
  if (!reduce.matches && window.RM) window.RM.animate(canvas, { opacity: [0, 1] }, { duration: 1.2, ease: 'easeOut' });
  start();
})();
