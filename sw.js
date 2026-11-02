const C="prep-v2";
const F=["./","./index.html","./manifest.json","./icon-180.png","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  const r=e.request; if(r.method!=="GET")return;
  if(r.mode==="navigate"){
    e.respondWith(fetch(r).then(n=>{if(n&&n.ok&&!n.redirected){const cp=n.clone();caches.open(C).then(c=>c.put("./index.html",cp));}return n;})
      .catch(()=>caches.match("./index.html").then(x=>x||caches.match("./"))));
    return;
  }
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(x=>x||fetch(r).then(n=>{if(n&&n.ok){const cp=n.clone();caches.open(C).then(c=>c.put(r,cp));}return n;})));
});
