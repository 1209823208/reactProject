import React from 'react';
import './index.css';
import './base.scss';
import NavTop from 'component/nav-top/index.jsx'
import NavSide from 'component/nav-side/index.jsx'

export default class Layout extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div id="wrapper">
        <NavTop/>
        <NavSide/>
        {this.props.children}
      </div> 
    );
  }
}