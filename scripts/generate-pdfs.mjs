// Automated PDF Generator Script for NeuralAutomate.dev Pricing Guides
// Usage: npm run generate-pdfs
// Note: Requires Playwright chromium (run `npx playwright install chromium` locally once)

import fs from 'fs';
import path from 'path';
import { spawn, execSync } from 'child_process';
import { chromium } from 'playwright';

const PORT = 3789;
const BASE_URL = `http://localhost:${PORT}`;
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'pricing-pdfs');

const PDF_TARGETS = [
  { section: 'website', currency: 'INR', filename: 'NeuralAutomate-Pricing-Website-INR.pdf' },
  { section: 'website', currency: 'USD', filename: 'NeuralAutomate-Pricing-Website-USD.pdf' },
  { section: 'marketing', currency: 'INR', filename: 'NeuralAutomate-Pricing-Marketing-INR.pdf' },
  { section: 'marketing', currency: 'USD', filename: 'NeuralAutomate-Pricing-Marketing-USD.pdf' },
  { section: 'automation', currency: 'INR', filename: 'NeuralAutomate-Pricing-Automation-INR.pdf' },
  { section: 'automation', currency: 'USD', filename: 'NeuralAutomate-Pricing-Automation-USD.pdf' },
];

/**
 * Kill any lingering process on the target port before starting
 */
function killPortProcess(port) {
  if (process.platform === 'win32') {
    try {
      const output = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8' });
      const lines = output.trim().split('\n');
      for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        const pid = parts[parts.length - 1];
        if (pid && !isNaN(Number(pid)) && Number(pid) > 0) {
          execSync(`taskkill /pid ${pid} /F`, { stdio: 'ignore' });
        }
      }
    } catch (e) {
      // Port was free
    }
  }
}

/**
 * Server readiness check helper (HTTP GET request with retry loop)
 */
async function waitForServer(url, timeoutMs = 60000) {
  const startTime = Date.now();
  while (Date.now() - startTime < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status === 200) {
        return true;
      }
    } catch (err) {
      // Server starting up, wait 1 second
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error(`Server at ${url} failed to start within ${timeoutMs / 1000}s`);
}

async function main() {
  console.log('🚀 Starting NeuralAutomate PDF Generation Pipeline...\n');

  // 0. Ensure target port is free
  killPortProcess(PORT);

  // 1. Verify build folder (.next) exists
  const nextBuildPath = path.join(process.cwd(), '.next');
  if (!fs.existsSync(nextBuildPath)) {
    console.log('📦 Production build folder (.next) not found. Building project...');
    execSync('npm run build', { stdio: 'inherit' });
  }

  // 2. Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let serverProcess = null;
  let browser = null;

  try {
    // 3. Launch Next.js production server in background
    console.log(`📡 Launching Next.js server on port ${PORT}...`);
    serverProcess = spawn('npx', ['next', 'start', '-p', String(PORT)], {
      stdio: 'pipe',
      shell: true,
    });

    serverProcess.stderr.on('data', (data) => {
      const msg = data.toString();
      if (!msg.includes('ExperimentalWarning')) {
        process.stderr.write(`[Server Log]: ${msg}`);
      }
    });

    console.log('⏳ Waiting for localhost server to be ready...');
    await waitForServer(BASE_URL);
    console.log('✅ Next.js server is live!\n');

    // 4. Launch Playwright Headless Chromium
    console.log('🌐 Launching Playwright Headless Chromium...');
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ viewport: { width: 1200, height: 1600 } });
    const page = await context.newPage();

    // 5. Generate each PDF target
    console.log('📄 Generating 6 Pricing PDF documents...\n');
    for (const target of PDF_TARGETS) {
      const printUrl = `${BASE_URL}/pricing/print?section=${target.section}&currency=${target.currency}`;
      const filePath = path.join(OUTPUT_DIR, target.filename);

      console.log(`➡️  Generating [${target.filename}]...`);
      await page.goto(printUrl, { waitUntil: 'networkidle' });

      // Emulate CSS print media & wait for fonts (Inter / Outfit)
      await page.emulateMedia({ media: 'print' });
      await page.evaluate(() => document.fonts.ready);

      // Render A4 PDF with exact background colors enabled
      await page.pdf({
        path: filePath,
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: true,
        displayHeaderFooter: false,
      });

      // Stat file size & warn if > 2 MB
      const stats = fs.statSync(filePath);
      const fileSizeKB = (stats.size / 1024).toFixed(1);
      const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

      console.log(`   ✅ Saved: public/pricing-pdfs/${target.filename} (${fileSizeKB} KB)`);

      if (stats.size > 2 * 1024 * 1024) {
        console.warn(`   ⚠️  WARNING: ${target.filename} exceeds 2 MB limit (${fileSizeMB} MB)!`);
      }
    }

    console.log('\n🎉 All 6 Pricing PDFs successfully generated in public/pricing-pdfs/\n');
  } catch (error) {
    console.error('❌ PDF Generation Error:', error);
    process.exitCode = 1;
  } finally {
    // 6. Cleanup server & browser
    if (browser) {
      console.log('🔒 Closing Playwright browser...');
      await browser.close();
    }
    if (serverProcess) {
      console.log('🛑 Terminating Next.js test server...');
      killPortProcess(PORT);
    }
    console.log('✨ Cleanup complete.');
  }
}

main();
