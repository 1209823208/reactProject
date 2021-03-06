import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import 'page/product/index/index.css';
import CategorySelector from 'page/product/index/categoryselector.jsx';
import FileUploader from 'util/file-upload/index.jsx';
import RichEditor from 'util/rich-editor/index.jsx';
import Product from 'service/product-service.jsx';
import MUtil from 'util/mm.jsx';
const _mm = new MUtil();
const _product = new Product();
export default class AddProduct extends React.Component {
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
  //获取分类
  onCategoryChange(category,parentCategoryId){
    this.setState({
      categoryId:category
    })
  }
  // 上传图片成功
  onUploadSuccess(uploadData){
    let newImageList = this.state.imageList;
    newImageList.push(uploadData);
    this.setState({
      imageList:newImageList
    })
  }
  // 上传图片失败
  onUploadError(errMsg){
    _mm.errorTips(errMsg);
  }
  //删除图片
  delImg(e){
    let index = parseInt(e.target.getAttribute('index'));
    let newImageList = this.state.imageList;
    newImageList.splice(index,1);
    this.setState({
      imageList:newImageList
    })
  }
  //商品描述
  updateGoodsEditor(goodsDesc){
    this.setState({
      detail:goodsDesc
    })
  }
  //双向数据绑定
  updateGoodsMes(e){
    let keyName = e.target.name,
        keyWord = e.target.value;
    this.setState({
      [keyName]:keyWord
    })
  }
  //
  getSubImage(){
    return this.state.imageList.map((item)=>{
      return item.uri
    })
  }
  //提交表单
  onSubmit(){
    let subImages = this.getSubImage().toString();
    let product = {
        name        : this.state.name,
        subtitle    : this.state.subtitle,
        categoryId  : parseInt(this.state.categoryId),
        subImages   : subImages,
        detail      : this.state.detail,
        price       : parseFloat(this.state.price),
        stock       : parseInt(this.state.stock),
        status      : this.state.status
    }
    if(typeof this.state.id !== 'undefined'){
      product.id = this.state.id ;
    }
    let che_product = _product.checkProduct(product);
    if(che_product.status){
      _product.addGoods(product).then((res)=>{
        this.props.history.push('/product/index');
      },errMsg=>{
        _mm.errorTips(errMsg);
      })
    }else{
      _mm.errorTips(che_product.message);
    }
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
                        <input type="text" className="form-control" placeholder="请输入商品名称"
                        name="name"
                        value={this.state.name}
                        onChange={(e)=>this.updateGoodsMes(e)} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-2 control-label">商品描述</label>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" placeholder="请输入商品描述"
                        name="subtitle"
                        value={this.state.subtitle}
                        onChange={(e)=>this.updateGoodsMes(e)} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-2 control-label">商品分类</label>
                      <div className="col-sm-4 categort-div">
                        <CategorySelector
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
                            onChange={(e)=>this.updateGoodsMes(e)} />
                            <div className="input-group-addon">元</div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-2 control-label">商品库存</label>
                      <div className="input-group col-sm-4">
                        <input type="number" className="form-control" placeholder="请输入商品库存"
                        name="stock"
                        value={this.state.stock}
                        onChange={(e)=>this.updateGoodsMes(e)} />
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
                                    <a index={index} href="javascript:void(0)" className="delImg" onClick={(e)=>{this.delImg(e)}}>
                                      <i className="fa fa-trash-o fa-lg"></i>
                                    </a>
                                  </div>
                                )
                              }):
                              <div>请上传图片</div>
                            }
                        </div>
                        <FileUploader onUploadSuccess={(data)=>this.onUploadSuccess(data)} onUploadError={(errMsg)=>{this.onUploadError(errMsg)}}/>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-2 control-label">商品详情</label>
                      <div className="col-sm-8">
                            <RichEditor
                            defaultDetail = {this.state.detail}
                            goodsDesc={this.state.detail}
                            updateGoodsEditor={(goodsDesc)=>this.updateGoodsEditor(goodsDesc)}/>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-sm-offset-2 col-sm-4">
                        <button type="submit" className="btn btn-primary" onClick={()=>this.onSubmit()}>提交</button>
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
