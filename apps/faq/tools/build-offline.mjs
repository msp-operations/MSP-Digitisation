// ─────────────────────────────────────────────────────────────────────────
//  Builds MSP-FAQ-offline.html: the whole app in ONE self-contained file
//  (styles, fonts, search engine, logo, photo, all answers inlined).
//  Meant for Canvas / USB / email distribution: opens from a double-click
//  with no internet, and when online it fetches the newest content.json
//  from the live site, so downloaded copies keep their answers current.
//
//  Run AFTER convert.mjs:   node tools/build-offline.mjs
//  Output:                  MSP-FAQ-offline.html (repo root, deploys too)
//
//  It rewrites index.html with exact-match anchors and THROWS if an anchor
//  is missing, so a future index.html change breaks the build, not the file.
// ─────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = f => fs.readFileSync(path.join(root, f));
const b64 = (f, mime) => `data:${mime};base64,` + read(f).toString('base64');

let html = read('index.html').toString('utf8').replace(/\r\n/g, '\n');

function swap(anchor, replacement, label) {
  const i = html.indexOf(anchor);
  if (i < 0) throw new Error(`Anchor not found (${label}). index.html changed, update build-offline.mjs`);
  if (html.indexOf(anchor, i + 1) >= 0) throw new Error(`Anchor not unique (${label})`);
  html = html.slice(0, i) + replacement + html.slice(i + anchor.length);
}

// 1. PWA plumbing out (manifest + icon file); icon becomes a data URI.
swap(`<link rel="manifest" href="manifest.webmanifest">\n<link rel="icon" href="icon.svg" type="image/svg+xml">`,
  `<link rel="icon" href="${b64('icon.svg', 'image/svg+xml')}" type="image/svg+xml">`, 'manifest/icon');
swap(`if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});`, '', 'sw registration');

// 2. Fonts: fonts.css inlined with the woff2 files as data URIs.
let fontsCss = read('assets/vendor/fonts.css').toString('utf8')
  .replace(/url\(([a-z0-9-]+\.woff2)\)/g, (_, f) => `url(${b64('assets/vendor/' + f, 'font/woff2')})`);
swap(`<link rel="stylesheet" href="assets/vendor/fonts.css">`, `<style>\n${fontsCss}</style>`, 'fonts link');

// 3. MiniSearch inlined.
swap(`<script src="assets/vendor/minisearch.min.js"></script>`,
  `<script>\n${read('assets/vendor/minisearch.min.js').toString('utf8')}\n</script>`, 'minisearch');

// 4. Images inlined (hero photo + logo).
swap(`url('assets/building.jpg')`, `url('${b64('assets/building.jpg', 'image/jpeg')}')`, 'building.jpg');
swap(`src="assets/msp-faq.png"`, `src="${b64('assets/msp-faq.png', 'image/png')}"`, 'logo');
swap(`src="assets/um-logo.png"`, `src="${b64('assets/um-logo.png', 'image/png')}"`, 'um logo');

// 5. No transcript feature in the offline file: pdf.js cannot load its worker
//    from file:// and inlining it costs 1.4 MB. Hide the button; handlers stay unreachable.
swap(`</style>\n</head>`, `#transcriptBtn{display:none!important}\n</style>\n</head>`, 'hide transcript');

// 6. Content: embed the answers, prefer a fresher cached copy from a past refresh.
const content = read('content.json').toString('utf8');
swap(`<script>\n/* ==========`,
  `<script>const EMBEDDED=${content.replace(/</g, '\\u003c')};</script>\n<script>\n/* ==========`, 'embed content');
swap(`  let data;
  try{const r=await fetch('content.json',{cache:'no-cache'});data=await r.json();localStorage.setItem('faqCache',JSON.stringify(data));}
  catch(e){const c=localStorage.getItem('faqCache');if(c)data=JSON.parse(c);else{$('#topics').innerHTML='<p>Could not load the FAQ. Please connect to the internet once.</p>';return;}}`,
  `  let data=EMBEDDED;
  try{const c=localStorage.getItem('faqOfflineCache');const cached=c?JSON.parse(c):null;
    if(cached&&cached.meta&&cached.meta.generated>EMBEDDED.meta.generated)data=cached;}catch(e){}`, 'content load');

// 7. Footer: say what this copy is, add the refresh button.
// One swap rather than two. The online footer used to open with a line about
// the transcript being read locally; that line was removed from index.html on
// 13 Aug 2026, so the offline notice is now prepended to the "Answers are a
// guide" line instead of replacing a line of its own.
swap(`  Answers are a guide; for official rules see the UM intranet or email the office shown on each answer.\n  <details class="privacy">`,
  `  This is the offline copy of the MSP Student FAQ. It works without internet and picks up updated answers whenever you are online.<br>
  Answers are a guide; for official rules see the UM intranet or email the office shown on each answer.<br>
  <button class="copy" id="refreshBtn" style="margin-top:8px">Check for new answers</button>
  <details class="privacy">`, 'footer line and refresh button');

// 7b. This copy checks msp-faqs.nl for fresher answers when it is opened online,
//     which sends the reader's IP to the host. Say so, in this copy only.
swap(`<p><b>The site itself.</b> This site is hosted on GitHub Pages.`,
  `<p><b>This offline copy.</b> When you open this file while connected to the internet, it checks msp-faqs.nl once for newer answers. That request tells the host your IP address, in the same way visiting any website does. Everything else in this file works with no connection at all.</p>
      <p><b>The site itself.</b> The online version is hosted on GitHub Pages.`, 'offline privacy line');

// 8. Refresh logic: manual button + a silent check on open when online.
//    Only reloads when the live content is strictly newer, so no reload loops.
swap(`load();\n</script>`,
  `load();
const LIVE='https://msp-faqs.nl/';
async function refreshAnswers(manual){
  try{
    const r=await fetch(LIVE+'content.json',{cache:'no-cache'});
    if(!r.ok)throw new Error('http '+r.status);
    const fresh=await r.json();
    if(fresh&&fresh.meta&&fresh.meta.generated>((state.data&&state.data.meta&&state.data.meta.generated)||'')){
      localStorage.setItem('faqOfflineCache',JSON.stringify(fresh));location.reload();
    }else if(manual){alert('You already have the latest answers ('+state.data.meta.generated+').');}
  }catch(e){if(manual)alert('Could not reach the live FAQ. Check your internet connection and try again.');}
}
$('#refreshBtn').onclick=()=>refreshAnswers(true);
if(navigator.onLine)setTimeout(()=>refreshAnswers(false),1500);
</script>`, 'refresh logic');

const out = path.join(root, 'MSP-FAQ-offline.html');
fs.writeFileSync(out, html, 'utf8');
console.log('Wrote', out, Math.round(fs.statSync(out).size / 1024) + ' KB');
