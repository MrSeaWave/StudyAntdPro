import React from 'react';
import { shallow, mount, render } from 'enzyme';
import ReactTest from './reactTest/ReactTest';

describe('<ReactTest />', () => {
  it('SHALLOW with Result ReactTest', () => {
    const app = shallow(<ReactTest value={12345} />);
    expect(app.find('h1').text()).toEqual('12345');
  });
  it('MOUNT with Result ReactTest', () => {
    const app = mount(<ReactTest value={12345} />);
    expect(app.find('ResultTest').props().num).toEqual(0);
    app
      .find('button')
      .at(0)
      .simulate('click');
    expect(app.find('ResultTest').props().num).toEqual(1);
  });

  it('render with Result ReactTest', () => {
    const app = render(<ReactTest />);
    console.log('app.find(\'div\')',app.find('div'))
    expect(app.find('div').length).toEqual(3);
    // mount与render 返回的div长度不一样
    const wrapper = mount(<ReactTest />);
    console.log('wrapper.find(\'div\')',wrapper.find('div'))
    expect(wrapper.find('div').length).toEqual(4);
  });
});
