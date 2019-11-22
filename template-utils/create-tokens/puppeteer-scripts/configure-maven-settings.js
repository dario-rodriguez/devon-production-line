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
    yield page.goto(url + '/configfiles/editConfig?id=MavenSettings');
    yield page.setViewport({ width: 1920, height: 969 });
    yield page.waitForSelector('#main-panel > form > table > tbody > tr:nth-child(14) > td.setting-main > div.repeated-container > div.repeated-chunk.first.last.only > table > tbody > tr:nth-child(1) > td.setting-main > input');
    yield page.focus('#main-panel > form > table > tbody > tr:nth-child(14) > td.setting-main > div.repeated-container > div.repeated-chunk.first.last.only > table > tbody > tr:nth-child(1) > td.setting-main > input');
    yield page.keyboard.type('pl-nexus');
    yield page.$eval('#main-panel > form > table > tbody > tr:nth-child(14) > td.setting-main > div.repeated-container > div.repeated-chunk.first.last.only > table > tbody > tr:nth-child(1) > td.setting-main > input', (el) => (el.value = 'pl-nexus'));
    yield page.waitForSelector('#main-panel > form > table > tbody > tr:nth-child(14) > td.setting-main > div.repeated-container > div.repeated-chunk.first.last.only > table > tbody > tr:nth-child(4) > td.setting-main > div > div > select');
    yield page.select('#main-panel > form > table > tbody > tr:nth-child(14) > td.setting-main > div.repeated-container > div.repeated-chunk.first.last.only > table > tbody > tr:nth-child(4) > td.setting-main > div > div > select', 'nexus-api');
    yield page.waitForSelector('#yui-gen12-button');
    yield page.click('#yui-gen12-button');
    page.waitForNavigation();
    yield browser.close();
}))();
