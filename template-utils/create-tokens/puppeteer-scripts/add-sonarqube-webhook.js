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
(() => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch();
    const page = yield browser.newPage();
    page.authenticate({ username: user, password: pass });
    yield page.goto(url + '/projects');
    yield page.setViewport({ width: 1920, height: 969 });
    yield page.waitForSelector('.navbar-inner > .navbar-limited > .global-navbar-menu > li:nth-child(6) > a');
    yield page.click('.navbar-inner > .navbar-limited > .global-navbar-menu > li:nth-child(6) > a');
    yield page.waitForSelector('.side-tabs-layout > .side-tabs-side > .side-tabs-menu > li:nth-child(13) > a');
    yield page.click('.side-tabs-layout > .side-tabs-side > .side-tabs-menu > li:nth-child(13) > a');
    yield page.waitForSelector('#settings-page > div > div.side-tabs-main > ul > li > ul > li > div > div.settings-definition-right > div:nth-child(2) > table > tbody > tr:last-child > td:nth-child(1) > input');
    yield page.focus('#settings-page > div > div.side-tabs-main > ul > li > ul > li > div > div.settings-definition-right > div:nth-child(2) > table > tbody > tr:last-child > td:nth-child(1) > input');
    yield page.keyboard.type('jenkins');
    yield page.waitForSelector('#settings-page > div > div.side-tabs-main > ul > li > ul > li > div > div.settings-definition-right > div:nth-child(2) > table > tbody > tr:nth-last-child(2) > td:nth-child(2) > input');
    yield page.focus('#settings-page > div > div.side-tabs-main > ul > li > ul > li > div > div.settings-definition-right > div:nth-child(2) > table > tbody > tr:nth-last-child(2) > td:nth-child(2) > input');
    yield page.keyboard.type('http://jenkins-core:8080/jenkins/sonarqube-webhook/');
    yield page.waitForSelector('li > .settings-definition > .settings-definition-right > .settings-definition-changes > .js-save-changes');
    yield page.click('li > .settings-definition > .settings-definition-right > .settings-definition-changes > .js-save-changes');
    yield browser.close();
}))();
