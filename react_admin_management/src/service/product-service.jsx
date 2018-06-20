
import MUtil from 'util/mm.jsx';
const _mm = new MUtil();
class Product{
    // 获取商品列表
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
    // 改变商品状态->上架or下架
    changeProductStatus(params){
        return _mm.request({
            type    : 'post',
            url     : '/manage/product/set_sale_status.do',
            data    : params
        });
    }
    // 获取商品分类
    getCategoryList(categoryId){
      return _mm.request({
          type    : 'post',
          url     : '/manage/category/get_category.do',
          data    : {
            categoryId:categoryId
          }
      });
    }
}
export default Product;
