const $=id=>document.getElementById(id);
const state={phase:'ready',elapsed:0,last:0,selection:null,receipt:null};
const load=()=>{
  try { return profile(JSON.parse(localStorage.getItem(storageKey))); }
  catch { return profile(); }
};
let data=load();
let visit=data.visit || newVisit(0);
let board=puzzle(visit);
let hostBridge;
let interacted=false;
let support={like:false,comment:false};
let audio;
let voices=new Set();
let particleTimer=0;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;

function newVisit(gallery) {
  const seed=new Uint32Array(1);
  if (globalThis.crypto?.getRandomValues) crypto.getRandomValues(seed);
  else seed[0]=Math.floor(Math.random()*4294967296);
  return {gallery,seed:seed[0],step:0,score:0,missed:false,begun:false};
}

function store() {
  try { localStorage.setItem(storageKey,JSON.stringify(data)); }
  catch { /* Session play remains available. */ }
}

function commit() {
  store();
  hostBridge?.save();
}

function syncProfile(incoming,remote) {
  const mayRestore=!interacted && !data.visit && state.phase==='ready';
  data=remote ? mergeProfiles(data,incoming,mayRestore) : profile(incoming);
  if (mayRestore && data.visit) {
    visit=data.visit;
    board=puzzle(visit);
    paint();
    render();
  }
  store();
  renderMeta();
  if ($('atlas').open) renderMap();
}

function restartBridge() {
  hostBridge=bridge({
    read:()=>profile(data),
    write:syncProfile,
    changed:event=>{
      if (event.type==='support') support={like:event.like,comment:event.comment};
      if (event.type==='connected') {
        support={like:false,comment:false};
        requestAnimationFrame(applyViewport);
      }
      if ($('atlas').open) renderMap();
      if (event.type==='reward') playCue('clear');
    }
  });
}

function unlockAudio() {
  if (data.mute) return;
  try {
    const Audio=window.AudioContext || window.webkitAudioContext;
    if (!Audio) return;
    audio ||= new Audio();
    audio.resume().catch(()=>{});
  } catch { /* Sound is optional. */ }
}

function playCue(kind) {
  if (!audio || audio.state!=='running' || data.mute || document.hidden) return;
  const cues={
    start:[[392,0,.13],[523,.09,.14]],
    steal:[[195,0,.16],[122,.10,.16],[740,.30,.09]],
    miss:[[233,0,.12],[175,.10,.17]],
    found:[[523,0,.14],[659,.06,.15],[784,.12,.21]],
    clear:[[523,0,.17],[659,.09,.17],[784,.18,.22],[1047,.27,.34]]
  };
  for (const [hz,delay,length] of cues[kind]) {
    if (voices.size>=18) break;
    const osc=audio.createOscillator();
    const gain=audio.createGain();
    const t=audio.currentTime+delay;
    osc.type=kind==='steal'?'triangle':'sine';
    osc.frequency.setValueAtTime(hz,t);
    if (kind==='steal') osc.frequency.exponentialRampToValueAtTime(hz*.67,t+length);
    gain.gain.setValueAtTime(.0001,t);
    gain.gain.exponentialRampToValueAtTime(.09,t+.017);
    gain.gain.exponentialRampToValueAtTime(.0001,t+length);
    osc.connect(gain).connect(audio.destination);
    voices.add(osc);
    osc.onended=()=>{voices.delete(osc);osc.disconnect();gain.disconnect();};
    osc.start(t);
    osc.stop(t+length+.01);
  }
}

function hush() {
  for (const osc of voices) {
    try { osc.stop(); }
    catch { /* A voice may already have ended. */ }
  }
  voices.clear();
}

function renderMeta() {
  $('sound').innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10v4h4l5 4V6l-5 4H3z"/>'+(data.mute?'<path d="m16 10 5 5m0-5-5 5"/>':'<path d="M16 9a4 4 0 0 1 0 6m3-9a8 8 0 0 1 0 12"/>')+'</svg>';
  $('sound').setAttribute('aria-label',data.mute?'Unmute sound':'Mute sound');
  $('sound').setAttribute('aria-pressed',String(data.mute));
  $('collection').textContent=`${data.medals.reduce((a,b)=>a+b,0)} / 18 STARS`;
}

