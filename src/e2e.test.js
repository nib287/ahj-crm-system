import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('CRM', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      headless: false, // show gui
      slowMo: 250,
      devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('crud', async () => {
    await page.goto(baseUrl);
    const openPopup = await page.$('.add-product');
    openPopup.click();
    await page.waitForSelector('.popup');
    const inputName = await page.$('.form__input-name');
    const inputPrice = await page.$('.form__input-price');
    await inputName.type('samsung');
    await inputPrice.type('30000');
    const save = await page.$('.form__save');
    save.click();
    await page.waitForSelector('.page__row-tbody');
  });
});