import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route,Redirect,Switch } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from 'page/home/index.jsx'
import Layout from 'component/layout/index.jsx'
class App extends React.Component {
  render() {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route exact path= '/' component={Home} />
                    <Route path= '/product/goods' component={Home} />
                    <Route path= '/product-category' component={Home} />
                    <Route path= '/user' component={Home} />
                </Switch>
            </Layout>
        </Router>
    );
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('app')
);