# 页面测试

## UI测试
## 单元测试
单元测试用于测试 React UI 组件的表现，
使用 [jest](https://jestjs.io/docs/zh-Hans/getting-started) 作为测试框架

示例[src/routes/Result/Success.test.js](frontend/src/routes/Result/Success.test.js)
来测试成功页面组件的 UI 表现。

``` js
import React from 'react';
import { shallow } from 'enzyme';
import Success from './Success';   // 引入对应的 React 组件

it('renders with Result', () => {
  const wrapper = shallow(<Success />);                           // 进行渲染
  expect(wrapper.find('Result').length).toBe(1);                  // 有 Result 组件
  expect(wrapper.find('Result').prop('type')).toBe('success');    // Result 组件的类型是成功
});
```
这里使用了 [enzyme](http://airbnb.io/enzyme/docs/api/index.html) 作为测试库，
它提供了大量实用的 API 来帮助我们测试 React 组件。
断言部分沿用了 jest 默认的 [jasmine2 expect 语法](https://jestjs.io/docs/zh-Hans/expect)。
```
Jest是Facebook开发的一个测试框架，它集成了测试执行器、断言库、
spy、mock、snapshot和测试覆盖率报告等功能。React项目本身也是使用Jest进行单测的，因此它们俩的契合度相当高。

Enzyme是由airbnb开发的React单测工具。它扩展了React的TestUtils并通过支持
类似jQuery的find语法可以很方便的对render出来的结果做各种断言。
```



## e2e测试
端到端测试也叫冒烟测试，用于测试真实浏览器环境下前端应用的流程和表现，
相当于代替人工去操作应用。

引入了 [puppeteer](https://github.com/googlechrome/puppeteer) 作为 E2E 测试的工具，
puppeteer 是 Google Chrome 团队官方的无界面（Headless）Chrome 工具。
它默认使用 chrome / chromium 作为浏览器环境运行自己的应用，
并且提供了非常语义化的 API 来描述业务逻辑。