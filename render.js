const { chromium } = require('playwright');
const path = require('path');

const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const HTML = 'file://' + path.resolve(__dirname, 'zastavka.html');

async function screenshot(deviceScaleFactor, outFile) {
  const browser = await chromium.launch({ executablePath: CHROME });
  const ctx = await browser.newContext({ deviceScaleFactor });
  const page = await ctx.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto(HTML, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: outFile,
    fullPage: false,
    type: 'png',
    clip: { x: 0, y: 0, width: 1920, height: 1080 }
  });
  await browser.close();
  const label = deviceScaleFactor === 1 ? '1920×1080' : '3840×2160';
  console.log(`Saved: ${outFile}  (${label})`);
}

(async () => {
  await screenshot(1, path.join(__dirname, 'zastavka_1080.png'));
  await screenshot(2, path.join(__dirname, 'zastavka_4k.png'));
})();
