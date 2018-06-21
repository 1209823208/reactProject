import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';
import TableList from 'util/table-list/index.jsx';
import Product from 'service/product-service.jsx';
import MUtil from 'util/mm.jsx';
const _mm = new MUtil();
const _product = new Product();
import { Link } from "react-router-dom";
import ProductSearchList from 'page/product/index/index-list-search.jsx';
export default class ProductIndex extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pageNum:1,
      list: [],
      listType:'list',
    }
  }
  onChange(page) {
    this.setState({
        pageNum: page,
      }, () => {
        this.loadProductList();
    });
  }
  componentDidMount(){
    this.loadProductList()
  }
  loadProductList(){
    let params_arr = {};
    params_arr.pageNum = this.state.pageNum
    params_arr.listType = this.state.listType
    if(this.state.listType==='search'){
      params_arr.pageNum = this.state.pageNum
      params_arr[this.state.searchType] = this.state.searchKeyWord
    }
    _product.getProductList(params_arr).then(res => {
        this.setState(res);
    }, errMsg => {
        this.setState({
            list : []
        });
        _mm.errorTips(errMsg);
    });
  }
  changeProductStatus(e,productId,status){
    let newStatus = status==1?2:1,
        confimTip = status==1?'确定下架该商品?':'确定上架该商品？';
    if(window.confirm(confimTip)){
        _product.changeProductStatus({
          productId:productId,
          status:newStatus
        }).then(res => {
          _mm.successTips(res);
          this.loadProductList()
      }, errMsg => {
          _mm.errorTips(errMsg);
      });
    }
  }
  onSearch(searchType,searchKeyWord){
    let listType = searchKeyWord ===''?'list':'search';
    this.setState({
      searchType:searchType,
      searchKeyWord:searchKeyWord,
      pageNum:1,
      listType:listType
    },()=>{
      this.loadProductList()
    })
  }
  render() {
    let productList = this.state.list.map((item,index)=>{
      return(
        <tr key={index}>
          <td>{item.id}</td>
          <td>
            <p>{item.name}</p>
            <p>{item.subtitle}</p>
          </td>
          <td>{item.price}</td>
          <td>
              {item.status===1?'已上架':'下架'}
              {
                item.status===1
                ?<p><button type="button" className="btn btn-warning" onClick={(e)=>{this.changeProductStatus(e,item.id,item.status)}}>下架</button></p>
                :<p><button type="button" className="btn btn-warning" onClick={(e)=>{this.changeProductStatus(e,item.id,item.status)}}>上架</button></p>
              }
          </td>
          <td>
              <Link to={`/product/detail/${item.id}`}>详情</Link><br/>
              <Link to={`/product/save/${item.id}`}>编辑</Link>
          </td>
        </tr>
      )
    })
    let tableHeader = [
      {name:'商品ID',width:'10%'},
      {name:'商品信息',width:'50%'},
      {name:'价格',width:'10%'},
      {name:'状态',width:'15%'},
      {name:'操作',width:'15%'},
    ]
    return (
      <div id="page-wrapper">
        <div id="ProductIndex">
            <PageTitle title="商品列表">
              <div className='addproduct'>
                <Link to={'/product/save' }>
                    <i className="fa fa-plus" aria-hidden="true"></i>
                    <span>添加商品</span>
                </Link>
              </div>
            </PageTitle>
            <ProductSearchList onSearch={(searchType,searchKeyWord)=>{this.onSearch(searchType,searchKeyWord)}}/>
            <TableList tableHeader={tableHeader}>{productList}</TableList>
            <Pagination onChange={this.onChange.bind(this)} current={this.state.pageNum} total={this.state.total}/>
        </div>
      </div>
    );
  }
}
