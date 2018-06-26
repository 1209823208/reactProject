import React from 'react';
import { Route,Redirect,Switch } from "react-router-dom";
import ProductIndex from 'page/product/index/index.jsx';
import AddProduct from 'page/product/index/add-product.jsx';
import ProductDetail from 'page/product/index/detail.jsx';
import CategoryList from 'page/product/category/list.jsx';
import CategoryAdd from 'page/product/category/add.jsx';

export default class ProductRouter extends React.Component {
  render() {
    return (
        <Switch>
             <Route path= '/product/index' component={ProductIndex} />
             <Route path= '/product/save/:pid?' component={AddProduct} />
             <Route path= '/product/detail/:pid' component={ProductDetail} />
             <Route path= '/product-category/index/:categoryId?' component={CategoryList} />
             <Route path= '/product-category/add/:categoryId?' component={CategoryAdd} />
             <Redirect exact from="/product" to="/product/index"/>
             <Redirect exact from="/product-category" to="/product-category/index"/>
        </Switch>
    );
  }
}
