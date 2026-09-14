// Rend card.html en PNG 1280x640 (format social preview GitHub).
//   node shot.mjs [card.html] [og-image.png]
// Chromium : via PLAYWRIGHT_CHROMIUM (chemin d'un binaire) ou celui de playwright.
import { chromium } from 'playwright-core';

const html = process.argv[2] ?? new URL('card.html', import.meta.url).pathname;
const out = process.argv[3] ?? new URL('og-image.png', import.meta.url).pathname;

const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM || undefined,
  args: ['--no-sandbox', '--font-render-hinting=none'],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 640 }, deviceScaleFactor: 1 });
await page.goto('file://' + html);
await page.waitForTimeout(300);
await page.screenshot({ path: out });
await browser.close();