function paint() {
  $('art').innerHTML=stageArt(galleries[visit.gallery],board,data.coat);
  draw();
}

function draw() {
  const phase=state.phase;
  const sneak=phase==='sneak';
  const t=sneak?Math.min(1,state.elapsed/820):0;
  const spot=artPosition(board.objects.length,board.slot);
  const hidden=phase==='choose'||phase==='wrong'||(sneak&&t>.54);
  const trophy=document.querySelector(`[data-slot="${board.slot}"]`);
  const ring=document.querySelector(`[data-ring="${board.slot}"]`);
  const cat=$('prowler');
  if (!cat || !trophy || !ring) return;
  trophy.setAttribute('opacity',hidden?'0':'1');
  ring.setAttribute('opacity',phase==='choose'||phase==='wrong'?'1':'0');
  const dark=sneak ? Math.sin(t*Math.PI)**.65*.90 : 0;
  $('shade').setAttribute('opacity',dark);
  const solved=phase==='found'||phase==='receipt';
  const cameo=phase==='ready';
  const catX=cameo?590:sneak ? 74+572*t:600;
  const catY=cameo?372:sneak ? 345-Math.sin(t*Math.PI)*21:373;
  const bounce=solved && !reduced ? -Math.max(0,Math.sin(Math.min(1,state.elapsed/650)*Math.PI))*17:0;
  cat.setAttribute('transform',`translate(${catX} ${catY+bounce}) scale(${cameo?'.72':'.85'})`);
  cat.setAttribute('opacity',sneak ? Math.sin(t*Math.PI)*.93 : solved?'1':cameo?'.92':'0');
  const sw=$('swipe');
  sw.setAttribute('transform',`translate(${spot.x} ${spot.y})`);
  sw.setAttribute('opacity',sneak&&t>.43&&t<.65&&(visit.gallery===0&&visit.step===0) ? '.84' : '0');
  if (phase==='watch') $('watchbar').firstElementChild.style.transform=`scaleX(${Math.max(0,1-state.elapsed/board.watch)})`;
}

function phase(next) {
  state.phase=next;
  state.elapsed=0;
  render();
  draw();
}

function render() {
  const current=state.phase;
  const row=galleries[visit.gallery];
  $('room-number').textContent=String(visit.gallery+1).padStart(2,'0');
  $('room').textContent=row.name;
  const completed=current==='found'||current==='receipt'?visit.step+1:visit.step;
  $('steps').setAttribute('aria-label',`${completed} of 3 exhibits recovered`);
  $('steps').innerHTML=Array.from({length:3},(_,i)=>`<i data-state="${i<completed?'done':i===completed?'current':'next'}"></i>`).join('');
  const messages={
    ready:['THE MUSEUM IS CLOSING','Spot the missing treasure.',visit.begun?'Resume case':'Start case','One exhibit will disappear'],
    watch:['LIGHTS ON','Remember these treasures.',null,'Look at the display'],
    sneak:['LIGHTS OUT','Something moved…',null,''],
    choose:[`EXHIBIT ${visit.step+1} OF 3`,'What went missing?',null,'Find the treasure from the empty stand'],
    wrong:['TAKE ANOTHER LOOK','Try another treasure.',null,'That one is still accounted for'],
    found:['TREASURE RECOVERED','Back in its place!',null,state.receipt?.first?'First try!':'Safe and sound'],
    receipt:['CASE CLOSED',`${state.receipt?.medal} ${state.receipt?.medal===1?'star':'stars'} earned`,visit.gallery<maximum?'Next gallery':'Play again','All three treasures recovered']
  };
  const [label,objective,action,hint]=messages[current];
  $('phase-label').textContent=label;
  $('objective').textContent=objective;
  $('status').textContent=hint;
  $('action').hidden=!action;
  $('action').textContent=action||'';
  $('watchbar').hidden=current!=='watch'&&current!=='sneak';
  if (current==='sneak') $('watchbar').firstElementChild.style.transform='scaleX(0)';
  const show=current==='choose'||current==='wrong'||current==='found';
  $('choices').style.setProperty('--n',board.choices.length);
  $('choices').innerHTML=show?board.choices.map(id=>{
    const selected=id===state.selection;
    const result=current==='found'&&selected?'right':current==='wrong'&&selected?'wrong':'';
    return `<button type="button" class="choice ${result}" data-choice="${id}" ${current==='found'?'disabled':''}>${cardArt(id)}<span>${names[id]}</span></button>`;
  }).join(''):'';
  renderMeta();
}

