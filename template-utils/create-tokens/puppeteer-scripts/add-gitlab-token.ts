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
  const browser = await puppeteer.launch({
    // headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  page.authenticate({ username: user, password: pass });
  const navigationPromise = page.waitForNavigation();

  await page.goto(url + '/users/sign_out');

  await page.setViewport({ width: 1920, height: 969 });

  await page.waitForSelector(
    'body > div > div.container.navless-container > div > div.row > div.col-sm-5.new-session-forms-container > div > ul > li:nth-child(1) > a',
  );
  await page.click(
    'body > div > div.container.navless-container > div > div.row > div.col-sm-5.new-session-forms-container > div > ul > li:nth-child(1) > a',
  );
  await page.waitForSelector('#username');
  await page.focus('#username');
  await page.keyboard.type(user);

  await page.waitForSelector('#password');
  await page.focus('#password');
  await page.keyboard.type(pass);

  // await page.keyboard.press('Enter');
  // await page.waitForSelector(
  //   '#new_ldap_user > input.btn-success.btn.qa-sign-in-button',
  // );
  // await page.click('#new_ldap_user > input.btn-success.btn.qa-sign-in-button');
  await page.waitForSelector('#new_ldap_user');
  await page.$eval('#new_ldap_user', (el: any) => el.submit());

  console.log(page.url());

  await page.waitForSelector(
    'body > header > div > div > div.navbar-collapse.collapse > ul > li.nav-item.header-user.dropdown > a',
  );
  console.log('selectore');
  await delay(10000);
  await page.click(
    'body > header > div > div > div.navbar-collapse.collapse > ul > li.nav-item.header-user.dropdown > a',
  );

  await page.waitForSelector(
    'body > header > div > div > div.navbar-collapse.collapse > ul > li.nav-item.header-user.dropdown.show > div > ul > li:nth-child(5) > a',
  );
  await page.click(
    'body > header > div > div > div.navbar-collapse.collapse > ul > li.nav-item.header-user.dropdown.show > div > ul > li:nth-child(5) > a',
  );

  await navigationPromise;

  await page.waitForSelector(
    '.nav-sidebar-inner-scroll > .sidebar-top-level-items > li:nth-child(5) > a > .nav-item-name',
  );
  await page.click(
    '.nav-sidebar-inner-scroll > .sidebar-top-level-items > li:nth-child(5) > a > .nav-item-name',
  );

  await navigationPromise;

  await page.waitForSelector('#personal_access_token_name');
  await page.$eval(
    '#personal_access_token_name',
    (el: any) => (el.value = 'jenkins_new'),
  );
  await page.waitForSelector(
    '#new_personal_access_token #personal_access_token_name',
  );
  await page.click('#new_personal_access_token #personal_access_token_name');

  await page.waitForSelector(
    '#new_personal_access_token #personal_access_token_scopes_api',
  );
  await page.click(
    '#new_personal_access_token #personal_access_token_scopes_api',
  );

  await page.waitForSelector(
    '#new_personal_access_token #personal_access_token_scopes_read_user',
  );
  await page.click(
    '#new_personal_access_token #personal_access_token_scopes_read_user',
  );

  await page.waitForSelector(
    '#new_personal_access_token #personal_access_token_scopes_sudo',
  );
  await page.click(
    '#new_personal_access_token #personal_access_token_scopes_sudo',
  );

  await page.waitForSelector(
    '#new_personal_access_token #personal_access_token_scopes_read_repository',
  );
  await page.click(
    '#new_personal_access_token #personal_access_token_scopes_read_repository',
  );

  await page.waitForSelector(
    '#new_personal_access_token #personal_access_token_name',
  );
  await page.click('#new_personal_access_token #personal_access_token_name');

  await page.waitForSelector(
    '#new_personal_access_token > .prepend-top-default > .btn',
  );
  await page.click('#new_personal_access_token > .prepend-top-default > .btn');

  await navigationPromise;

  await page.waitForSelector('#created-personal-access-token');
  console.log(
    await page.$eval('#created-personal-access-token', (el: any) => el.value),
  );

  await browser.close();
})();
