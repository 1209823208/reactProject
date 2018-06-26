import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';
import Order from 'service/order-service.jsx';
import MUtil from 'util/mm.jsx';
import 'page/order/index.css';
const _mm = new MUtil();
const _order = new Order();
export default class OrderDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      orderNo:this.props.match.params.orderNo||'',
      orderItemVoList:[],
      orderDetail:{},
      shippingVo:{},
    }
  }
  componentDidMount(){
    this.loadOrderDetail();
  }
  // 编辑时获取初始数据
  loadOrderDetail(){
    _order.getOrderDetail(this.state.orderNo).then((res)=>{
      this.setState({
        orderDetail:res,
        orderItemVoList:res.orderItemVoList,
        shippingVo:res.shippingVo
      });
    },(errMsg)=>{
      _mm.errorTips(errMsg);
    })
  }
  render() {
    let shopList = this.state.orderItemVoList.map((item,index)=>{
      return(
        <tr key={index}>
          <td>
            <img className="goodsImg" src={this.state.orderDetail.imageHost+item.productImage}/>
          </td>
          <td>{item.productName}</td>
          <td>{item.currentUnitPrice}</td>
          <td>{item.quantity}</td>
          <td>{item.totalPrice}</td>
        </tr>
      )
    })
    let tableHeader = [
      {name:'商品图片',width:'10%'},
      {name:'商品信息',width:'10%'},
      {name:'单价',width:'10%'},
      {name:'数量',width:'15%'},
      {name:'合计',width:'15%'},
    ]
    return (
        <div id="page-wrapper">
          <div id="AddProduct">
              <PageTitle title="订单详情"/>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-horizontal">
                    <div className="form-group">
                      <label className="col-sm-2 control-label">收件人</label>
                      <div className="col-sm-4">
                        <p className="form-control-static">{this.state.shippingVo.receiverName}</p>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-2 control-label">订单状态</label>
                      <div className="col-sm-4">
                        <p className="form-control-static">{this.state.orderDetail.statusDesc}</p>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-2 control-label">支付方式</label>
                      <div className="col-sm-4">
                        <p className="form-control-static">{this.state.orderDetail.paymentTypeDesc}</p>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-2 control-label">订单金额</label>
                      <div className="col-sm-4">
                        <p className="form-control-static">¥{this.state.orderDetail.payment}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 control-label">商品列表</label>
                <TableList tableHeader={tableHeader}>{shopList}</TableList>
              </div>
          </div>
      </div>
    );
  }
}
