# enzyme
[Enzyme](https://github.com/airbnb/enzyme)是官方测试工具库的封装，它模拟了jQuery的API，非常直观，易于使用和学习。
它提供三种测试方法。

```
- shallow
- render
- mount
```
### 浅渲染 shallow()
浅渲染在将一个组件作为一个单元进行测试的时候非常有用，可以确保你的测试不会去间接断言子组件的行为。shallow 方法只会渲染出组件的第一层 DOM 结构，
其嵌套的子组件不会被渲染出来，从而使得渲染的效率更高，单元测试的速度也会更快。Enzyme的设计是，让不同的底层处理引擎，都具有同样的API

```
import {shallow} from 'enzyme';

describe('Enzyme Shallow', function () {
  it('App\'s title should be Todos', function () {
    let app = shallow(<App/>);
    expect(app.find('h1').text()).toEqual('Todos');
  });
};
```
```
import { shallow } from 'enzyme'
describe('Enzyme Shallow', () => {
  it('App should have three <Todo /> components', () => {
    const app = shallow(<App />)
    expect(app.find('Todo')).to.have.length(3)
  })
}
```
上面代码中，`shallow`方法返回`App`的浅渲染，然后`app.find`方法找出`h1`元素，`text`
方法取出该元素的文本。
关于`find`方法，有一个注意点，就是它只支持
[简单选择器](http://airbnb.io/enzyme/docs/api/ShallowWrapper/find.html)，
稍微复杂的一点的`CSS`选择器
都不支持。
```
component.find('.my-class'); // by class name
component.find('#my-id'); // by id
component.find('td'); // by tag
component.find('div.custom-class'); // by compound selector
component.find(TableRow); // by constructor
component.find('TableRow'); // by display name, 基于 React 的 displayName 来查找组件
component.find({ foo: 3 }); // by Object Property Selector:据属性的子集查找组件和节点
```
displayName
```
class MyComponent extends React.Component {
  render() { ... }
}
MyComponent.displayName = 'MyComponent';
// find instances of MyComponent
const myComponents = wrapper.find('MyComponent');
```
Object Property Selector:

```
const wrapper = mount(
  <div>
    <span foo={3} bar={false} title="baz" />
  </div>
)
wrapper.find({ foo: 3 })
wrapper.find({ bar: false })
wrapper.find({ title: 'baz'})
```


### 深度渲染 mount()
!不支持 react-native
mount 方法则会将 React 组件渲染为真实的 DOM 节点，
特别是在依赖真实的 DOM 结构必须存在的情况下，比如说按钮的点击事件。
完全的 DOM 渲染需要在全局范围内提供完整的 DOM API， 这也就意味着它必须在至少“看起来像”浏览器环境的环境中运行。
```
import {mount} from 'enzyme';

describe('Enzyme Mount', function () {
  it('Delete Todo', function () {
    let app = mount(<App/>);
    let todoLength = app.find('li').length;
    app.find('button.delete').at(0).simulate('click');
    expect(app.find('li').length).toEqual(todoLength - 1);
  });
});
```
上面代码中，`find`方法返回一个对象，包含了所有符合条件的子组件。
在它的基础上，`at`方法返回指定位置的子组件，`simulate`方法就在这个组件上触发某种行为
```
import {mount} from 'enzyme';

describe('Enzyme Mount', function () {
  it('Add a new Todo', function () {
    let app = mount(<App/>);
    let todoLength = app.find('li').length;
    let addInput = app.find('input').get(0);
    addInput.value = 'Todo Four';
    app.find('.add-button').simulate('click');
    expect(app.find('li').length).toEqual(todoLength + 1);
  });
});
```

### 静态渲染 render()
render 方法则会将 React 组件渲染成静态的 HTML 字符串，返回的是一个 Cheerio 实例对象，
采用的是一个第三方的 HTML 解析库 Cheerio，官方的解释是「我们相信 Cheerio 可以非常好地处理 HTML 的解析和遍历，
再重复造轮子只能算是一种损失」。
这个 CheerioWrapper 可以用于分析最终结果的 HTML 代码结构，
它的 API 跟 shallow 和 mount 方法的 API 都保持基本一致。
```
import {render} from 'enzyme';

describe('Enzyme Render', function () {
  it('Todo item should not have todo-done class', function () {
    let app = render(<App/>);
    expect(app.find('.todo-done').length).toEqual(0);
  });
});
```

### API
```
.get(index)：返回指定位置的子组件的DOM节点
.at(index)：返回指定位置的子组件
.first()：返回第一个子组件
.last()：返回最后一个子组件
.type()：返回当前组件的类型
.text()：返回当前组件的文本内容
.html()：返回当前组件的HTML代码形式
.props()：返回根组件的所有属性
.prop(key)：返回根组件的指定属性
.state([key])：返回根组件的状态
.setState(nextState)：设置根组件的状态
.setProps(nextProps)：设置根组件的属性
```

## 参考链接
- [airbnb](http://airbnb.io/enzyme/docs/api/index.html)
- [阮一峰](http://www.ruanyifeng.com/blog/2016/02/react-testing-tutorial.html)