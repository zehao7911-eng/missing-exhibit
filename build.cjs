const fs=require('node:fs');
const path=require('node:path');
const read=name=>fs.readFileSync(path.join(__dirname,name),'utf8');
const modules=['core.mjs','art.mjs','sdk.mjs','app.mjs'];
const script=modules.map(name=>read(name).replace(/^export /gm,'')).join('\n');
const icon='data:image/svg+xml,'+encodeURIComponent(read('icon.svg'));
const html=read('index-source.html')
  .replace('href="icon.svg"',()=>`href="${icon}"`)
  .replace('<!-- STYLE -->',()=>`<style>\n${read('style.css')}</style>`)
  .replace('<!-- SCRIPT -->',()=>`<script>\n(()=>{\n'use strict';\n${script}\n})();\n</script>`);
for (const file of ['index.html','standalone.html']) fs.writeFileSync(path.join(__dirname,file),html);
console.log(`Built both standalone entries (${Buffer.byteLength(html)} bytes).`);

async function cover() {
  const {stageArt}=await import('./art.mjs');
  const {galleries}=await import('./core.mjs');
  const cabinet=stageArt(galleries[0],{objects:[0,1,5]},'classic')
    .replace('<svg viewBox=', '<svg x="580" y="72" width="654" height="555" viewBox=')
    .replace('id="prowler" opacity="0"','id="prowler" opacity="1" transform="translate(540 338) scale(1.18)"');
  const poster=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720">
  <defs><linearGradient id="poster" x2=".8" y2="1"><stop stop-color="#45534a"/><stop offset="1" stop-color="#172028"/></linearGradient></defs>
  <rect width="1280" height="720" fill="url(#poster)"/>
  <rect x="25" y="25" width="1230" height="670" rx="29" fill="none" stroke="#dbb678" stroke-opacity=".65" stroke-width="2"/>
  ${cabinet}
  <path d="M96 178h381M96 528h381" stroke="#d8b57f" stroke-opacity=".64"/>
  <circle cx="113" cy="125" r="24" fill="#263536" stroke="#dbb678" stroke-width="2"/>
  <path d="m113 110 4 11 11 4-11 4-4 11-4-11-11-4 11-4z" fill="#ecc684"/>
  <text x="151" y="131" fill="#eac68b" font-family="system-ui,sans-serif" font-size="18" letter-spacing="4" font-weight="700">THE NIGHT MUSEUM</text>
  <text x="90" y="299" fill="#f9ecd1" font-family="Georgia,serif" font-size="90">Missing</text>
  <text x="90" y="392" fill="#f9ecd1" font-family="Georgia,serif" font-size="90">Exhibit</text>
  <text x="95" y="464" fill="#edc18b" font-family="system-ui,sans-serif" font-size="24">What went missing?</text>
  <text x="96" y="573" fill="#eac68b" font-family="system-ui,sans-serif" font-size="14" letter-spacing="3">SIX GALLERIES · ONE CURIOUS THIEF</text>
  </svg>`;
  fs.writeFileSync(path.join(__dirname,'cover.svg'),poster);
}

cover().catch(error=>{console.error(error);process.exitCode=1;});
