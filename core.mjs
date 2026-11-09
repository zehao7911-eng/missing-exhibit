export const galleries = [
  {name:'The Curio Room', tone:'#35564f', glow:'#f6c98b', cloth:'#365b53', set:[0,1,2,3,4,5,6], count:3, watch:1750},
  {name:'The Coral Cabinet', tone:'#234e68', glow:'#8cdbcd', cloth:'#275765', set:[7,8,9,10,2,11,12], count:4, watch:1850},
  {name:'The Royal Archive', tone:'#643d58', glow:'#f1aa98', cloth:'#653751', set:[4,13,5,11,14,15,0], count:4, watch:1500},
  {name:'The Jade Gallery', tone:'#335b47', glow:'#e7de99', cloth:'#43583e', set:[16,17,12,3,18,9,10,6], count:5, watch:1850},
  {name:'The Observatory', tone:'#364364', glow:'#bccdf1', cloth:'#41446b', set:[19,1,18,15,8,14,13,7], count:5, watch:1550},
  {name:'The Grand Vault', tone:'#704440', glow:'#ffca86', cloth:'#693c44', set:[20,6,16,19,17,5,14,2,11], count:6, watch:1600}
];
export const names = ['Ruby urn','Gold pocket watch','Ivory bust','Green perfume','Blue ribbon book','Sapphire crown','Pearl brooch','Coral shell','Blue globe','Jade seahorse','Glass jellyfish','Silver chalice','Amber fish','Rose locket','Gilded key','Bronze bell','Jade mask','Lucky cat','Crystal prism','Brass telescope','Royal Fabergé egg'];
export const maximum = galleries.length - 1;
export const storageKey = 'missing-exhibit-v1';
const clamp = (value,lo,hi) => Number.isInteger(value) ? Math.min(hi,Math.max(lo,value)) : lo;

export function profile(raw={}) {
  const p = raw && typeof raw==='object' ? raw : {};
  const medals = Array.from({length:galleries.length},(_,i)=>clamp(p.medals?.[i],0,3));
  const unlocked = Math.max(0,...medals.map((medal,i)=>medal>0 ? Math.min(maximum,i+1) : 0));
  const rewards = {like:p.rewards?.like===true,comment:p.rewards?.comment===true};
  const coat = p.coat==='gold'&&rewards.like || p.coat==='silver'&&rewards.comment ? p.coat : 'classic';
  let visit = null;
  const v=p.visit;
  if (v && Number.isInteger(v.gallery) && v.gallery>=0 && v.gallery<=unlocked && Number.isInteger(v.seed)) {
    const step=clamp(v.step,0,2);
    const missed=v.missed===true;
    visit={gallery:v.gallery,seed:v.seed>>>0,step,score:clamp(v.score,0,step),missed,begun:v.begun===true||step>0||missed};
  }
  return {medals,unlocked,rewards,coat,mute:p.mute===true,visit};
}

export function mergeProfiles(local,remote,allowVisit) {
  const other=profile(remote);
  return profile({...local,
    medals:local.medals.map((medal,i)=>Math.max(medal,other.medals[i])),
    rewards:{like:local.rewards.like||other.rewards.like,comment:local.rewards.comment||other.rewards.comment},
    visit:local.visit || (allowVisit ? other.visit : null)
  });
}

function shuffled(list,seed) {
  const result=[...list];
  for (let i=result.length-1;i>0;i--) {
    seed=(Math.imul(seed,1664525)+1013904223)>>>0;
    const j=Math.floor(seed/4294967296*(i+1));
    [result[i],result[j]]=[result[j],result[i]];
  }
  return result;
}

export function puzzle(visit) {
  const {gallery,seed,step}=visit;
  const room=galleries[gallery];
  const order=shuffled(room.set,seed ^ Math.imul(step+1,0x9e3779b1));
  const objects=order.slice(0,room.count);
  const slot=(seed+step*5+gallery*7)%objects.length;
  const missing=objects[slot];
  const wrong=order.slice(room.count,room.count+(gallery>1?2:1));
  const choices=shuffled([missing,...wrong,objects[(slot+1)%objects.length]],seed ^ Math.imul(step+3,0x85ebca6b));
  return {objects,slot,missing,choices,watch:room.watch+(step===0?130:-step*90)};
}

export function answer(visit,id) {
  const board=puzzle(visit);
  if (!board.choices.includes(id)) return null;
  if (id!==board.missing) return {correct:false,visit:{...visit,missed:true}};
  const score=visit.score+(visit.missed?0:1);
  if (visit.step===2) return {correct:true,score,medal:Math.max(1,score),visit:null};
  return {correct:true,score,visit:{...visit,score,step:visit.step+1,missed:false}};
}
