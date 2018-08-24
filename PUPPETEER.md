# [puppeteer](https://github.com/googlechrome/puppeteer)
用于测试真实浏览器环境下前端应用的流程和表现，
相当于代替人工去操作应用,

可以通过Puppeteer的提供的api直接控制Chrome模拟大部分用户操作来
进行UI Test或者作为爬虫访问页面来收集数据

> 注意：在下面的图表中，浅色框体内容目前不在 Puppeteer 中体现。

![puppeteer](assets/PUPPETEER.png)

- [`Puppeteer`](#class-puppeteer) 使用 [DevTools协议](https://chromedevtools.github.io/devtools-protocol/) 与浏览器进行通信。
- [`Browser`](#class-browser) 实例可以拥有浏览器上下文。
- [`BrowserContext`](#class-browsercontext) 实例定义了一个浏览会话并可拥有多个页面。
- [`Page`](#class-page) 至少有一个框架：主框架。 可能还有其他框架由 [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) 或 [框架标签](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/frame) 创建。
- [`frame`](#class-frame) 至少有一个执行上下文 - 默认的执行上下文 - 框架的JavaScript被执行。 一个框架可能有额外的与 [扩展](https://developer.chrome.com/extensions) 关联的执行上下文。
- [`Worker`](#class-worker) 具有单一执行上下文，并且便于与 [WebWorkers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) 进行交互。

入门的 DEMO
```
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();
```

上面这段代码就实现了网页截图
- 先通过 puppeteer.launch() 创建一个浏览器实例 Browser 对象
- 然后通过 Browser 对象创建页面 Page 对象
- 然后 page.goto() 跳转到指定的页面
- 调用 page.screenshot() 对页面进行截图
- 关闭浏览器

## 参考链接
- [官网](https://github.com/googlechrome/puppeteer)
- [中文汉化](https://github.com/zhaoqize/puppeteer-api-zh_CN)