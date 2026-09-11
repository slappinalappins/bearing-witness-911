let currentPerson = PEOPLE[0];
let currentStep = 0;
let activeFilter = 'all';

const MONTHS = {jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,sept:8,oct:9,nov:10,dec:11};
const REF_DATE = new Date(2001,8,11,0,0,0); // Sept 11, 2001

function waypointT(w, category){
  if(category === 'aftermath'){
    const m = w.time.match(/([A-Za-z]{3,9})\.?\s+(\d{1,2})/);
    if(m){
      const mon = MONTHS[m[1].toLowerCase().slice(0,4)] ?? MONTHS[m[1].toLowerCase().slice(0,3)];
      if(mon !== undefined){
        const d = new Date(2001, mon, parseInt(m[2],10));
        return (d - REF_DATE) / 86400000; // day offset, fractional-safe
      }
    }
    return null;
  }
  const m = w.time.match(/(\d{1,2}):(\d{2})/);
  if(m){ return parseInt(m[1],10)*60 + parseInt(m[2],10); }
  return null;
}

function personSortKey(p){
  const t = waypointT(p.waypoints[0], p.category);
  return t === null ? 999999 : t;
}

function visiblePeople(){
  const list = activeFilter === 'all' ? PEOPLE.slice() : PEOPLE.filter(p => p.category === activeFilter);
  return list.sort((a,b) => personSortKey(a) - personSortKey(b));
}

function entrySortKey(e){
  const m = (e.time || '').match(/(\d{1,2}):(\d{2})/);
  return m ? parseInt(m[1],10)*60 + parseInt(m[2],10) : 999999;
}

function sortedEntries(){
  return ENTRIES.slice().sort((a,b) => entrySortKey(a) - entrySortKey(b));
}

function computeTimelinePositions(waypoints, category){
  const raw = waypoints.map(w => waypointT(w, category));
  // forward-fill unparseable entries so the sequence stays monotonic
  const step = category === 'aftermath' ? 0.6 : 8;
  for(let i=0;i<raw.length;i++){
    if(raw[i] === null){
      raw[i] = i===0 ? 0 : raw[i-1] + step;
    } else if(i>0 && raw[i] <= raw[i-1]){
      raw[i] = raw[i-1] + step; // guard against out-of-order/duplicate parses
    }
  }
  const min = raw[0], max = raw[raw.length-1];
  const span = max - min;
  return raw.map(t => span > 0 ? ((t-min)/span)*100 : 50);
}

const diagEl = document.getElementById('mapDiag');
function showDiag(msg){
  diagEl.style.display = 'block';
  diagEl.innerHTML = msg;
}

if (typeof L === 'undefined') {
  showDiag('Leaflet failed to load from the CDN (cdnjs.cloudflare.com) - this browser or network has no outbound access to it. If you\'re viewing this inside a chat/app preview pane, try opening the downloaded HTML file directly in a normal browser tab instead.');
  throw new Error('Leaflet not loaded');
}

const map = L.map('map', { zoomControl:true, attributionControl:true }).setView([40.7128,-74.0110], 15);

// NYC's 2001-2 tile service returns a tiny opaque white "no data" placeholder
// (always ~120 bytes) for areas outside city coverage, e.g. the Hudson River
// and New Jersey. Swap those for a transparent tile so gaps read as unmapped
// rather than as a broken, glaring white patch.
const TRANSPARENT_PIXEL = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
const NoDataTileLayer = L.TileLayer.extend({
  createTile: function(coords, done){
    const tile = document.createElement('img');
    L.DomEvent.on(tile, 'load', L.Util.bind(this._tileOnLoad, this, done, tile));
    L.DomEvent.on(tile, 'error', L.Util.bind(this._tileOnError, this, done, tile));
    tile.alt = '';
    fetch(this.getTileUrl(coords))
      .then(res => res.blob())
      .then(blob => { tile.src = blob.size < 1000 ? TRANSPARENT_PIXEL : URL.createObjectURL(blob); })
      .catch(() => this._tileOnError(done, tile, new Error('tile fetch failed')));
    return tile;
  }
});

