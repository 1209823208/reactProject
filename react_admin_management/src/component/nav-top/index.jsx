import React from 'react';
import './index.css';
import { Link } from "react-router-dom";
import MUtil from 'util/mm.jsx';
const _mm = new MUtil();
import User from 'service/user-service.jsx';
const _user = new User();
export default class NavTop extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: _mm.getStorage('userInfo').username || ''
        }
    }
  logout(){
    _user.logout().then(res => {
        _mm.removeStorage('userInfo');
        window.location.href = '/login';
    }, errMsg => {
        _mm.errorTips(errMsg);
    });
  };
  render() {
    let w60 = {
      'width': '60%'
    };
    let w20 = {
      'width': '20%'
    };
    let w85 = {
      'width': '85%'
    };
    return (
      <div id="NavTop">
       <nav className="navbar navbar-default top-navbar" role="navigation">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <Link className="navbar-brand" to='/'>
                    <b>In</b>sight
                </Link>
            </div>

            <ul className="nav navbar-top-links navbar-right">
                <li className="dropdown">
                    <a className="dropdown-toggle" href="javascript:void(0)">
                        <i className="fa fa-user fa-fw"></i>
                        {
                                this.state.username
                                ? <span>欢迎，{this.state.username}</span>
                                : <span>欢迎您</span>
                            }
                        <i className="fa fa-caret-down"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-user">
                        <li className="divider"></li>
                        <li>
                            <a href="javascript:void(0)" onClick={this.logout.bind(this)}>
                                <i className="fa fa-sign-out fa-fw"></i> Logout
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
      </div>
    );
  }
}