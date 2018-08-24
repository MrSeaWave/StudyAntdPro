import puppeteer from 'puppeteer';

describe('Login', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:8002/#/user/login', { waitUntil: 'networkidle2' });
    await page.evaluate(() => window.localStorage.setItem('antd-pro-authority', 'guest'));
  });

  afterEach(() => page.close());
// https://zhaoqize.github.io/puppeteer-api-zh_CN/#/class-Page?id=pageselector
  it('should login with failure', async () => {
    // 等待某个选择器的元素加载之后，这个元素可以是异步加载的
    await page.waitForSelector('#userName', {
      timeout: 2000,
    });
    await page.type('#userName', 'mockuser');
    await page.type('#password', 'wrong_password');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.ant-alert-error'); // should display error
  });

  it('should login successfully', async () => {
    await page.waitForSelector('#userName', {
      timeout: 2000,
    });
    await page.type('#userName', 'admin');
    await page.type('#password', '888888');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.ant-layout-sider h1'); // should display error

    //执行一些自定义的 js 代码 page.evaluate(pageFunction, …args) 返回一个可序列化的普通对象，
    // pageFunction 表示要在页面执行的函数， args 表示传入给 pageFunction 的参数
    const text = await page.evaluate(() => document.body.innerHTML);
    // console.log('text',text)
    // https://jestjs.io/docs/zh-Hans/expect#tocontainitem
    expect(text).toContain('<h1>Ant Design Pro</h1>');
  });

  afterAll(() => browser.close());
});
