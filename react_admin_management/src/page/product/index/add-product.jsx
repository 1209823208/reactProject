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
      categoryId:0,
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
  //提交表单
  onSubmit(){
    console.log('this.state',this.state);
    let subImages = '';
    this.state.imageList.forEach((item)=>{
      subImages+=item.url+','
    })
    subImages = subImages.substring(0,subImages.length-1);
    this.setState({
      subImages:subImages
    })
    _product.addGoods(this.state).then((res)=>{
      console.log('res',res);
    },errMsg=>{
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
                        <CategorySelector onCategoryChange={(category,parentCategoryId)=>{this.onCategoryChange(category,parentCategoryId)}}/>
                      </div>
                    </div>
                    <div className="form-group">
                          <label className="col-sm-2 control-label">商品价格</label>
                          <div className="input-group col-sm-4">
                            <input type="text" className="form-control" placeholder="请输入商品价格"
                            name="price"
                            value={this.state.price} 
                            onChange={(e)=>this.updateGoodsMes(e)} />
                            <div className="input-group-addon">元</div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-2 control-label">商品库存</label>
                      <div className="input-group col-sm-4">
                        <input type="text" className="form-control" placeholder="请输入商品库存"
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
                            <RichEditor detail={this.state.detail} updateGoodsEditor={(goodsDesc)=>this.updateGoodsEditor(goodsDesc)}/>
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
