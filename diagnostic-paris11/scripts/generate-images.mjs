/**
 * Génère l'image de partage (Open Graph, 1200 × 630) et l'icône Apple (180 × 180)
 * à partir de HTML, avec les polices du site.
 * Usage : node scripts/generate-images.mjs   (à relancer si le nom du cabinet change)
 */
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

const executablePath = process.env.CHROME_PATH || undefined;
// Polices intégrées en base64 (les URL file:// sont bloquées dans une page about:blank)
const font = (p) => `data:font/woff2;base64,${readFileSync(new URL(`../node_modules/${p}`, import.meta.url)).toString('base64')}`;
const site = readFileSync(new URL('../src/config/site.ts', import.meta.url), 'utf8');
const name = site.match(/name: '([^']+)'/)[1];

const css = `
@font-face { font-family: Cormorant; src: url(${font('@fontsource/cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff2')}); font-weight: 600; }
@font-face { font-family: Manrope; src: url(${font('@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2')}); font-weight: 200 800; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; background: #0f1d2e; color: #ece6da; font-family: Manrope; position: relative; overflow: hidden; }
.grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(236,230,218,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(236,230,218,.05) 1px, transparent 1px); background-size: 40px 40px; }
.wrap { position: absolute; left: 80px; top: 70px; right: 460px; }
.label { color: #d9a273; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; font-size: 20px; }
h1 { font-family: Cormorant; font-weight: 600; font-size: 76px; line-height: 1.02; margin-top: 22px; }
p { margin-top: 24px; font-size: 25px; color: #b7c0cc; line-height: 1.4; }
.name { position: absolute; left: 80px; bottom: 56px; font-family: Cormorant; font-size: 38px; font-weight: 600; }
.name span { display: block; font-family: Manrope; font-size: 18px; color: #b7c0cc; font-weight: 600; letter-spacing: .06em; }
svg { position: absolute; right: 70px; top: 70px; width: 360px; }
`;
const facade = `<svg viewBox="0 0 520 640" fill="none" stroke="#ece6da" stroke-width="2">
<rect x="60" y="180" width="360" height="420"/><polyline points="64,174 92,110 388,110 416,174"/><line x1="52" y1="180" x2="428" y2="180"/>
${[458, 390, 324, 260, 196].map((y) => [96, 168, 240, 312, 384].map((x) => `<rect x="${x - 15}" y="${y}" width="30" height="44"/>`).join('')).join('')}
<line x1="62" y1="446" x2="418" y2="446" stroke-width="3"/><line x1="62" y1="248" x2="418" y2="248" stroke-width="3"/>
${[96, 168, 312, 384].map((x) => `<path d="M${x - 24} 600 V552 Q${x} 528 ${x + 24} 552 V600"/>`).join('')}
<path d="M214 600 V548 Q240 518 266 548 V600"/>
<g stroke="#d9a273"><line x1="450" y1="600" x2="450" y2="110"/><line x1="443" y1="600" x2="457" y2="600"/><line x1="443" y1="110" x2="457" y2="110"/><line x1="60" y1="620" x2="420" y2="620"/></g></svg>`;

const og = `<html><head><style>${css}</style></head><body><div class="grid"></div>
<div class="wrap"><div class="label">Paris 11e et petite couronne</div><h1>Diagnostics immobiliers certifiés</h1><p>DPE, amiante, plomb, électricité, gaz, termites, Carrez. Rapport sous 24 h.</p></div>
${facade}<div class="name">${name}<span>DIAGNOSTICS IMMOBILIERS</span></div></body></html>`;

const browser = await chromium.launch({ executablePath });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(og, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'public/og-default.png' });

const icon = await browser.newPage({ viewport: { width: 180, height: 180 } });
await icon.setContent(`<html><body style="margin:0">${readFileSync('public/favicon.svg', 'utf8').replace('<svg', '<svg width="180" height="180"').replace('rx="12"', 'rx="0"')}</body></html>`);
await icon.screenshot({ path: 'public/apple-touch-icon.png' });
await browser.close();
console.log('Images générées : public/og-default.png, public/apple-touch-icon.png');
