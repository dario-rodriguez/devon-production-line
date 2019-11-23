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
    console.log('chiclis');
    const browser = yield puppeteer_1.default.launch({
        args: ['--no-sandbox', '--disable-gpu'],
    });
    const page = yield browser.newPage();
    // page.authenticate({ username: user, password: pass });
    console.log('chiclis');
    yield page.goto(url + '/sessions/new');
    yield page.setViewport({ width: 1920, height: 969 });
    console.log('chiclis');
    // const navigationPromise = page.waitForNavigation();
    yield page.waitForSelector('#login');
    yield page.focus('#login');
    yield page.keyboard.type(user);
    yield page.waitForSelector('#password');
    yield page.focus('#password');
    yield page.keyboard.type(pass);
    // await page.keyboard.press('Enter');
    // await page.waitForNavigation();
    yield page.waitForSelector('form.login-form');
    yield page.$eval('form.login-form', (el) => el.submit());
    yield delay(10000);
    console.log(page.url());
    console.log(yield page.content());
    yield page.waitForSelector('.sidebar-page > #content #container');
    yield page.click('.sidebar-page > #content #container');
    yield page.waitForSelector('.navbar-limited > .global-navbar-menu > .dropdown > .dropdown-toggle > .rounded');
    yield page.click('.navbar-limited > .global-navbar-menu > .dropdown > .dropdown-toggle > .rounded');
    yield page.waitForSelector('.dropdown > .popup > .menu > li:nth-child(3) > a');
    yield page.click('.dropdown > .popup > .menu > li:nth-child(3) > a');
    yield page.waitForSelector('.account-container > .account-nav > .navbar-tabs > li:nth-child(2) > a');
    yield page.click('.account-container > .account-nav > .navbar-tabs > li:nth-child(2) > a');
    yield page.waitForSelector('#generate-token-form > input');
    yield page.focus('#generate-token-form > input');
    yield page.keyboard.type('jenkins');
    yield page.waitForSelector('.account-body > .boxed-group > .boxed-group-inner > #generate-token-form > .button');
    yield page.click('.account-body > .boxed-group > .boxed-group-inner > #generate-token-form > .button');
    yield page.waitForSelector('#account-page > div > div > div > div.panel.panel-white.big-spacer-top > code');
    console.log(yield page.$eval('#account-page > div > div > div > div.panel.panel-white.big-spacer-top > code', el => el.textContent));
    yield browser.close();
}))();
