// Rubalise : hors connexion et mises à jour.
// VERSION change à chaque livraison (version de l'appli + empreinte de index.html) : c'est ce qui fait arriver
// les mises à jour chez les testeurs. Ne la modifie pas à la main.
const VERSION = '2.6-24fdb193';
const CACHE = 'rubalise-' + VERSION;
const FONTS = 'rubalise-fonts';   // polices : gardées d'une version à l'autre
const CORE = ['./', 'index.html', 'manifest.webmanifest'];   // indispensables : sans eux, la nouvelle version n'est pas installée
const EXTRA = ['icon-192.png', 'icon-512.png', 'icon-maskable-192.png', 'icon-maskable-512.png', 'apple-touch-icon.png', 'icon-32.png', 'native.js'];   // si possible

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    try {
      const c = await caches.open(CACHE);
      // « reload » : on ignore le cache HTTP (GitHub Pages garde les fichiers 10 minutes) pour ne pas mémoriser une ancienne page
      await c.addAll(CORE.map(u => new Request(u, { cache: 'reload' })));
      await Promise.allSettled(EXTRA.map(u => c.add(new Request(u, { cache: 'reload' }))));
    } catch (err) {
      await caches.delete(CACHE);   // installation incomplète : on garde l'ancienne version, sans cache orphelin
      throw err;
    }
    await precacheFonts().catch(() => {});   // polices : non indispensables, un échec ne bloque pas l'installation
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const ks = await caches.keys();
    await Promise.all(ks.filter(k => k.startsWith('rubalise-') && k !== CACHE && k !== FONTS).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    const isPage = req.mode === 'navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('/index.html');
    e.respondWith(isPage ? page(e) : asset(req));
  } else if (/(^|\.)fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    e.respondWith(font(req));
  }
  // Tout le reste (OpenStreetMap, cartes, Firebase) : le navigateur s'en charge, rien n'est mis en cache ici.
});

// Page : le réseau d'abord (version la plus récente), le cache en secours (hors connexion ou réseau trop lent).
async function page(e) {
  const req = e.request, cache = await caches.open(CACHE);
  const fromNet = fetch(req.mode === 'navigate' ? req.url : req, { cache: 'no-cache' }).then(res => {
    if (res && res.ok) { cache.put('index.html', res.clone()).catch(() => {}); cache.put('./', res.clone()).catch(() => {}); }
    return res;
  });
  let res = null;
  try { res = await Promise.race([fromNet, new Promise(r => setTimeout(() => r(null), 3000))]); } catch (err) { res = null; }
  if (res && res.ok) return res;
  const hit = (await cache.match(req, { ignoreSearch: true })) || (await cache.match('./')) || (await cache.match('index.html'));
  if (hit) { e.waitUntil(fromNet.catch(() => {})); return hit; }
  return res || fromNet;
}

// Fichiers de l'appli (icônes, manifest) : le cache d'abord.
async function asset(req) {
  const cache = await caches.open(CACHE), hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res && res.ok && res.type === 'basic') cache.put(req, res.clone()).catch(() => {});
  return res;
}

// Polices Google : le cache d'abord, mises à jour en arrière-plan.
async function font(req) {
  const c = await caches.open(FONTS), hit = await c.match(req);
  const net = fetch(req).then(res => { if (res && (res.ok || res.type === 'opaque')) c.put(req, res.clone()).catch(() => {}); return res; }).catch(() => hit);
  return hit || net;
}

// Polices Google : on les garde dès l'installation, pour qu'elles soient là même si la première visite n'a pas eu de réseau ensuite.
async function precacheFonts() {
  const page = await fetch('index.html', { cache: 'reload' });
  const m = (await page.text()).match(/href="(https:\/\/fonts\.googleapis\.com\/[^"]+)"/);
  if (!m) return;
  const cssUrl = m[1].replace(/&amp;/g, '&'), fc = await caches.open(FONTS);
  const res = await fetch(cssUrl, { mode: 'cors' });
  if (!res.ok) return;
  await fc.put(cssUrl, res.clone());
  const files = [...new Set([...(await res.text()).matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)].map(x => x[1]))];
  await Promise.all(files.map(async u => { try { if (await fc.match(u)) return; const r = await fetch(u, { mode: 'cors' }); if (r.ok) await fc.put(u, r); } catch (err) {} }));
}

// L'appli demande le numéro de version (« Aide », « À propos ») : utile pour savoir quelle version un testeur utilise.
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'GET_VERSION' && e.ports && e.ports[0]) e.ports[0].postMessage({ version: VERSION });
});
