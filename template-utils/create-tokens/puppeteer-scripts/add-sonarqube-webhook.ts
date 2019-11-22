import puppeteer from 'puppeteer';
import { parseArgs } from './utils/parse-args';

const { url, user, pass } = parseArgs(process.argv);

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  page.authenticate({ username: user, password: pass });

  await page.goto(url + '/projects');

  await page.setViewport({ width: 1920, height: 969 });

  await page.waitForSelector(
    '.navbar-inner > .navbar-limited > .global-navbar-menu > li:nth-child(6) > a',
  );
  await page.click(
    '.navbar-inner > .navbar-limited > .global-navbar-menu > li:nth-child(6) > a',
  );

  await page.waitForSelector(
    '.side-tabs-layout > .side-tabs-side > .side-tabs-menu > li:nth-child(13) > a',
  );
  await page.click(
    '.side-tabs-layout > .side-tabs-side > .side-tabs-menu > li:nth-child(13) > a',
  );

  await page.waitForSelector(
    '#settings-page > div > div.side-tabs-main > ul > li > ul > li > div > div.settings-definition-right > div:nth-child(2) > table > tbody > tr:last-child > td:nth-child(1) > input',
  );
  await page.focus(
    '#settings-page > div > div.side-tabs-main > ul > li > ul > li > div > div.settings-definition-right > div:nth-child(2) > table > tbody > tr:last-child > td:nth-child(1) > input',
  );
  await page.keyboard.type('jenkins');
  await page.waitForSelector(
    '#settings-page > div > div.side-tabs-main > ul > li > ul > li > div > div.settings-definition-right > div:nth-child(2) > table > tbody > tr:nth-last-child(2) > td:nth-child(2) > input',
  );
  await page.focus(
    '#settings-page > div > div.side-tabs-main > ul > li > ul > li > div > div.settings-definition-right > div:nth-child(2) > table > tbody > tr:nth-last-child(2) > td:nth-child(2) > input',
  );
  await page.keyboard.type(
    'http://jenkins-core:8080/jenkins/sonarqube-webhook/',
  );

  await page.waitForSelector(
    'li > .settings-definition > .settings-definition-right > .settings-definition-changes > .js-save-changes',
  );
  await page.click(
    'li > .settings-definition > .settings-definition-right > .settings-definition-changes > .js-save-changes',
  );

  await browser.close();
})();
