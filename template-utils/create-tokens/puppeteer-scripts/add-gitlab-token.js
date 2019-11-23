"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const parse_args_1 = require("./utils/parse-args");
const { url, user, pass } = parse_args_1.parseArgs(process.argv);
function delay(timeout) {
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
(() => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch({
        // headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = yield browser.newPage();
    page.authenticate({ username: user, password: pass });
    const navigationPromise = page.waitForNavigation();
    yield page.goto(url + '/users/sign_out');
    yield page.setViewport({ width: 1920, height: 969 });
    yield page.waitForSelector('body > div > div.container.navless-container > div > div.row > div.col-sm-5.new-session-forms-container > div > ul > li:nth-child(1) > a');
    yield page.click('body > div > div.container.navless-container > div > div.row > div.col-sm-5.new-session-forms-container > div > ul > li:nth-child(1) > a');
    yield page.waitForSelector('#username');
    yield page.focus('#username');
    yield page.keyboard.type(user);
    yield page.waitForSelector('#password');
    yield page.focus('#password');
    yield page.keyboard.type(pass);
    // await page.keyboard.press('Enter');
    // await page.waitForSelector(
    //   '#new_ldap_user > input.btn-success.btn.qa-sign-in-button',
    // );
    // await page.click('#new_ldap_user > input.btn-success.btn.qa-sign-in-button');
    yield page.waitForSelector('#new_ldap_user');
    yield page.$eval('#new_ldap_user', (el) => el.submit());
    yield page.waitForNavigation();
    console.log(yield page.content());
    console.log(page.url());
    yield page.waitForSelector('body > header > div > div > div.navbar-collapse.collapse > ul > li.nav-item.header-user.dropdown > a');
    console.log('selectore');
    yield delay(10000);
    yield page.click('body > header > div > div > div.navbar-collapse.collapse > ul > li.nav-item.header-user.dropdown > a');
    yield page.waitForSelector('body > header > div > div > div.navbar-collapse.collapse > ul > li.nav-item.header-user.dropdown.show > div > ul > li:nth-child(5) > a');
    yield page.click('body > header > div > div > div.navbar-collapse.collapse > ul > li.nav-item.header-user.dropdown.show > div > ul > li:nth-child(5) > a');
    yield navigationPromise;
    yield page.waitForSelector('.nav-sidebar-inner-scroll > .sidebar-top-level-items > li:nth-child(5) > a > .nav-item-name');
    yield page.click('.nav-sidebar-inner-scroll > .sidebar-top-level-items > li:nth-child(5) > a > .nav-item-name');
    yield navigationPromise;
    yield page.waitForSelector('#personal_access_token_name');
    yield page.$eval('#personal_access_token_name', (el) => (el.value = 'jenkins_new'));
    yield page.waitForSelector('#new_personal_access_token #personal_access_token_name');
    yield page.click('#new_personal_access_token #personal_access_token_name');
    yield page.waitForSelector('#new_personal_access_token #personal_access_token_scopes_api');
    yield page.click('#new_personal_access_token #personal_access_token_scopes_api');
    yield page.waitForSelector('#new_personal_access_token #personal_access_token_scopes_read_user');
    yield page.click('#new_personal_access_token #personal_access_token_scopes_read_user');
    yield page.waitForSelector('#new_personal_access_token #personal_access_token_scopes_sudo');
    yield page.click('#new_personal_access_token #personal_access_token_scopes_sudo');
    yield page.waitForSelector('#new_personal_access_token #personal_access_token_scopes_read_repository');
    yield page.click('#new_personal_access_token #personal_access_token_scopes_read_repository');
    yield page.waitForSelector('#new_personal_access_token #personal_access_token_name');
    yield page.click('#new_personal_access_token #personal_access_token_name');
    yield page.waitForSelector('#new_personal_access_token > .prepend-top-default > .btn');
    yield page.click('#new_personal_access_token > .prepend-top-default > .btn');
    yield navigationPromise;
    yield page.waitForSelector('#created-personal-access-token');
    console.log(yield page.$eval('#created-personal-access-token', (el) => el.value));
    yield browser.close();
}))();
