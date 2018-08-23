import React, { Component } from 'react';
import ResultTest from './ResultTest';

class ReactTest extends Component {
  onClick=()=>{
    const {type}=this.props
    this.setState(preState=>({num:preState.num+1}))
  }
  constructor(props){
    super(props)
    this.state={
      num:0
    }
  }
  render() {
    const {value,}=this.props
    const {num}=this.state
    return (
      <div>
        <h1>{value}</h1>
        <button onClick={this.onClick}/>
        <ResultTest num={num}/>
        <div>测试长度</div>
        <div>测试长度11</div>
      </div>
    );
  }
}
export default ReactTest;
