#!/usr/bin/env node
/**
 * Capture GIF demos from VS Code simulation HTML files.
 * Usage: node capture.mjs [--only command-palette|multi-cursor|debugger]
 */
import { chromium } from 'playwright-core';
import { execSync } from 'child_process';
import { mkdirSync, rmSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetsDir = join(__dirname, '..', 'assets');

// Find Playwright's bundled Chromium
function findChromium() {
  try {
    const projDir = join(__dirname, '..');
    const result = execSync(`node -e "const {chromium}=require('playwright-core');console.log(chromium.executablePath())"`, { encoding: 'utf-8', cwd: projDir }).trim();
    if (existsSync(result)) return result;
  } catch (e) { console.error('findChromium error:', e.message); }
  return null;
}

const demos = [
  {
    name: 'command-palette',
    file: 'command-palette.html',
    width: 800, height: 500,
    steps: [
      { step: 0, wait: 800 },   // idle editor
      { step: 1, wait: 600 },   // show palette
      { step: 2, wait: 300 },   // type f
      { step: 3, wait: 300 },   // fo
      { step: 4, wait: 300 },   // for
      { step: 5, wait: 300 },   // form
      { step: 6, wait: 400 },   // format
      { step: 7, wait: 800 },   // highlight
      { step: 8, wait: 1000 },  // close
      { step: 9, wait: 600 },   // reopen
      { step: 10, wait: 300 },  // the
      { step: 11, wait: 400 },  // theme
      { step: 12, wait: 800 },  // select
      { step: 13, wait: 800 },  // close
    ],
  },
  {
    name: 'multi-cursor',
    file: 'multi-cursor.html',
    width: 800, height: 500,
    steps: [
      { step: 0, wait: 1000 },  // initial
      { step: 1, wait: 800 },   // select first
      { step: 2, wait: 500 },   // Cmd+D 2
      { step: 3, wait: 500 },   // Cmd+D 3
      { step: 4, wait: 400 },   // Cmd+D 4
      { step: 5, wait: 400 },   // Cmd+D 5
      { step: 6, wait: 400 },   // Cmd+D 6
      { step: 7, wait: 1000 },  // Cmd+D 7 (all)
      { step: 8, wait: 600 },   // typing
      { step: 9, wait: 1500 },  // renamed
      { step: 10, wait: 800 },  // clean
    ],
  },
  {
    name: 'debugger',
    file: 'debugger.html',
    width: 800, height: 500,
    steps: [
      { step: 0, wait: 800 },   // initial
      { step: 1, wait: 800 },   // bp line 3
      { step: 2, wait: 800 },   // bp line 6
      { step: 3, wait: 1200 },  // F5 start
      { step: 4, wait: 800 },   // F10
      { step: 5, wait: 800 },   // F10
      { step: 6, wait: 1200 },  // F5 continue
      { step: 7, wait: 800 },   // F10
      { step: 8, wait: 1200 },  // finish
      { step: 9, wait: 800 },   // clean
    ],
  },
];

async function captureDemo(browser, demo) {
  const framesDir = join(__dirname, `frames-${demo.name}`);
  if (existsSync(framesDir)) rmSync(framesDir, { recursive: true });
  mkdirSync(framesDir, { recursive: true });

  const page = await browser.newPage({ viewport: { width: demo.width, height: demo.height } });
  const htmlPath = join(__dirname, demo.file);
  await page.goto(`file://${htmlPath}`);
  await page.waitForTimeout(300);

  let frameIdx = 0;
  const fps = 10; // frames per second for the GIF

  for (const { step, wait } of demo.steps) {
    // Execute the step
    await page.evaluate((s) => window.runStep(s), step);
    await page.waitForTimeout(50); // let render settle

    // Capture frames for the duration of this step
    const numFrames = Math.max(1, Math.round((wait / 1000) * fps));
    for (let f = 0; f < numFrames; f++) {
      const path = join(framesDir, `frame_${String(frameIdx).padStart(4, '0')}.png`);
      await page.screenshot({ path });
      frameIdx++;
      if (f < numFrames - 1) {
        await page.waitForTimeout(1000 / fps);
      }
    }
  }

  await page.close();

  // Convert frames to GIF using ffmpeg
  const outputPath = join(assetsDir, `${demo.name}.gif`);
  const cmd = `ffmpeg -y -framerate ${fps} -i "${framesDir}/frame_%04d.png" -vf "fps=${fps},scale=${demo.width}:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128:stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=3" "${outputPath}"`;

  console.log(`  Converting ${frameIdx} frames to GIF...`);
  execSync(cmd, { stdio: 'pipe' });

  // Cleanup frames
  rmSync(framesDir, { recursive: true });
  console.log(`  -> ${outputPath}`);
}

async function main() {
  const only = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1] : null;
  const selectedDemos = only ? demos.filter(d => d.name === only) : demos;

  if (selectedDemos.length === 0) {
    console.error(`Unknown demo: ${only}. Available: ${demos.map(d => d.name).join(', ')}`);
    process.exit(1);
  }

  mkdirSync(assetsDir, { recursive: true });

  const execPath = findChromium();
  if (!execPath) {
    console.error('Chromium not found. Run: npx playwright install chromium');
    process.exit(1);
  }
  console.log(`Using Chromium: ${execPath}`);

  const browser = await chromium.launch({ executablePath: execPath, headless: true });

  for (const demo of selectedDemos) {
    console.log(`Capturing: ${demo.name}`);
    await captureDemo(browser, demo);
  }

  await browser.close();
  console.log('\nAll GIFs generated in assets/');
}

main().catch(e => { console.error(e); process.exit(1); });
