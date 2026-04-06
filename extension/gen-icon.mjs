#!/usr/bin/env node
// Generate a simple 128x128 icon PNG using Canvas (via Playwright)
import { chromium } from 'playwright-core';
import { execSync } from 'child_process';
import { writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Find Chromium
function findChromium() {
  try {
    const result = execSync(`node -e "const {chromium}=require('playwright-core');console.log(chromium.executablePath())"`, {
      encoding: 'utf-8', cwd: join(__dirname, '..')
    }).trim();
    if (existsSync(result)) return result;
  } catch {}
  return null;
}

const html = `<!DOCTYPE html><html><head><style>
  * { margin:0; padding:0; }
  body { width:128px; height:128px; overflow:hidden; }
  canvas { display:block; }
</style></head><body>
<canvas id="c" width="128" height="128"></canvas>
<script>
  const c = document.getElementById('c');
  const ctx = c.getContext('2d');
  // Background - rounded rect
  ctx.fillStyle = '#1e1e1e';
  ctx.beginPath();
  ctx.roundRect(0, 0, 128, 128, 16);
  ctx.fill();
  // Blue accent bar
  ctx.fillStyle = '#007acc';
  ctx.fillRect(0, 108, 128, 20);
  // Python logo stylized
  ctx.fillStyle = '#3572A5';
  ctx.beginPath();
  ctx.roundRect(24, 20, 36, 36, 8);
  ctx.fill();
  ctx.fillStyle = '#FFD43B';
  ctx.beginPath();
  ctx.roundRect(68, 44, 36, 36, 8);
  ctx.fill();
  // PWS text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 14px -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('PWS', 64, 100);
  // Status bar text
  ctx.fillStyle = '#ffffff';
  ctx.font = '9px -apple-system, sans-serif';
  ctx.fillText('Python Pack', 64, 122);
</script>
</body></html>`;

async function main() {
  const ep = findChromium();
  if (!ep) { console.error('Chromium not found'); process.exit(1); }
  const browser = await chromium.launch({ executablePath: ep, headless: true });
  const page = await browser.newPage({ viewport: { width: 128, height: 128 } });
  await page.setContent(html);
  await page.waitForTimeout(200);
  await page.screenshot({ path: join(__dirname, 'icon.png'), omitBackground: true });
  await browser.close();
  console.log('icon.png generated');
}

main().catch(e => { console.error(e); process.exit(1); });
