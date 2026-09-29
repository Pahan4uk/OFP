const CACHE='ofp-v031-shell';
const ASSETS=['./','./index.html','./styles.css','./app.js','./manifest.webmanifest','./icon-192.png','./icon-512.png','media/ankle.svg','media/balance.svg','media/birddog.svg','media/bridge.svg','media/calf.svg','media/calfstretch.svg','media/catcow.svg','media/cheststretch.svg','media/deadbug.svg','media/hamstretch.svg','media/hinge.svg','media/hipcircle.svg','media/hipflexor.svg','media/hollow.svg','media/jack.svg','media/legraise.svg','media/lunge.svg','media/march.svg','media/mountain.svg','media/pike.svg','media/plank.svg','media/push.svg','media/quadstretch.svg','media/shoulder.svg','media/shoulderstretch.svg','media/sidebend.svg','media/sideplank.svg','media/squat.svg','media/superman.svg','media/tap.svg','media/thoracic.svg','media/wallsit.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(resp=>{
    if(new URL(e.request.url).origin===location.origin){const clone=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,clone));}
    return resp;
  }).catch(()=>caches.match('./index.html'))));
});
