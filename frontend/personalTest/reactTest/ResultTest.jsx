import React, { Component } from 'react';

class ResultTest extends Component {

  constructor(props){
    super(props)
  }
  render() {
    const {num}=this.props
    return (
      <div>
        {num}
      </div>
    );
  }
}
export default ResultTest;
