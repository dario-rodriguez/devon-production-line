import puppeteer from 'puppeteer';
import { parseArgs } from './utils/parse-args';

const { url, user, pass } = parseArgs(process.argv);

function delay(timeout: number) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

console.log(`${url} ${user} ${pass}`);

process.on('unhandledRejection', (reason, p) => {
  console.error(reason, 'Unhandled Rejection at Promise', p);
  process.exit(1);
});
process.on('uncaughtException', err => {
  console.error(err, 'Uncaught Exception thrown');
  process.exit(1);
});

(async () => {
  console.log('chiclis');
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-gpu'],
  });
  const page = await browser.newPage();
  // page.authenticate({ username: user, password: pass });

  console.log('chiclis');
  await page.goto(url + '/sessions/new');

  await page.setViewport({ width: 1920, height: 969 });

  console.log('chiclis');

  // const navigationPromise = page.waitForNavigation();

  await page.waitForSelector('#login');
  await page.focus('#login');
  await page.keyboard.type(user);

  await page.waitForSelector('#password');
  await page.focus('#password');
  await page.keyboard.type(pass);

  // await page.keyboard.press('Enter');

  // await page.waitForNavigation();
  await page.waitForSelector('form.login-form');
  await page.$eval('form.login-form', (el: any) => el.submit());

  await page.waitForSelector('.sidebar-page > #content #container');
  await page.click('.sidebar-page > #content #container');

  await page.waitForSelector(
    '.navbar-limited > .global-navbar-menu > .dropdown > .dropdown-toggle > .rounded',
  );
  await page.click(
    '.navbar-limited > .global-navbar-menu > .dropdown > .dropdown-toggle > .rounded',
  );

  await page.waitForSelector(
    '.dropdown > .popup > .menu > li:nth-child(3) > a',
  );
  await page.click('.dropdown > .popup > .menu > li:nth-child(3) > a');

  await page.waitForSelector(
    '.account-container > .account-nav > .navbar-tabs > li:nth-child(2) > a',
  );
  await page.click(
    '.account-container > .account-nav > .navbar-tabs > li:nth-child(2) > a',
  );

  await page.waitForSelector('#generate-token-form > input');
  await page.focus('#generate-token-form > input');
  await page.keyboard.type('jenkins');

  await page.waitForSelector(
    '.account-body > .boxed-group > .boxed-group-inner > #generate-token-form > .button',
  );
  await page.click(
    '.account-body > .boxed-group > .boxed-group-inner > #generate-token-form > .button',
  );

  await page.waitForSelector(
    '#account-page > div > div > div > div.panel.panel-white.big-spacer-top > code',
  );
  console.log(
    await page.$eval(
      '#account-page > div > div > div > div.panel.panel-white.big-spacer-top > code',
      el => el.textContent,
    ),
  );

  await browser.close();
})();
