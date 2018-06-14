import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import 'antd/dist/antd.css';
import { Input } from 'antd';
import MediaQuery from 'react-responsive';
import PcIndex from './components/pc_index';
import PcDetails from './components/pc_detail';
import MobileDetails from './components/mobile_detail';
import MobileIndex from './components/mobile_index';
import PcUserCenter from './components/pc_usercenter';
import MobileUserCenter from './components/mobile_usercenter';
class Root extends React.Component {
  render() {
    return (
      <div>
        <MediaQuery query='(min-device-width: 1224px)'>
          <Router history={hashHistory}>
            <Route path="/" component={PcIndex}></Route>
            <Route path="/details/:uniquekey" component={PcDetails}></Route>
            <Route path="/usercenter" component={PcUserCenter}></Route>
          </Router>
        </MediaQuery>
        <MediaQuery query='(max-device-width: 1224px)'>
          <Router history={hashHistory}>
            <Route path="/" component={MobileIndex}></Route>
            <Route path="/details/:uniquekey" component={MobileDetails}></Route>
            <Route path="/usercenter" component={MobileUserCenter}></Route>
          </Router>
        </MediaQuery>
      </div>
    );
  }
}

ReactDOM.render(
  <Root/>,
  document.getElementById('root')
);
