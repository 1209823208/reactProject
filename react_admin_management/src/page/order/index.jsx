import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';
import TableList from 'util/table-list/index.jsx';
import Order from 'service/order-service.jsx';
import MUtil from 'util/mm.jsx';
const _mm = new MUtil();
const _order = new Order();
import { Link } from "react-router-dom";
import OrderSearchList from 'page/order/list-search.jsx';

export default class OrderIndex extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pageNum:1,
      list: [],
      listType:'list',
      orderNo:'',
    }
  }
  onChange(page) {
    this.setState({
        pageNum: page,
      }, () => {
        this.loadOrderList();
    });
  }
  componentDidMount(){
    this.loadOrderList()
  }
  loadOrderList(){
    let params_arr = {};
    params_arr.pageNum = this.state.pageNum
    params_arr.listType = this.state.listType
    if(this.state.listType==='search'){
      params_arr.orderNo = this.state.orderNo
    }
    _order.getOrderList(params_arr).then(res => {
        this.setState(res);
    }, errMsg => {
        this.setState({
            list : []
        });
        _mm.errorTips(errMsg);
    });
  }
  onSearch(orderNo){
    let listType = orderNo ===''?'list':'search';
    console.log('orderNo',orderNo);
    this.setState({
      pageNum:1,
      listType:listType,
      orderNo:orderNo
    },()=>{
      this.loadOrderList()
    })
  }
  render() {
    let orderList = this.state.list.map((item,index)=>{
      return(
        <tr key={index}>
          <td>{item.orderNo}</td>
          <td>{item.orderNo}</td>
          <td>{item.statusDesc}</td>
          <td>{item.payment}</td>
          <td>{item.createTime}</td>
          <td>
              <Link to={`/order/detail/${item.orderNo}`}>详情</Link><br/>
          </td>
        </tr>
      )
    })
    let tableHeader = [
      {name:'订单号',width:'10%'},
      {name:'收件人',width:'10%'},
      {name:'订单状态',width:'10%'},
      {name:'订单总价',width:'15%'},
      {name:'创建时间',width:'15%'},
      {name:'操作',width:'15%'},
    ]
    return (
      <div id="page-wrapper">
        <div id="OrderIndex">
            <PageTitle title="订单列表"></PageTitle>
            <OrderSearchList onSearch={(orderNo)=>{this.onSearch(orderNo)}}/>
            <TableList tableHeader={tableHeader}>{orderList}</TableList>
            <Pagination onChange={this.onChange.bind(this)} current={this.state.pageNum} total={this.state.total}/>
        </div>
      </div>
    );
  }
}