const layers = {
  drawn: L.layerGroup([
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri, HERE, Garmin, &copy; OpenStreetMap contributors', maxZoom: 16
    }),
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 16
    })
  ]),
  satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri - current-day imagery, not from 2001', maxZoom: 19
  }),
  historical: new NoDataTileLayer('https://maps.nyc.gov/xyz/1.0.0/photo/2001-2/{z}/{x}/{y}.png8', {
    attribution: 'Tiles &copy; City of New York (CC BY 4.0) - 2001 aerial survey; the World Trade Center site here shows the cleared post-attack site, not the standing towers, since NYC re-flew that area during the recovery',
    maxZoom: 19, maxNativeZoom: 17
  })
};
layers.satellite.addTo(map);

let tileErrorCount = 0;
let tileOkCount = 0;
(layers.drawn.getLayers ? layers.drawn.getLayers() : [layers.drawn]).concat([layers.satellite]).forEach(layer=>{
  layer.on('tileerror', ()=>{
    tileErrorCount++;
    if(tileErrorCount >= 3 && tileOkCount === 0){
      showDiag('Map tiles are being blocked before they reach the browser - this is almost always a preview sandbox or a network/ad-blocker issue, not a bug in the file. Two things to try: <b>1)</b> open this file directly in a normal browser tab (download it, then double-click, or drag it into Chrome/Safari/Firefox) rather than viewing it inside an in-app preview, and <b>2)</b> if that still fails, check for an ad blocker, VPN, or corporate firewall blocking <code>basemaps.cartocdn.com</code> / <code>server.arcgisonline.com</code>.');
    }
  });
  layer.on('tileload', ()=>{
    tileOkCount++;
    if(diagEl.style.display === 'block'){ diagEl.style.display = 'none'; }
  });
});

function setLayer(key){
  Object.values(layers).forEach(l=>map.removeLayer(l));
  if(layers[key]){ layers[key].addTo(map); }
  document.querySelectorAll('.tile-btn').forEach(b=>{
    const isActive = b.dataset.layer===key;
    b.classList.toggle('active', isActive);
    b.setAttribute('aria-pressed', isActive);
  });
}
document.querySelectorAll('.tile-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{ setLayer(btn.dataset.layer); });
});

function openLightbox(html){
  const lb = document.getElementById('videoLightbox');
  lb.querySelector('.frame-wrap').innerHTML = html;
  lb.classList.add('open');
  document.getElementById('lightboxClose').focus();
}

function closeLightbox(){
  const lb = document.getElementById('videoLightbox');
  lb.classList.remove('open');
  lb.querySelector('.frame-wrap').innerHTML = '';
}

document.addEventListener('keydown', (ev)=>{
  if(ev.key === 'Escape' && document.getElementById('videoLightbox').classList.contains('open')){
    closeLightbox();
  }
});

document.getElementById('videoLightbox').addEventListener('click', (ev)=>{
  if(ev.target.id === 'videoLightbox'){ closeLightbox(); }
});

function placeLinkHtml(lat, lng, label){
  return `<a href="#" class="place-link" data-lat="${lat}" data-lng="${lng}">${label}</a><a class="place-gmaps" href="https://www.google.com/maps?q=${lat},${lng}" target="_blank" rel="noopener" title="Open in Google Maps">↗</a>`;
}

function flashPlace(lat, lng){
  const targetZoom = Math.min(Math.max(map.getZoom(), 17), 16); // the "Drawn" basemap has no tiles past zoom 16
  map.flyTo([lat, lng], targetZoom, { animate:true, duration:0.8 });
  const icon = L.divIcon({ className:'', html:'<div class="place-flash"></div>', iconSize:[34,34], iconAnchor:[17,17] });
  const marker = L.marker([lat,lng], { icon, interactive:false, zIndexOffset:1200 }).addTo(map);
  setTimeout(()=>{ map.removeLayer(marker); }, 1600);
}

document.addEventListener('click', (ev)=>{
  const link = ev.target.closest('.place-link');
  if(!link) return;
  ev.preventDefault();
  flashPlace(parseFloat(link.dataset.lat), parseFloat(link.dataset.lng));
});

