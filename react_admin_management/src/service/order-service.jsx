
import MUtil from 'util/mm.jsx';
const _mm = new MUtil();
class Order{
    // 获取订单列表
    getOrderList(params){
        let  url = '/manage/order/list.do';
        if(params.listType==='search'){
             url = '/manage/order/search.do';
        }
        return _mm.request({
            type    : 'post',
            url     : url,
            data    : params
        });
    }
    // 获取订单详情
    getOrderDetail(orderNo){
      let  url = '/manage/order/detail.do';
      return _mm.request({
          type    : 'post',
          url     : url,
          data    : {
            orderNo:orderNo
          }
      });
    }
}
export default Order;
