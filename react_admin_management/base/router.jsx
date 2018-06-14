import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './index.scss';
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";

class A extends React.Component{
  render(){
    return (
      <div>
        Component A
          <Switch>
          {/* exact完全匹配 */}
                <Route exact path={`${this.props.match.path}`} render={(route) => {
                    return <div>当前组件是不带参数的A</div>
                }}/>
                <Route path={`${this.props.match.path}/sub`} render={(route) => {
                    return <div>当前组件是Sub</div>
                }}/>
                <Route path={`${this.props.match.path}/:id`} render={(route) => {
                    return <div>当前组件是带参数的A, 参数是：{route.match.params.id}</div>
                }}/>
            </Switch>
      </div>
    )
  };
}
class B extends React.Component{
  render(){
    return (
      <div>Component B</div>
    )
  };
}
class App  extends React.Component{
  constructor(){
      super()
  }
  render(){
    return (
      <div>
        <h1>router test</h1>
        <div>
          <Link to="/a">A</Link>
          <br/>
          <Link to="/a/333">带参数的A</Link>
          <br/>
          <Link to="/a/sub">组件：／a/sub</Link>
          <br/>
          <Link to="/b">B</Link>
        </div>
        <div>
          {this.props.children}
        </div>
    </div>
    )
  };
}
ReactDOM.render(
    <Router>
        <App>
            <Route path = "/a" component={A}/>
            <Route path = "/b" component={B}/>
        </App>
    </Router>,
  document.getElementById('app')
);