// static markers: towers + firehouse
function towerMarker(t, label){
  L.circle([t.lat,t.lng], { radius: 35, color:'#b08f4d', weight:1.5, fillColor:'#b08f4d', fillOpacity:0.15 })
    .addTo(map)
    .bindPopup(`<b>${label}</b>`);
}
towerMarker(TOWERS.north, TOWERS.north.label);
towerMarker(TOWERS.south, TOWERS.south.label);
towerMarker(TOWERS.wtc7, TOWERS.wtc7.label + ' - collapsed later that afternoon, ~5:21pm');
L.circleMarker([FIREHOUSE.lat, FIREHOUSE.lng], { radius:5, color:'#b08f4d', weight:1.5, fillColor:'#232c36', fillOpacity:1 })
  .addTo(map)
  .bindPopup(`<b>${FIREHOUSE.label}</b>`);

let routeLayerGroup = L.layerGroup().addTo(map);
let rosterLayerGroup = L.layerGroup().addTo(map);
let entryLayerGroup = L.layerGroup(); // added to map only in static mode
let travelerMarker = null;
let travelAnimId = null;
let prevPersonId = null;
let prevLatLng = null;
let currentMode = 'movers';
let currentEntry = ENTRIES[0];

function renderEntryMarkers(){
  entryLayerGroup.clearLayers();
  ENTRIES.forEach(e=>{
    const isActive = e.id === currentEntry.id;
    L.circleMarker([e.lat,e.lng], { radius:(isActive?9:6)+2, color:'transparent', fillColor:'#0f1216', fillOpacity:0.5 }).addTo(entryLayerGroup);
    const m = L.circleMarker([e.lat,e.lng], {
      radius: isActive?9:6, color:'#efe9da', weight:1.8,
      fillColor: isActive ? '#c99a3d' : '#5a6474', fillOpacity:1
    }).addTo(entryLayerGroup);
    m.bindPopup(`<b>${e.name}</b><br>${e.location}`);
    m.on('click', ()=>{ currentEntry = e; renderStatic(); });

    const target = (Math.abs(e.lat-TOWERS.north.lat) < Math.abs(e.lat-TOWERS.south.lat)) ? TOWERS.north : TOWERS.south;
    L.polyline([[e.lat,e.lng],[target.lat,target.lng]], {
      color: '#b08f4d', weight: isActive?2.2:1.3, dashArray: '1,6', lineCap:'round', opacity: isActive?0.9:0.4
    }).addTo(entryLayerGroup);
  });
}

function renderEntrySidebar(){
  const list = document.getElementById('entryList');
  list.innerHTML = '';
  sortedEntries().forEach(e=>{
    const btn = document.createElement('button');
    btn.className = 'entry-btn' + (e.id===currentEntry.id ? ' active':'');
    const eAvatarInner = e.avatar ? `<img src="${e.avatar.src}" alt="" loading="lazy">` : e.initials;
    btn.innerHTML = `<span class="e-avatar${e.avatar ? ' avatar-photo':''}">${eAvatarInner}</span><span><span class="e-name">${e.name}</span><span class="e-role">${e.role}</span></span>`;
    btn.addEventListener('click', ()=>{ currentEntry = e; renderStatic(); });
    list.appendChild(btn);
  });
}

function entryMediaHtml(m){
  if(m.type === 'image' && m.src){
    return `<div class="hero-media">
      <img class="hero-img" src="${m.src}" alt="${m.title}" data-full="${m.fullSrc}"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
      <div class="hero-img-fallback" style="display:none;">
        <span>Image blocked from loading here. Try opening the file directly in a browser tab, or <a href="${m.url}" target="_blank" rel="noopener" style="color:#c99a3d;">view it at the source ↗</a></span>
      </div>
    </div>`;
  }
  if(m.type === 'video' && m.videoId){
    return `<div class="hero-media entry-video-thumb" data-video-id="${m.videoId}" style="cursor:pointer; position:relative;">
      <img src="https://img.youtube.com/vi/${m.videoId}/hqdefault.jpg" alt="${m.title}" style="width:100%; display:block;">
      <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center;">
        <svg viewBox="0 0 24 24" fill="#efe9da" width="52" height="52" style="filter:drop-shadow(0 1px 6px rgba(0,0,0,0.6));"><circle cx="12" cy="12" r="11" fill="rgba(23,29,36,0.75)"/><path d="M10 8l6 4-6 4V8z"/></svg>
      </div>
    </div>`;
  }
  const bigGlyph = (GLYPHS[m.type] || GLYPHS.link).replace(/width="\d+" height="\d+"/, '').replace('<svg', '<svg width="38" height="38"');
  return `<a class="hero-placeholder" href="${m.url}" target="_blank" rel="noopener">
    <div class="hero-placeholder-monogram">${currentEntry.initials}</div>
    <div class="hero-corner tl"></div><div class="hero-corner tr"></div>
    <div class="hero-corner bl"></div><div class="hero-corner br"></div>
    <div class="hero-placeholder-content">
      ${bigGlyph}
      <span class="hero-placeholder-label">COPYRIGHTED</span>
      <span class="hero-placeholder-cta">View at source ↗</span>
    </div>
  </a>`;
}

