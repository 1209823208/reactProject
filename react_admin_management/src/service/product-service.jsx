
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
    // 新增商品
    addGoods(params){
        return _mm.request({
            type    : 'post',
            url     : '/manage/product/save.do',
            data    : params
        });
    }
    // 获取商品信息
    getProductDetail(productId){
      return _mm.request({
          type    : 'post',
          url     : '/manage/product/detail.do',
          data    : {
            productId:productId
          }
      });
    }
    // 检测商品信息
    checkProduct(params){
      let checkMsg = {
        status:true,
        message:'正确'
      };
      if(typeof params.name==='undefined' || params.name.length===0){
        return {
          status:false,
          message:'请填写商品名称'
        }
      }
      if(typeof params.subtitle==='undefined' || params.subtitle.length===0){
        return {
          status:false,
          message:'请填写商品描述'
        }
      }
      if(params.categoryId===0){
        return {
          status:false,
          message:'请选择正确的商品分类'
        }
      }
      if(typeof params.price!=='number' || params.price<=0 || isNaN(params.price)){
        return {
          status:false,
          message:'请填写正确的商品价格'
        }
      }
      if(typeof params.stock!=='number' || params.stock<=0 || isNaN(params.stock)){
        return {
          status:false,
          message:'请填写正确的商品库存'
        }
      }
      if(typeof params.subImages==='undefined' || params.subImages.length===0){
        return {
          status:false,
          message:'请上传商品图片'
        }
      }
      if(typeof params.detail==='undefined' || params.detail.length===0){
        return {
          status:false,
          message:'请填写商品描述'
        }
      }

      return checkMsg;
    }
    // 修改品类名称
    updateCategoryName(category){
        return _mm.request({
            type    : 'post',
            url     : '/manage/category/set_category_name.do',
            data    : category
        });
    }
    // 新增品类
    saveCategory(category){
        return _mm.request({
            type    : 'post',
            url     : '/manage/category/add_category.do',
            data    : category
        });
    }
}
export default Product;