function spark() {
  if (reduced) return;
  const pos=artPosition(board.objects.length,board.slot);
  const size=$('art').getBoundingClientRect();
  const scale=Math.max(size.width/720,size.height/500);
  const x=(pos.x-360)*scale+size.width/2;
  const y=(pos.y-250)*scale+size.height/2;
  $('effect').innerHTML=Array.from({length:20},(_,i)=>{
    const a=i*2.39996;
    const r=21+(i%5)*10;
    return `<i class="spark" style="--x:${x}px;--y:${y}px;--dx:${Math.cos(a)*r}px;--dy:${Math.sin(a)*r}px"></i>`;
  }).join('');
  clearTimeout(particleTimer);
  particleTimer=setTimeout(()=>$('effect').replaceChildren(),740);
}

function begin() {
  interacted=true;
  unlockAudio();
  hostBridge?.start();
  visit={...visit,begun:true};
  data.visit=visit;
  commit();
  state.selection=null;
  phase('watch');
  playCue('start');
}

function choose(id) {
  if (!['choose','wrong'].includes(state.phase)||$('atlas').open||document.hidden) return;
  const result=answer(visit,id);
  if (!result) return;
  unlockAudio();
  state.selection=id;
  if (!result.correct) {
    visit=result.visit;
    data.visit=visit;
    commit();
    phase('wrong');
    $('choices').querySelector(`[data-choice="${id}"]`)?.focus({preventScroll:true});
    playCue('miss');
    return;
  }
  const first=!visit.missed;
  data.visit=result.visit;
  if (!result.visit) {
    data.medals[visit.gallery]=Math.max(data.medals[visit.gallery],result.medal);
    data=profile(data);
    hostBridge?.end();
  }
  state.receipt={...result,first};
  commit();
  phase('found');
  playCue(result.visit?'found':'clear');
  spark();
}

function next() {
  if (state.phase==='ready') return begin();
  if (state.phase==='receipt') pickGallery(visit.gallery<maximum?visit.gallery+1:visit.gallery);
}

function tick(now) {
  const delta=Math.min(55,Math.max(0,now-(state.last||now)));
  state.last=now;
  if (!document.hidden && !$('atlas').open) {
    state.elapsed+=delta;
    if (state.phase==='watch'&&state.elapsed>=board.watch) {
      phase('sneak');
      playCue('steal');
    } else if (state.phase==='sneak'&&state.elapsed>=820) {
      phase('choose');
    } else if (state.phase==='found'&&state.elapsed>=860) {
      if (!state.receipt.visit) phase('receipt');
      else {
        visit=state.receipt.visit;
        board=puzzle(visit);
        state.selection=null;
        state.phase='watch';
        state.elapsed=0;
        paint();
        render();
        playCue('start');
      }
    } else if (['watch','sneak','found'].includes(state.phase)) draw();
  }
  requestAnimationFrame(tick);
}

function pickGallery(index) {
  if (index>data.unlocked) return;
  if (data.visit && data.visit.gallery===index) {
    $('atlas').close();
    return;
  }
  interacted=true;
  hostBridge?.end();
  hostBridge?.prepare();
  visit=newVisit(index);
  board=puzzle(visit);
  data.visit=visit;
  state.selection=null;
  state.receipt=null;
  state.phase='ready';
  state.elapsed=0;
  commit();
  $('atlas').close();
  paint();
  render();
}