function renderStaticDetail(){
  const e = currentEntry;
  const confLabel = { confirmed:'Confirmed', reconstructed:'Reconstructed', estimated:'Estimated' }[e.locationConf];
  const sourcesHtml = e.sources.map(s=>`&middot; ${s}`).join('<br>');
  const mediaHtml = (e.media||[]).map(entryMediaHtml).join('');
  document.getElementById('staticDetail').innerHTML = `
    <div class="detail-top"><span class="detail-time">${e.name}</span><span class="badge ${e.locationConf}">${confLabel} location</span></div>
    <p class="detail-place">${e.role} - ${placeLinkHtml(e.lat, e.lng, e.location)}</p>
    ${mediaHtml}
    <p class="card-label">WHAT THEY CAPTURED, FROM HERE</p>
    <p class="detail-narrative">${e.narrative}</p>
    <p class="card-label">THE VIEW FROM THIS POSITION</p>
    <p class="sightline-text">${e.sightline}</p>
    <div class="sources"><b>SOURCES</b>${sourcesHtml}</div>
  `;
  const img = document.querySelector('#staticDetail .hero-img');
  if(img){
    img.addEventListener('click', ()=>{
      openLightbox(`<img src="${img.dataset.full}" alt="">`);
    });
  }
  const vidThumb = document.querySelector('#staticDetail .entry-video-thumb');
  if(vidThumb){
    vidThumb.addEventListener('click', ()=>{
      const id = vidThumb.dataset.videoId;
      openLightbox(`<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>`);
    });
  }
}

function renderStatic(){
  renderEntrySidebar();
  renderEntryMarkers();
  renderStaticDetail();
  map.panTo([currentEntry.lat, currentEntry.lng], { animate:true, duration:0.7 });
}

function setMode(mode){
  currentMode = mode;
  document.querySelectorAll('.mode-btn').forEach(b=>{
    const isActive = b.dataset.mode===mode;
    b.classList.toggle('active', isActive);
    b.setAttribute('aria-pressed', isActive);
  });
  document.getElementById('moversSidebar').style.display = mode==='movers' ? 'block' : 'none';
  document.getElementById('staticSidebar').style.display = mode==='static' ? 'block' : 'none';
  document.getElementById('moversMain').style.display = mode==='movers' ? 'block' : 'none';
  document.getElementById('staticMain').style.display = mode==='static' ? 'block' : 'none';
  document.getElementById('moversMapLegend').style.display = mode==='movers' ? 'flex' : 'none';
  document.getElementById('staticMapLegend').style.display = mode==='static' ? 'flex' : 'none';
  document.getElementById('scrollCueText').textContent = mode==='movers' ? 'Timeline & full detail below' : 'Full detail below';
  document.getElementById('modeSub').textContent = mode==='movers'
    ? 'The documented movements of photographers and film crews who were present that morning, told through what can be confirmed, what can be reasonably reconstructed, and what remains estimated.'
    : 'Where photographers, filmmakers, and fixed cameras stood that morning - and what their position let them see.';

  if(mode==='movers'){
    map.removeLayer(entryLayerGroup);
    routeLayerGroup.addTo(map);
    rosterLayerGroup.addTo(map);
    if(travelerMarker) travelerMarker.addTo(map);
    render();
  } else {
    map.removeLayer(routeLayerGroup);
    map.removeLayer(rosterLayerGroup);
    if(travelerMarker) map.removeLayer(travelerMarker);
    entryLayerGroup.addTo(map);
    renderStatic();
  }
}

