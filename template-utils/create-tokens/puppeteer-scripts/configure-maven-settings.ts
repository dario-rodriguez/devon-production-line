import puppeteer from 'puppeteer';
import { parseArgs } from './utils/parse-args';

const { url, user, pass } = parseArgs(process.argv);

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  page.authenticate({ username: user, password: pass });

  await page.goto(url + '/configfiles/editConfig?id=MavenSettings');

  await page.setViewport({ width: 1920, height: 969 });

  await page.waitForSelector(
    '#main-panel > form > table > tbody > tr:nth-child(14) > td.setting-main > div.repeated-container > div.repeated-chunk.first.last.only > table > tbody > tr:nth-child(1) > td.setting-main > input',
  );
  await page.focus(
    '#main-panel > form > table > tbody > tr:nth-child(14) > td.setting-main > div.repeated-container > div.repeated-chunk.first.last.only > table > tbody > tr:nth-child(1) > td.setting-main > input',
  );
  await page.keyboard.type('pl-nexus');
  await page.$eval(
    '#main-panel > form > table > tbody > tr:nth-child(14) > td.setting-main > div.repeated-container > div.repeated-chunk.first.last.only > table > tbody > tr:nth-child(1) > td.setting-main > input',
    (el: any) => (el.value = 'pl-nexus'),
  );

  await page.waitForSelector(
    '#main-panel > form > table > tbody > tr:nth-child(14) > td.setting-main > div.repeated-container > div.repeated-chunk.first.last.only > table > tbody > tr:nth-child(4) > td.setting-main > div > div > select',
  );
  await page.select(
    '#main-panel > form > table > tbody > tr:nth-child(14) > td.setting-main > div.repeated-container > div.repeated-chunk.first.last.only > table > tbody > tr:nth-child(4) > td.setting-main > div > div > select',
    'nexus-api',
  );

  await page.waitForSelector('#yui-gen12-button');
  await page.click('#yui-gen12-button');

  page.waitForNavigation();

  await browser.close();
})();
