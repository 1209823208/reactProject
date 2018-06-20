import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import 'page/product/index/index.css';
import CategorySelector from 'page/product/index/categoryselector.jsx';
import FileUploader from 'util/file-upload/index.jsx';
import MUtil from 'util/mm.jsx';
const _mm = new MUtil();
export default class AddProduct extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name:'',
      subtitle:'',
      price:'',
      stock:'',
    }
  }
  //获取分类
  onCategoryChange(category,parentCategoryId){
    console.log('category',category);
    console.log('parentCategoryId',parentCategoryId);
  }
  // 上传图片成功
  onUploadSuccess(uploadData){
    console.log('uploadData',uploadData)
  }
  // 上传图片失败
  onUploadError(errMsg){
    console.log('errMsg',errMsg);
    _mm.errorTips(errMsg);
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
                        value={this.state.name} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-2 control-label">商品描述</label>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" placeholder="请输入商品描述"
                        name="subtitle"
                        value={this.state.subtitle} />
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
                            value={this.state.price} />
                            <div className="input-group-addon">元</div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-2 control-label">商品库存</label>
                      <div className="input-group col-sm-4">
                        <input type="text" className="form-control" placeholder="请输入商品库存"
                        name="stock"
                        value={this.state.stock} />
                        <div className="input-group-addon">件</div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-2 control-label">图片上传</label>
                      <div className="col-sm-4">
                        <FileUploader onUploadSuccess={(data)=>this.onUploadSuccess(data)} onUploadError={(errMsg)=>{this.onUploadError(errMsg)}}/>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-sm-offset-2 col-sm-4">
                        <button type="submit" className="btn btn-primary">提交</button>
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