document.querySelectorAll('.mode-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>setMode(btn.dataset.mode));
});

document.getElementById('scrollCue').addEventListener('click', ()=>{
  const target = document.getElementById(currentMode==='movers' ? 'moversMain' : 'staticMain');
  target.scrollIntoView({ behavior:'smooth', block:'start' });
});

function buildRoster(){
  rosterLayerGroup.clearLayers();

  // simple collision spread: group people whose start points round to the same ~110m cell
  const cellOf = (lat,lng) => `${lat.toFixed(3)},${lng.toFixed(3)}`;
  const groups = {};
  PEOPLE.forEach(p=>{
    const start = p.waypoints[0];
    const key = cellOf(start.lat, start.lng);
    (groups[key] = groups[key] || []).push(p);
  });
  const shown = new Set(visiblePeople().map(p=>p.id));

  Object.values(groups).forEach(group=>{
    const n = group.length;
    group.forEach((p, idx)=>{
      if(!shown.has(p.id)) return;
      const start = p.waypoints[0];
      let lat = start.lat, lng = start.lng;
      if(n > 1){
        // spread siblings in a small ring around their shared start point
        const angle = (2*Math.PI/n) * idx;
        const r = 0.0009; // ~90-100m depending on latitude
        lat += r * Math.cos(angle);
        lng += r * Math.sin(angle) * 1.3;
      }
      const rosterAvatarInner = p.avatar ? `<img src="${p.avatar.src}" alt="">` : p.initials;
      const icon = L.divIcon({
        className: '',
        html: `<div class="roster-wrap ${p.id===currentPerson.id?'active':''}" style="position:relative;">
                 <div class="roster-avatar${p.avatar ? ' roster-avatar-photo':''} ${p.id===currentPerson.id?'active':'inactive'}">${rosterAvatarInner}</div>
                 <div class="roster-label">${p.name}</div>
               </div>`,
        iconSize: [36,36],
        iconAnchor: [18,18]
      });
      const marker = L.marker([lat,lng], { icon, zIndexOffset: p.id===currentPerson.id ? 900 : 500 }).addTo(rosterLayerGroup);
      marker.on('click', ()=>{ currentPerson = p; currentStep = 0; render(); });
    });
  });
}

function renderRoute(){
  routeLayerGroup.clearLayers();
  const wps = currentPerson.waypoints;

  for(let i=0;i<currentStep;i++){
    const a = wps[i], b = wps[i+1];
    const weight = b.conf==='confirmed' ? 3.5 : 2.8;
    // dark casing underneath for contrast on any basemap
    L.polyline([[a.lat,a.lng],[b.lat,b.lng]], {
      color: CASING, weight: weight + 3, opacity: 1, lineCap:'round'
    }).addTo(routeLayerGroup);
    // colored, confidence-styled line on top
    L.polyline([[a.lat,a.lng],[b.lat,b.lng]], {
      color: CONF_COLOR[b.conf], weight, dashArray: CONF_DASH[b.conf], opacity: 1, lineCap:'round'
    }).addTo(routeLayerGroup);
  }

  wps.forEach((w,i)=>{
    const isCurrent = i===currentStep;
    const isPast = i<=currentStep;
    const r = isCurrent ? 8 : 5.5;
    // dark halo casing
    L.circleMarker([w.lat,w.lng], {
      radius: r + 2.5, color:'transparent', fillColor:'#0f1216', fillOpacity: isPast ? 0.55 : 0.35
    }).addTo(routeLayerGroup);
    // cream ring + saturated fill
    const marker = L.circleMarker([w.lat,w.lng], {
      radius: r,
      color: '#efe9da',
      weight: 1.8,
      fillColor: isPast ? CONF_COLOR[w.conf] : '#5a6474',
      fillOpacity: 1
    }).addTo(routeLayerGroup);
    marker.bindPopup(`<b>${w.time} - ${w.place}</b><br>${w.text}`);
    marker.on('click', ()=>{ currentStep = i; render(); });
  });

  updateTraveler();
}