function renderMap() {
  $('rooms').innerHTML=galleries.map((room,i)=>`<button data-gallery="${i}" ${i>data.unlocked?'disabled':''}><b>${String(i+1).padStart(2,'0')}</b><span>${room.name}</span><b aria-label="${i>data.unlocked?'Locked':`${data.medals[i]} stars`}">${i>data.unlocked?'LOCKED':'★'.repeat(data.medals[i])+'☆'.repeat(3-data.medals[i])}</b></button>`).join('');
  const active=data.rewards.like||data.rewards.comment||support.like||support.comment;
  $('bonuses').hidden=!active;
  $('bonuses').innerHTML=active?[
    '<p class="eyebrow">THE PROWLER’S COATS</p>',
    support.like&&!data.rewards.like?'<p>Like the game in GameWave to earn the amber coat.</p>':'',
    support.comment&&!data.rewards.comment?'<p>Leave a direct comment in GameWave to earn the silver coat.</p>':'',
    data.rewards.like||data.rewards.comment?'<p>Coats change the raccoon in every gallery.</p>':'',
    ...[['classic','Classic'],['gold','Amber'],['silver','Silver']].filter(([id])=>id==='classic'||(id==='gold'?data.rewards.like:data.rewards.comment)).map(([id,label])=>`<button data-coat="${id}" aria-pressed="${data.coat===id}">${label}</button>`)
  ].join(''):'';
}

function applyViewport() {
  const v=hostBridge?.viewport();
  const root=document.documentElement;
  if (!v) return root.style.removeProperty('--host-width');
  const safeWidth=Math.min(v.width,document.documentElement.clientWidth);
  if (safeWidth>=280) root.style.setProperty('--host-width',`${safeWidth}px`);
  else root.style.removeProperty('--host-width');
}

$('action').addEventListener('click',next);
$('choices').addEventListener('click',e=>{
  const button=e.target.closest('[data-choice]');
  if (button) choose(Number(button.dataset.choice));
});
$('sound').addEventListener('click',()=>{
  data.mute=!data.mute;
  if (data.mute) hush();
  else unlockAudio();
  commit();
  renderMeta();
});
$('map').addEventListener('click',()=>{
  hush();
  renderMap();
  $('atlas').showModal();
});
$('close-map').addEventListener('click',()=>$('atlas').close());
$('rooms').addEventListener('click',e=>{
  const button=e.target.closest('[data-gallery]');
  if (button) pickGallery(Number(button.dataset.gallery));
});
$('bonuses').addEventListener('click',e=>{
  const button=e.target.closest('[data-coat]');
  if (!button) return;
  data=profile({...data,coat:button.dataset.coat});
  paint();
  commit();
  renderMap();
});
document.addEventListener('keydown',e=>{
  if ($('atlas').open||e.repeat||e.ctrlKey||e.altKey||e.metaKey) return;
  if (/^[1-4]$/.test(e.key)) {
    const id=board.choices[Number(e.key)-1];
    if (id!==undefined) choose(id);
  }
});
document.addEventListener('visibilitychange',()=>{
  state.last=0;
  if (document.hidden) hush();
  else hostBridge?.connect();
});
window.addEventListener('resize',applyViewport);
window.addEventListener('pagehide',()=>{
  hostBridge?.stop();
  hostBridge=null;
  hush();
});
window.addEventListener('pageshow',e=>{
  if (!e.persisted) return;
  data=load();
  visit=data.visit||newVisit(visit.gallery<=data.unlocked?visit.gallery:0);
  board=puzzle(visit);
  state.receipt=null;
  state.selection=null;
  state.phase='ready';
  state.elapsed=0;
  state.last=0;
  restartBridge();
  applyViewport();
  paint();
  render();
});

paint();
render();
restartBridge();
applyViewport();
requestAnimationFrame(tick);
