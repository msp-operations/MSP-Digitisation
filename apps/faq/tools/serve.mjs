// Tiny local preview server:  node tools/serve.mjs   ->  http://localhost:8099
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
const root = process.cwd(); // run from the repo root: node tools/serve.mjs
const types = { '.html':'text/html', '.json':'application/json', '.js':'text/javascript', '.svg':'image/svg+xml', '.webmanifest':'application/manifest+json', '.css':'text/css' };
http.createServer((req, res) => {
  let p = path.join(root, decodeURIComponent(req.url === '/' ? '/index.html' : req.url.split('?')[0]));
  let body;
  try { body = fs.readFileSync(p); }
  catch { res.writeHead(404); res.end('not found'); return; }
  res.writeHead(200, { 'content-type': types[path.extname(p)] || 'text/plain' });
  res.end(body);
}).listen(8099, () => console.log('MSP FAQ preview -> http://localhost:8099'));