function ensureTraveler(latlng){
  const icon = L.divIcon({
    className: 'traveler-icon-wrap',
    html: `<div class="traveler-pulse"></div><div class="traveler-core"></div>`,
    iconSize: [1,1],
    iconAnchor: [0,0]
  });
  travelerMarker = L.marker(latlng, { icon, interactive:false, zIndexOffset: 1000 }).addTo(map);
}

function animateTraveler(fromLatLng, toLatLng, duration=650){
  if(travelAnimId) cancelAnimationFrame(travelAnimId);
  const start = performance.now();
  const from = L.latLng(fromLatLng);
  const to = L.latLng(toLatLng);
  const ease = t => t<0.5 ? 2*t*t : -1+(4-2*t)*t;
  function step(now){
    const t = Math.min(1, (now-start)/duration);
    const e = ease(t);
    travelerMarker.setLatLng([ from.lat+(to.lat-from.lat)*e, from.lng+(to.lng-from.lng)*e ]);
    if(t<1){ travelAnimId = requestAnimationFrame(step); }
  }
  travelAnimId = requestAnimationFrame(step);
}

function updateTraveler(){
  const w = currentPerson.waypoints[currentStep];
  const target = [w.lat, w.lng];
  if(!travelerMarker){
    ensureTraveler(target);
  } else if(prevPersonId !== currentPerson.id){
    if(travelAnimId) cancelAnimationFrame(travelAnimId);
    travelerMarker.setLatLng(target);
  } else if(prevLatLng){
    animateTraveler(prevLatLng, target);
  }
  prevPersonId = currentPerson.id;
  prevLatLng = target;
  map.panTo(target, { animate:true, duration: 0.7 });
}

function renderSidebar(){
  const list = document.getElementById('personList');
  list.innerHTML = '';
  visiblePeople().forEach(p=>{
    const btn = document.createElement('button');
    btn.className = 'person-btn' + (p.id===currentPerson.id ? ' active':'');
    const avatarInner = p.avatar ? `<img src="${p.avatar.src}" alt="" loading="lazy">` : p.initials;
    btn.innerHTML = `<span class="avatar${p.avatar ? ' avatar-photo':''}">${avatarInner}</span><span><span class="p-name">${p.name}</span><span class="p-role">${p.role}</span></span>`;
    btn.addEventListener('click', ()=>{ currentPerson = p; currentStep = 0; render(); });
    list.appendChild(btn);
  });
}

function renderTimeline(){
  const track = document.getElementById('tlTrack');
  track.querySelectorAll('.tl-tick').forEach(el=>el.remove());
  const wps = currentPerson.waypoints;
  const n = wps.length;
  const positions = n===1 ? [50] : computeTimelinePositions(wps, currentPerson.category);
  wps.forEach((w,i)=>{
    const tick = document.createElement('div');
    tick.className = `tl-tick ${w.conf} ${i===currentStep ? 'active':''}`;
    // clamp so labels near the edges don't clip off the track
    const pct = Math.min(96, Math.max(4, positions[i]));
    tick.style.left = pct + '%';
    tick.innerHTML = `<div class="dot"></div><div class="time">${w.time}</div>`;
    tick.addEventListener('click', ()=>{ currentStep = i; render(); });
    track.appendChild(tick);
  });
  document.getElementById('prevBtn').disabled = currentStep===0;
  document.getElementById('nextBtn').disabled = currentStep===wps.length-1;
}

const GLYPHS = {
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="#efe9da" stroke-width="1.8"><path d="M9 15l6-6M10 6l1-1a4 4 0 015.5 5.5l-1.5 1.5M14 18l-1 1a4 4 0 01-5.5-5.5l1.5-1.5"/></svg>',
  photo: '<svg viewBox="0 0 24 24" fill="none" stroke="#efe9da" stroke-width="1.8"><rect x="3" y="6" width="18" height="14" rx="1.5"/><circle cx="12" cy="13" r="3.2"/><path d="M8 6l1.5-2h5L16 6"/></svg>',
  image: '<svg viewBox="0 0 24 24" fill="none" stroke="#efe9da" stroke-width="1.8"><rect x="3" y="6" width="18" height="14" rx="1.5"/><circle cx="12" cy="13" r="3.2"/><path d="M8 6l1.5-2h5L16 6"/></svg>',
  video: '<svg viewBox="0 0 24 24" fill="none" stroke="#efe9da" stroke-width="1.8"><rect x="3" y="5" width="14" height="14" rx="1.5"/><path d="M17 10l4-2.5v9L17 14"/></svg>'
};
const LABELS = { link:'SOURCE', photo:'PHOTOGRAPH - NOT REPRODUCED', image:'PUBLIC DOMAIN PHOTOGRAPH (FEMA)', video:'VIDEO' };

