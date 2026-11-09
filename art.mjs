const jewel = (x,y,c,r=4) => `<path d="M${x} ${y-r}l${r} ${r}-${r} ${r}-${r}-${r}z" fill="${c}" stroke="#fff" stroke-opacity=".38" stroke-width=".65"/>`;
const rivet = (x,y) => `<circle cx="${x}" cy="${y}" r="2" fill="#dfb877"/><circle cx="${x-.5}" cy="${y-.6}" r=".6" fill="#fff0ae"/>`;
const loop = (x,y,r=6) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#efc574" stroke-width="2.5"/>`;

const objects = [
  ['#f8a38e','#9e3448','#471f37',`<path d="M38 17h24l-3 17c0 8 17 10 17 29 0 18-12 23-26 23S24 81 24 63c0-19 17-21 17-29z" fill="F"/><ellipse cx="50" cy="18" rx="14" ry="4" fill="#e98577"/><ellipse cx="50" cy="17" rx="10" ry="2" fill="#512338"/><path d="M27 58q23-10 46 0m-45 15q22 7 44 0M39 28h22" stroke="#f8c97e" fill="none" stroke-width="2.6"/>${jewel(50,65,'#ffdd93',8)}<path d="M36 44q-8 9-6 17" class="gleam"/>`],
  ['#ffe6a4','#d79543','#7f4530',`${loop(50,21,7)}<path d="M44 21h12v12H44z" fill="#ad7043"/><circle cx="50" cy="58" r="29" fill="F"/><circle cx="50" cy="57" r="23" fill="#fff0cc" stroke="#754632" stroke-width="1.5"/><path d="M50 39v4m0 28v5M31 57h5m28 0h5M50 57V45m0 12 10 6" stroke="#704735" stroke-width="2.3" stroke-linecap="round"/><circle cx="50" cy="57" r="2.6" fill="#ad6757"/><path d="M27 51q4-15 18-19" class="gleam"/>`],
  ['#fff1d3','#d4bba0','#897c7a',`<path d="M27 76h46l4 9H23zm5-11h36l4 11H28z" fill="F"/><path d="M50 24c16-1 20 12 17 23l-1 9-10 7v4H44l1-10-7-6c-4-9-3-24 12-27z" fill="F"/><path d="M36 48c-12-22 10-37 27-28 6 3 9 10 9 15-9-1-17-5-20-10-1 11-10 13-16 23z" fill="#e5d0aa"/><path d="M40 27q8-7 18-3m-10 18 4 1m8-2 4 1m-9 4 3 5-4 1m-1 6 6-1" stroke="#ad9584" fill="none" stroke-linecap="round" stroke-width="1.6"/>`],
  ['#a9e7ba','#459e7d','#216161',`<path d="M33 40l11-8V22h12v10l11 8 11 23-7 17-21 7-21-7-7-17z" fill="F"/><path d="m33 40 17 5 17-5m-17 5v42M22 63l28 5 28-5" stroke="#d2ffdc" stroke-opacity=".55" fill="none"/><rect x="40" y="14" width="20" height="15" rx="4" fill="#ebbb70"/><path d="M43 18v7m5-7v7m5-7v7m5-7v7" stroke="#a37550"/><path d="m36 46-7 15" class="gleam"/>${jewel(50,60,'#f5d18b',8)}`],
  ['#a0b6e1','#5373a7','#29375f',`<path d="m27 27 46-6 8 51-49 14-9-9z" fill="#263455"/><path d="m30 37 44-7 6 39-48 12-4-6z" fill="#e8d4ad"/><path d="m26 25 47-7 7 48-48 12-9-7z" fill="F"/><path d="m31 30 38-6 6 37-39 10z" fill="none" stroke="#dfbc84"/><path d="m60 19 6 48 1 16 5-7 6 4-5-16-7-46z" fill="#d98079"/>${jewel(49,47,'#f5d18b',9)}<path d="m26 30 5 37" class="gleam"/>`],
  ['#ffe1a0','#d59554','#8d4935',`<path d="m19 35 16 16 15-26 15 26 16-16-7 38H26z" fill="F"/><ellipse cx="50" cy="73" rx="24" ry="9" fill="#c47e54"/><ellipse cx="50" cy="69" rx="24" ry="6" fill="#f6c681"/><path d="M25 58q25 9 50 0" fill="none" stroke="#ffe7b1" stroke-width="2"/>${jewel(50,52,'#648fdf',9)}${jewel(34,59,'#79bfba',4)}${jewel(66,59,'#c45e88',4)}<circle cx="19" cy="33" r="4" fill="#ffd791"/><circle cx="50" cy="24" r="5" fill="#ffeab5"/><circle cx="81" cy="33" r="4" fill="#ffd791"/>`],
  ['#fff5d8','#deb18f','#987175',`<path d="M50 21 77 34l5 24-15 21H33L18 58l5-24z" fill="#bd8758"/><path d="M50 26 73 37l4 20-13 17H36L23 57l4-20z" fill="none" stroke="#ffdd96" stroke-width="3"/><circle cx="50" cy="52" r="17" fill="F"/>${[[50,29],[67,37],[74,53],[64,69],[50,73],[35,68],[26,53],[34,37]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4" fill="#fff0d8"/>`).join('')}<path d="M40 49q3-7 10-8" class="gleam"/>`],
  ['#ffd4b4','#dd7d79','#9d536e',`<path d="M46 81C9 65 20 21 50 20s45 45 5 61z" fill="F"/><path d="M49 78C28 57 28 39 39 25m10 53C38 57 38 38 46 23m5 55c8-21 8-40 2-55m1 55c19-21 21-38 7-53m-4 53c25-14 28-30 13-43" fill="none" stroke="#ffe2c7" stroke-opacity=".67" stroke-width="2.3"/><path d="M41 76q10 4 19 0l-2 9H43z" fill="#b56875"/>`],
  ['#a4e3de','#4d9cac','#34598b',`<path d="M30 79q20-12 40 0v7H30zM48 68h5v13h-5z" fill="#ca9364"/><circle cx="50" cy="49" r="26" fill="F"/><path d="m32 33 10-8 10 6-3 8 7 6-7 6-8-2-3 10-10-6zm25 23 11-6 6 7-7 11-12 4z" fill="#a8cb8b"/><path d="M26 49h48M50 24q-26 25 0 50m0-50q26 25 0 50" stroke="#e5efc0" stroke-opacity=".52" fill="none"/><path d="M70 22a34 34 0 0 1-37 56" fill="none" stroke="#e3b171" stroke-width="3.5"/>`],
  ['#b4e0a5','#4f9d85','#27646a',`<path d="M66 29 58 17l-8 8-8-4-3 9-10 4-5 10 20 1 4 7-8 9-2 13 11 11 14 1 10-8-5-10-9-1-2 7 7 3-6 2-8-6 4-10 12-11z" fill="F"/><path d="M50 48 35 55l5 11m22-34-7 10m11 2-11 7m5 1-11 8" fill="none" stroke="#d7e3a2" stroke-width="2"/><circle cx="48" cy="33" r="3" fill="#24474a"/><path d="M33 39h8" class="gleam"/>`],
  ['#c8ecff','#6c96d0','#54558c',`<path d="M32 56q-9 9 0 18t0 12m13-29q-8 10 0 19t-1 11m14-29q8 10 0 19t1 11m12-33q10 9 2 18t0 12" fill="none" stroke="#a4b7eb" stroke-width="3" stroke-linecap="round"/><path d="M21 54q1-29 29-32 27 3 30 32-8 8-15 2-7 8-15 1-8 7-15-1-7 6-14-2z" fill="F"/><path d="M29 48q8-18 23-19" class="gleam"/><circle cx="58" cy="42" r="4" fill="#eef8fb"/>`],
  ['#f2f0e4','#a8bbc7','#556b8c',`<path d="M30 26h40v23q0 12-17 17v10l14 4v6H33v-6l14-4V66q-17-5-17-17z" fill="F"/><path d="M31 32H18v10q0 10 16 13m35-23h13v10q0 10-16 13" fill="none" stroke="#bbc6d1" stroke-width="4"/><ellipse cx="50" cy="26" rx="20" ry="5" fill="#e6e5d8"/><ellipse cx="50" cy="27" rx="15" ry="2.6" fill="#5e7590"/><path d="M37 35v12q1 8 7 10" class="gleam"/>${jewel(50,49,'#edb072',6)}`],
  ['#ffdd8e','#da8550','#a14f4a',`<path d="m67 47 19-14-3 22 3 19-19-12z" fill="#c9704c"/><path d="M39 38 47 25l15 13m-18 30 8 10 10-11" fill="#eca461"/><path d="M17 54q18-28 43-14 10 5 12 14-4 12-17 16-23 7-38-16z" fill="F"/><circle cx="32" cy="51" r="4" fill="#592f43"/><circle cx="31" cy="50" r="1.2" fill="#ffeed8"/><path d="M41 47q8 8 0 16m10-16q8 8 0 16m9-14q6 5 0 11" stroke="#ffdd97" fill="none" stroke-width="2"/>`],
  ['#ffb9bb','#ca6c8b','#843e6d',`${loop(50,24,8)}<path d="M50 80C24 64 19 54 25 42s20-11 25-2c5-9 19-10 25 2s1 22-25 38z" fill="#dfaa6c"/><path d="M50 74C29 60 25 53 30 45s15-6 20 2c5-8 16-10 20-2s1 15-20 29z" fill="F"/><path d="M33 50q3-8 10-4" class="gleam"/>${jewel(50,58,'#ffdfb3',7)}`],
  ['#ffe8a4','#c8894f','#87533d',`<g transform="rotate(-38 50 50)"><path d="M46 43h8v41h-8zM52 65h14v7H52zm0 11h11v7H52z" fill="F"/><path d="M50 16 67 25v14L50 48l-17-9V25zm0 8-9 5v6l9 5 9-5v-6z" fill="F" fill-rule="evenodd"/><path d="M36 29v7m14 13v28" class="gleam"/></g>`],
  ['#f7d59b','#b67552','#734439',`${loop(50,25,6)}<path d="M50 28q18 0 19 19l2 14 9 12q-29 10-60 0l9-12 2-14q1-19 19-19z" fill="F"/><ellipse cx="50" cy="73" rx="29" ry="6" fill="#a56650"/><ellipse cx="50" cy="74" rx="23" ry="3" fill="#553a3c"/><circle cx="50" cy="77" r="7" fill="#e9ba78"/><path d="M37 43q3-8 10-9m-18 27q21 5 42 0" class="gleam"/>`],
  ['#b5de9c','#659c6b','#285951',`<path d="M19 29q31-13 62 0l-5 27-11 19-15 10-15-10-11-19z" fill="F"/><path d="M24 38q26-12 52 0m-46 24 7 9m33-9-7 9" fill="none" stroke="#b7d9a2" stroke-width="2"/><path d="M30 45q8-4 15 3-10 7-15-3zm40 0q-8-4-15 3 10 7 15-3z" fill="#2a4b47"/><path d="m50 43-5 17 10-1m-13 7 8 4 8-4" fill="none" stroke="#e3d98a" stroke-width="2.4"/>`],
  ['#fff2d2','#dbb090','#a87476',`<path d="M28 73q-1-25 22-25 21 0 23 25v10H28z" fill="F"/><path d="M61 54q6-10 7-24 0-7 7-7t6 8q-1 23-12 36" fill="F"/><path d="M30 38V23l13 7q8-3 15 0l12-7v15q5 20-20 20T30 38z" fill="F"/><path d="M34 35l1-8 7 5m18 0 7-5 1 8" fill="#df8f8a"/><path d="M38 43q3-4 6 0m11 0q3-4 6 0m-14 5 3 2 3-2" fill="none" stroke="#5f4b55" stroke-width="1.7" stroke-linecap="round"/><path d="M35 57q15 8 30 0" fill="none" stroke="#ba605d" stroke-width="4"/><circle cx="50" cy="63" r="4" fill="#f1c873"/>`],
  ['#eeebff','#a5a3de','#565d9f',`<path d="m50 15 27 31-27 41-27-41z" fill="F"/><path d="m50 15 11 31-11 41-11-41z" fill="#d8c8f4"/><path d="m50 15-11 31H23l16 4 11 37 11-41h16L61 42z" fill="#f3e9ff" opacity=".62"/><path d="m31 44 14-17" class="gleam"/>${jewel(66,52,'#f8d692',6)}`],
  ['#fee6a8','#b87f5d','#744b4d',`<path d="m52 52-14 34m14-34 16 34m-16-34v32" stroke="#c78e65" stroke-width="5" stroke-linecap="round"/><circle cx="52" cy="54" r="6" fill="#e7ad71"/><g transform="rotate(-25 50 43)"><path d="M24 38h49v15H24z" fill="F"/><rect x="54" y="34" width="20" height="23" rx="4" fill="F"/><rect x="72" y="32" width="9" height="27" rx="3" fill="#dba477"/><ellipse cx="79" cy="45" rx="4" ry="11" fill="#709fb3"/><path d="M29 42h35" class="gleam"/><path d="M20 38h9v15h-9z" fill="#b17c63"/></g>`],
  ['#f9a493','#bd565f','#702f52',`<path d="M50 17c16 0 28 27 28 44q0 22-28 23T22 61c0-17 12-44 28-44z" fill="F"/><path d="M28 51q22 20 44 0M26 62q24-14 48 0M38 26q-2 31 12 56m12-56q2 31-12 56" fill="none" stroke="#efca85" stroke-width="2"/>${jewel(50,52,'#ffdda0',7)}${jewel(50,33,'#ffe4b7',4)}<path d="M42 23q-8 6-12 17" class="gleam"/>`]
];

function finish(id,key) {
  const [light,mid,dark,shape]=objects[id];
  const paint=`<linearGradient id="${key}" x2=".35" y2="1" gradientUnits="objectBoundingBox"><stop stop-color="${light}"/><stop offset=".52" stop-color="${mid}"/><stop offset="1" stop-color="${dark}"/></linearGradient>`;
  return `<defs>${paint}</defs><g stroke-linejoin="round">${shape.replaceAll('fill="F"',`fill="url(#${key})" stroke="${dark}" stroke-width="1.1"`)}</g>`;
}

export const cardArt = id => `<svg viewBox="13 11 74 78" aria-hidden="true">${finish(id,`card-${id}`)}</svg>`;
const layouts = {
  3:[[190,270],[360,270],[530,270]],
  4:[[190,200],[530,200],[190,320],[530,320]],
  5:[[190,200],[360,200],[530,200],[275,320],[445,320]],
  6:[[190,200],[360,200],[530,200],[190,320],[360,320],[530,320]]
};

function platform(x,y,id,slot) {
  return `<g transform="translate(${x} ${y})"><ellipse cy="58" rx="58" ry="12" fill="#0e171a" opacity=".43"/><path d="M-48 38v13c0 8 21 15 48 15s48-7 48-15V38z" fill="url(#plinth)" stroke="#654631" stroke-width="2"/><ellipse cy="38" rx="48" ry="13" fill="#9d7555" stroke="#edc58a" stroke-width="1.5"/><ellipse cy="39" rx="40" ry="8" fill="#432f2f" opacity=".58"/><rect x="-17" y="51" width="34" height="8" rx="2" fill="#ce9e62"/><path d="M-8 55H8" stroke="#634c42" stroke-width="1.5"/><g class="exhibit" data-slot="${slot}" transform="translate(-50 -47)">${finish(id,`object-${slot}`)}</g><ellipse class="empty-ring" data-ring="${slot}" cy="38" rx="38" ry="9" stroke="#ffda8a" stroke-width="2.5" fill="none" stroke-dasharray="4 4" opacity="0"/></g>`;
}

function wallLight(x) {
  return `<g transform="translate(${x} 129)"><path d="M-11 13-70 145H70L11 13z" fill="url(#sconce-glow)" opacity=".23"/><ellipse cy="14" rx="10" ry="17" fill="#8b633f"/><path d="M0 15v19" stroke="#e4b471" stroke-width="4"/><path d="M-12-9h24l6 24h-36z" fill="url(#brass)" stroke="#ffe1a1" stroke-width="1.5"/><path d="M-7-6-10 12m10-18v18m7-18 3 18" stroke="#ffe1a2" opacity=".72"/></g>`;
}

function curioCrest() {
  return `<g transform="translate(360 160)" opacity=".75">
    <path d="M-121 26q46 3 85-8m157 8q-46 3-85-8M-92 34q35 1 57-7m127 7q-35 1-57-7" fill="none" stroke="#c1ab79" stroke-opacity=".46"/>
    <path d="M0-35 30-23v30q0 18-30 32-30-14-30-32v-30z" fill="#252e36" stroke="#c49f71" stroke-width="2"/>
    <path d="M0-29 24-19v25q0 14-24 27Q-24 20-24 6v-25z" fill="#535449" stroke="#d1af77" stroke-width="1"/>
    <path d="M-13 13v-21l13 14L13-8v21" fill="none" stroke="#f1cf91" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    ${jewel(0,-16,'#ffe6a9',4)}${jewel(-99,21,'#d3b981',3)}${jewel(99,21,'#d3b981',3)}
  </g>`;
}

function raccoon(coat) {
  const fur={classic:'#788183',gold:'#b48051',silver:'#a1b7be'}[coat];
  return `<g transform="translate(0 36)" stroke-linejoin="round">
    <path d="M-22 28C-41 24-66 43-81 27s-3-27 9-23 18 20 48 12" fill="${fur}" stroke="#222630" stroke-width="3"/>
    <path d="M-73 6q-7 6-7 16m15-6-5 15m16-12-2 13" fill="none" stroke="#393c46" stroke-width="6"/>
    <path d="M-30 39q-12 0-12 7t19 3l11-11m28 1q12 0 14 8t-18 3L0 42" fill="#343944"/>
    <ellipse cx="-6" cy="24" rx="28" ry="21" fill="${fur}" stroke="#282c36" stroke-width="2"/>
    <ellipse cx="-1" cy="31" rx="18" ry="13" fill="#b6ab9b"/>
    <path d="M-20 14q16 13 38-1l-2 9q-21 11-38 0z" fill="#c36d57"/>
    <path d="M-14 18-25 35-13 30-7 39-3 21" fill="#ce7a61"/>
    <path d="M-12-12q-16-11-13-21 12-4 21 11M14-21q13-17 21-10 3 11-9 22" fill="${fur}" stroke="#333841" stroke-width="2"/>
    <path d="m-18-29 12 11-8 2zm47 1-10 11 10 3z" fill="#c68780"/>
    <path d="M-20-8Q-11-29 11-24 34-22 38-1 31 17 9 19-11 17-20-8z" fill="${fur}" stroke="#333841" stroke-width="2"/>
    <path d="M-14-6q13-9 24 0 12-10 25-2-5 16-17 16l-8-4-9 4q-10-1-15-14z" fill="#343843"/>
    <path d="M-7 7q9-4 16-1 8-5 19 0-7 11-18 11T-7 7z" fill="#e2d3bf"/>
    <ellipse cx="12" cy="5" rx="5" ry="3.5" fill="#292c36"/><path d="M9 5h2m-13-9h2m21-1h2" stroke="#fff1da" stroke-width="2.7" stroke-linecap="round"/>
    <path d="M9 12q4 3 8-1" fill="none" stroke="#63494c" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M19 31q11 6 24-1" fill="none" stroke="#353943" stroke-width="9" stroke-linecap="round"/>
  </g>`;
}

export function stageArt(room,board,coat) {
  const single=board.objects.length===3;
  const lamps=single?'<path d="M133 151h454" stroke="#dfb77b" opacity=".14"/>':'<path d="M131 256h458" stroke="#dfb77b" opacity=".15"/>';
  return `<svg viewBox="0 0 720 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="wall" x2="0" y2="1"><stop stop-color="#1c252d"/><stop offset=".62" stop-color="${room.tone}"/><stop offset="1" stop-color="#2b232c"/></linearGradient>
      <linearGradient id="brass" x2=".1" y2="1"><stop stop-color="#f8d493"/><stop offset=".46" stop-color="#aa7046"/><stop offset=".51" stop-color="#865739"/><stop offset="1" stop-color="#533c33"/></linearGradient>
      <linearGradient id="wood" x2="0" y2="1"><stop stop-color="#965f49"/><stop offset=".3" stop-color="#6c473a"/><stop offset="1" stop-color="#352831"/></linearGradient>
      <linearGradient id="plinth" x2="0" y2="1"><stop stop-color="#e0b17f"/><stop offset=".4" stop-color="#9b634b"/><stop offset="1" stop-color="#573739"/></linearGradient>
      <linearGradient id="sconce-glow" x2="0" y2="1"><stop stop-color="${room.glow}"/><stop offset="1" stop-color="${room.glow}" stop-opacity="0"/></linearGradient>
      <radialGradient id="cloth" cx=".5" cy=".34" r=".7"><stop stop-color="${room.cloth}"/><stop offset=".71" stop-color="${room.tone}"/><stop offset="1" stop-color="#172429"/></radialGradient>
      <radialGradient id="vignette" cx=".5" cy=".45" r=".7"><stop offset=".42" stop-color="#0f141b" stop-opacity="0"/><stop offset="1" stop-color="#0b1118" stop-opacity=".82"/></radialGradient>
      <radialGradient id="light"><stop stop-color="${room.glow}" stop-opacity=".28"/><stop offset="1" stop-color="${room.glow}" stop-opacity="0"/></radialGradient>
      <pattern id="damask" width="35" height="47" patternUnits="userSpaceOnUse"><path d="M17.5 2q-5 13-13 20 10 5 13 19 4-15 13-19Q22 15 17.5 2zm0 7v22M0 1l3 6m29 0 3-6" fill="none" stroke="#edc58d" stroke-width=".7" opacity=".24"/><circle cx="17.5" cy="22" r="2" fill="#edd5a7" opacity=".23"/></pattern>
      <pattern id="carpet" width="21" height="14" patternUnits="userSpaceOnUse"><path d="m0 7 10-5 11 5-11 5z" fill="none" stroke="#e1ab79" opacity=".28"/></pattern>
      <clipPath id="interior"><path d="M121 384V177q0-67 69-89 169-44 340 0 69 22 69 89v207z"/></clipPath>
    </defs>
    <rect width="720" height="500" fill="url(#wall)"/>
    <rect width="720" height="437" fill="url(#damask)"/>
    <path d="M0 75h720m-720 7h720M0 395h720m-720 8h720" stroke="#bd9363" stroke-opacity=".4" stroke-width="2"/>
    <path d="M0 423h720v77H0z" fill="url(#wood)"/>
    <path d="M0 445h720m-720 23h720m-640 32 75-78m47 78 51-78m91 78 5-78m109 78-41-78m164 78-75-78m180 78-114-78" fill="none" stroke="#d29567" stroke-opacity=".35" stroke-width="1.5"/>
    <path d="M164 448h392l75 52H89z" fill="#743f49" stroke="#af775b" stroke-width="3"/><path d="M164 448h392l75 52H89z" fill="url(#carpet)"/>
    ${wallLight(56)}${wallLight(664)}
    <path d="M91 407V176q0-88 87-111 181-47 364 0 87 23 87 111v231z" fill="#151d21" stroke="#161a1f" stroke-width="8"/>
    <path d="M100 397V175q0-83 82-105 180-47 356 0 82 22 82 105v222z" fill="url(#brass)" stroke="#e5b982" stroke-width="2"/>
    <path d="M111 390V175q0-74 75-97 177-45 348 0 75 23 75 97v215z" fill="#6e4e3e" stroke="#ffd69b" stroke-opacity=".63" stroke-width="2"/>
    <path d="M121 384V177q0-67 69-89 169-44 340 0 69 22 69 89v207z" fill="url(#cloth)"/>
    <g clip-path="url(#interior)">
      <rect x="118" y="67" width="484" height="318" fill="url(#damask)" opacity=".57"/>
      <path d="M126 103h468l-30 25-64-17-70 14-70-10-70 10-70-14-64 17z" fill="#26282b" opacity=".48"/>
      <path d="M119 377h483v9H119z" fill="#ab7e58" opacity=".55"/>${lamps}
      <ellipse cx="360" cy="227" rx="253" ry="231" fill="url(#light)"/>
      ${single?curioCrest():''}
      ${layouts[board.objects.length].map(([x,y],slot)=>platform(x,y,board.objects[slot],slot)).join('')}
    </g>
    <g fill="url(#brass)" stroke="#dcad73" stroke-opacity=".45">
      <rect x="90" y="387" width="540" height="15" rx="4"/><path d="M109 402h502v39H109z"/><rect x="100" y="434" width="520" height="12" rx="4"/>
    </g>
    <path d="M125 411h155v16H125zm315 0h155v16H440z" fill="none" stroke="#dbaf78" opacity=".53"/>
    <rect x="321" y="408" width="78" height="20" rx="5" fill="#32292e" stroke="#d6a66f"/>
    <path d="M349 418h22m-11-4v8" stroke="#e3b47f" stroke-width="1.5" stroke-linecap="round"/>
    ${rivet(328,418)}${rivet(392,418)}
    <path d="M333 71q27-8 54 0l-4 17h-46z" fill="url(#brass)" stroke="#f4c47d"/>${jewel(360,77,'#fff0bc',5)}
    <g id="prowler" opacity="0">${raccoon(coat)}</g>
    <rect width="720" height="500" fill="url(#vignette)" pointer-events="none"/>
    <rect id="shade" width="720" height="500" fill="#0c1422" opacity="0" pointer-events="none"/>
    <g id="swipe" opacity="0" stroke="#ffdaa0" stroke-width="2" stroke-linecap="round"><path d="M-16 5q11-19 24-19M-9 10Q4-7 18-8M0 15q9-11 19-13"/>${jewel(21,-14,'#ffe7b9',4)}</g>
    <style>.gleam{fill:none;stroke:#fff3d6;stroke-width:2;stroke-linecap:round;opacity:.68}</style>
  </svg>`;
}

export function artPosition(count,slot) {
  const [x,y]=layouts[count][slot];
  return {x,y:y+9};
}
