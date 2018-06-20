
import MUtil from 'util/mm.jsx';
const _mm = new MUtil();
class Product{
    getProductList(params){
        let  url = '/manage/product/list.do';
        if(params.listType==='search'){
             url = '/manage/product/search.do';
        }
        return _mm.request({
            type    : 'post',
            url     : url,
            data    : params
        });
    }
    changeProductStatus(params){
        return _mm.request({
            type    : 'post',
            url     : '/manage/product/set_sale_status.do',
            data    : params
        });
    }
}
export default Product;