function getHeroMedia(person){
  const priority = ['image','photo','video','link'];
  for(const type of priority){
    for(const w of person.waypoints){
      if(w.media){
        const found = w.media.find(m=>m.type===type);
        if(found) return found;
      }
    }
  }
  return null;
}

function renderHero(){
  const container = document.getElementById('personHero');
  const m = getHeroMedia(currentPerson);
  if(!m){ container.style.display = 'none'; container.innerHTML=''; return; }
  container.style.display = 'block';

  let mediaHtml;
  if(m.type === 'image' && m.src){
    mediaHtml = `<div class="hero-media">
      <img class="hero-img" src="${m.src}" alt="${m.title}" data-full="${m.fullSrc}"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
      <div class="hero-img-fallback" style="display:none;">
        <span>Image blocked from loading here - likely this preview pane's network sandbox.<br>Try opening the file directly in a browser tab, or <a href="${m.url}" target="_blank" rel="noopener" style="color:#c99a3d;">view it on Wikimedia Commons ↗</a></span>
      </div>
    </div>`;
  } else {
    const bigGlyph = (GLYPHS[m.type] || GLYPHS.link).replace(/width="\d+" height="\d+"/, '').replace('<svg', '<svg width="38" height="38"');
    const label = 'COPYRIGHTED';
    const cta = 'View at source ↗';
    mediaHtml = `<a class="hero-placeholder" href="${m.url}" target="_blank" rel="noopener">
      <div class="hero-placeholder-monogram">${currentPerson.initials}</div>
      <div class="hero-corner tl"></div><div class="hero-corner tr"></div>
      <div class="hero-corner bl"></div><div class="hero-corner br"></div>
      <div class="hero-placeholder-content">
        ${bigGlyph}
        <span class="hero-placeholder-label">${label}</span>
        <span class="hero-placeholder-cta">${cta}</span>
      </div>
    </a>`;
  }

  container.innerHTML = `
    ${mediaHtml}
    <div class="hero-info">
      <p class="hero-name">${currentPerson.name}</p>
      <p class="hero-role">${currentPerson.role}</p>
      <p class="hero-caption">${m.title}</p>
      <p class="hero-credit">${m.credit}</p>
      ${m.type==='image' ? `<a class="hero-link" href="${m.url}" target="_blank" rel="noopener">View full record at source ↗</a>` : ''}
    </div>
  `;
  const img = container.querySelector('.hero-img');
  if(img){
    img.addEventListener('click', ()=>{
      openLightbox(`<img src="${img.dataset.full}" alt="">`);
    });
  }
}

