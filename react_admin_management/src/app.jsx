import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route,Redirect,Switch } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from 'page/home/index.jsx'
import Login from 'page/login/index.jsx'
import UserList from 'page/user-list/index.jsx'
import ErrorPage from 'page/error/index.jsx'
import ProductRouter from 'page/product/router.jsx'
import Layout from 'component/layout/index.jsx'
class App extends React.Component {
  render() {
    let route_list = (
      <Layout>
          <Switch>
              <Route exact path= '/' component={Home} />
              <Route path= '/product' component={ProductRouter} />
              <Route path= '/product-category' component={ProductRouter} />
              <Route path="/user/index" component={UserList}/>
              <Redirect exact from="/user" to="/user/index"/>
              {/* 路由从上向下匹配，匹配成功 break,匹配不到就执行最后一行ErrorPage页面 */}
              <Route component={ErrorPage} />
          </Switch>
      </Layout>
    )
    return (
        <Router>
            <Switch>
                <Route path='/login' component={Login} />
                {/* 除了Login这种特殊的路由，其他的.. */}
                <Route path='/' render={(props) => (route_list)}/>
            </Switch>
        </Router>
    );
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('app')
);
