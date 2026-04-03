import { chromium, devices } from 'playwright';
import fs from 'fs';

const base = 'http://localhost:3002';
const outDir = '/tmp/cli-ui-review';
const summaryPath = `${outDir}/summary.txt`;

const pages = [
  ['home', '/'],
  ['getting-started-intro', '/getting-started/introduction'],
  ['first-commands', '/getting-started/first-commands'],
  ['tutorials-index', '/tutorials'],
  ['tutorials-multi-cloud', '/tutorials/multi-cloud'],
  ['demos-browser-terminal', '/demos/browser-terminal'],
  ['reference-command-reference', '/reference/command-reference'],
];

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(summaryPath, '');

const browser = await chromium.launch({ headless: true });

const desktop = await browser.newContext({
  viewport: { width: 1440, height: 900 },
});
for (const [name, path] of pages) {
  const page = await desktop.newPage();
  await page.goto(`${base}${path}`, {
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  });
  await page.waitForTimeout(1200);
  await page.screenshot({
    path: `${outDir}/${name}-desktop.png`,
    fullPage: true,
  });

  const h1 = (
    await page
      .locator('h1')
      .first()
      .textContent()
      .catch(() => '')
  )
    ?.trim()
    .replace(/\s+/g, ' ');
  const navLinks = await page.locator('nav a').count();
  const buttons = await page.locator('button').count();
  const links = await page.locator('a').count();
  const bodyText = ((await page.textContent('body')) || '').toLowerCase();
  const maybe404 = bodyText.includes('404') || bodyText.includes('not found');

  fs.appendFileSync(
    summaryPath,
    `${name} | path=${path} | h1=${h1} | navLinks=${navLinks} | buttons=${buttons} | links=${links} | maybe404=${maybe404}\n`,
  );

  await page.close();
}
await desktop.close();

const mobile = await browser.newContext({ ...devices['iPhone 13'] });
for (const [name, path] of pages) {
  const page = await mobile.newPage();
  await page.goto(`${base}${path}`, {
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  });
  await page.waitForTimeout(1200);
  await page.screenshot({
    path: `${outDir}/${name}-mobile.png`,
    fullPage: true,
  });
  await page.close();
}
await mobile.close();

await browser.close();

console.log(`Saved screenshots and summary to ${outDir}`);
