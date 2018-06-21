import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import 'page/product/index/index.css';
import CategorySelector from 'page/product/index/categoryselector.jsx';
import Product from 'service/product-service.jsx';
import MUtil from 'util/mm.jsx';
const _mm = new MUtil();
const _product = new Product();
export default class ProductDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id:this.props.match.params.pid,
      categoryId:0,
      parentCategoryId:0,
      name:'',
      subtitle:'',
      subImages:'',
      detail:'',
      price:'',
      stock:'',
      imageList:[],
      status:1
    }
  }
  componentDidMount(){
    if(typeof this.state.id !== 'undefined'){
      this.loadProduct();
    }
  }
  // 编辑时获取初始数据
  loadProduct(){
    _product.getProductDetail(this.state.id).then((res)=>{
      let subImages = res.subImages.split(',');
      res.imageList = subImages.map((imgUri)=>{
        return {
          uri: imgUri,
          url: res.imageHost + imgUri
        }
      })
      this.setState(res);
    },(errMsg)=>{
      _mm.errorTips(errMsg);
    })
  }
  render() {
    return (
        <div id="page-wrapper">
          <div id="AddProduct">
              <PageTitle title="添加商品"/>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-horizontal">
                    <div className="form-group">
                      <label className="col-sm-2 control-label">商品名称</label>
                      <div className="col-sm-4">
                        <p className="form-control-static">{this.state.name}</p>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-2 control-label">商品描述</label>
                      <div className="col-sm-4">
                        <p className="form-control-static">{this.state.subtitle}</p>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-2 control-label">商品分类</label>
                      <div className="col-sm-4 categort-div">
                        <CategorySelector
                          readOnly
                          categoryId = {this.state.categoryId}
                          parentCategoryId = {this.state.parentCategoryId}
                          onCategoryChange={(category,parentCategoryId)=>{this.onCategoryChange(category,parentCategoryId)}}/>
                      </div>
                    </div>
                    <div className="form-group">
                          <label className="col-sm-2 control-label">商品价格</label>
                          <div className="input-group col-sm-4">
                            <input type="number" className="form-control" placeholder="请输入商品价格"
                            name="price"
                            value={this.state.price}
                            readOnly/>
                            <div className="input-group-addon">元</div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-2 control-label">商品库存</label>
                      <div className="input-group col-sm-4">
                        <input type="number" className="form-control" placeholder="请输入商品库存"
                        name="stock"
                        value={this.state.stock}
                        readOnly />
                        <div className="input-group-addon">件</div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-2 control-label">图片上传</label>
                      <div className="col-sm-4">
                        <div className="clearfix add-product-img-list">
                            {
                              this.state.imageList.length>0?
                              this.state.imageList.map((item,index)=>{
                                return(
                                  <div className="imgIcon" key={index}>
                                    <img src={item.url} />
                                  </div>
                                )
                              }):
                              <div>暂无图片</div>
                            }
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-2 control-label">商品详情</label>
                      <div className="col-sm-8">
                          <div dangerouslySetInnerHTML={{__html:this.state.detail}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
      </div>
    );
  }
}