function renderDetail(){
  const w = currentPerson.waypoints[currentStep];
  const confLabel = { confirmed:'Confirmed', reconstructed:'Reconstructed', estimated:'Estimated' }[w.conf];
  const sourcesHtml = currentPerson.sources.map(s=>`&middot; ${s}`).join('<br>');

  function mediaCardHtml(m, idx){
    const thumbHtml = (m.type==='video' && m.videoId) ? `
      <div class="video-thumb" data-video-id="${m.videoId}">
        <img src="https://img.youtube.com/vi/${m.videoId}/hqdefault.jpg" alt="">
        <div class="play"><svg viewBox="0 0 24 24" fill="#efe9da"><circle cx="12" cy="12" r="11" fill="rgba(23,29,36,0.75)"/><path d="M10 8l6 4-6 4V8z"/></svg></div>
      </div>` : (m.type==='image' && m.src) ? `
      <img class="img-embed" src="${m.src}" alt="${m.title}" data-full="${m.fullSrc}"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
      <p class="img-fallback">Image did not load - view it directly at the source link below.</p>` : '';
    return `
    <div class="media-card">
      <div class="mc-glyph">${GLYPHS[m.type] || GLYPHS.link}</div>
      <div class="mc-body">
        <p class="mc-label">${LABELS[m.type] || 'SOURCE'}</p>
        <p class="mc-title">${m.title}</p>
        <p class="mc-credit">${m.credit}</p>
        ${thumbHtml}
        <p class="mc-note">${m.note}</p>
        <a class="mc-link" href="${m.url}" target="_blank" rel="noopener">${m.type==='video' ? 'Watch at source' : (m.type==='photo'||m.type==='image') ? 'View at source' : 'Visit source'} ↗</a>
      </div>
    </div>`;
  }

  const mediaHtml = (w.media || []).map(mediaCardHtml).join('');

  document.getElementById('detail').innerHTML = `
    <div class="detail-top"><span class="detail-time">${w.time}</span><span class="badge ${w.conf}">${confLabel}</span></div>
    <p class="detail-place">${placeLinkHtml(w.lat, w.lng, w.place)}</p>
    <p class="detail-narrative">${w.text}</p>
    ${mediaHtml}
    <div class="sources"><b>SOURCES FOR ${currentPerson.name.toUpperCase()}</b>${sourcesHtml}</div>
  `;

  document.querySelectorAll('.video-thumb').forEach(el=>{
    el.addEventListener('click', ()=>{
      const id = el.dataset.videoId;
      openLightbox(`<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>`);
    });
  });
  document.querySelectorAll('.img-embed').forEach(el=>{
    el.addEventListener('click', ()=>{
      openLightbox(`<img src="${el.dataset.full}" alt="">`);
    });
  });
}

function render(){
  renderSidebar();
  buildRoster();
  renderRoute();
  renderTimeline();
  renderHero();
  renderDetail();
}

document.getElementById('prevBtn').addEventListener('click', ()=>{ if(currentStep>0){ currentStep--; render(); } });
document.getElementById('nextBtn').addEventListener('click', ()=>{ if(currentStep<currentPerson.waypoints.length-1){ currentStep++; render(); } });
document.getElementById('aboutToggle').addEventListener('click', (ev)=>{
  const open = document.getElementById('aboutBox').classList.toggle('open');
  ev.currentTarget.setAttribute('aria-expanded', open);
});

function setHeaderCollapsed(collapsed){
  const btn = document.getElementById('headerCollapse');
  document.getElementById('headerInner').classList.toggle('collapsed', collapsed);
  btn.setAttribute('aria-expanded', !collapsed);
  btn.childNodes[0].textContent = collapsed ? 'Show description ' : 'Hide description ';
  try { localStorage.setItem('bw911-header-collapsed', collapsed ? '1' : '0'); } catch(e){}
}
let storedHeaderCollapsed = null;
try { storedHeaderCollapsed = localStorage.getItem('bw911-header-collapsed'); } catch(e){}
if(storedHeaderCollapsed === '1'){ setHeaderCollapsed(true); }
document.getElementById('headerCollapse').addEventListener('click', ()=>{
  setHeaderCollapsed(!document.getElementById('headerInner').classList.contains('collapsed'));
});

const dayCount = PEOPLE.filter(p=>p.category==='day').length;
const aftermathCount = PEOPLE.filter(p=>p.category==='aftermath').length;
document.querySelector('.filter-tab[data-filter="all"]').textContent = `All (${PEOPLE.length})`;
document.querySelector('.filter-tab[data-filter="day"]').textContent = `On the day (${dayCount})`;
document.querySelector('.filter-tab[data-filter="aftermath"]').textContent = `Weeks after (${aftermathCount})`;

document.querySelectorAll('.filter-tab').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    activeFilter = btn.dataset.filter;
    document.querySelectorAll('.filter-tab').forEach(b=>{
      b.classList.toggle('active', b===btn);
      b.setAttribute('aria-pressed', b===btn);
    });
    const visible = visiblePeople();
    if(!visible.some(p=>p.id===currentPerson.id)){
      currentPerson = visible[0];
      currentStep = 0;
    }
    render();
  });
});
document.getElementById('lightboxClose').addEventListener('click', closeLightbox);

render();
