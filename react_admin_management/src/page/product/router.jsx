import React from 'react';
import { Route,Redirect,Switch } from "react-router-dom";
import ProductIndex from 'page/product/index/index.jsx';
import AddProduct from 'page/product/index/add-product.jsx';
export default class ProductRouter extends React.Component {
  render() {
    return (
        <Switch>
             <Route path= '/product/index' component={ProductIndex} />
             <Route path= '/product/save' component={AddProduct} />
             <Redirect exact from="/product" to="/product/index"/>
        </Switch>
    );
  }
}
