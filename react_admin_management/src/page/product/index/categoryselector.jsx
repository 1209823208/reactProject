import React from 'react';
import Product from 'service/product-service.jsx';
import MUtil from 'util/mm.jsx';
const _mm = new MUtil();
const _product = new Product();
export default class CategorySelector extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstCategoryId:0,
      firstCategoryList:[],
      secondCategoryId:'',
      secondCategoryList:[],
    }
  }
  componentDidMount(){
    this.getParentCategory()
  }
  // 获取一级分类
  getParentCategory(){
    let categoryId = this.state.firstCategoryId;
    _product.getCategoryList(categoryId).then(res=>{
      if(categoryId===0){
        this.setState({
          firstCategoryList:res,
          firstCategoryId:res[0].id
        },()=>{
            this.getParentCategory()
        })
      }else{
        if(res.length>0){
          this.setState({
            secondCategoryList:res,
            secondCategoryId:res[0].id
          },()=>{
            this.onPropsCategoryChange()
          })
        }else{
          this.setState({
            secondCategoryList:[],
            secondCategoryId:0
          },()=>{
            this.onPropsCategoryChange()
          })
        }
      }
    },errMsg=>{
      _mm.errorTips(errMsg);
    })
  }
  // 获取二级分类
  getSecondCategory(e,flag){
    if(flag === 'first'){
      this.setState({
        firstCategoryId:e.target.value
      },()=>{
        this.getParentCategory()
      })
    }else{
      this.setState({
        secondCategoryId:e.target.value
      },()=>{
        this.onPropsCategoryChange()
      })
    }
  }
  // 传给父组件选中的结果
  onPropsCategoryChange(){
    // 判断props里的回调函数存在
    let categoryChangable = typeof this.props.onCategoryChange === 'function';
    // 如果是有二级品类
    if(this.state.secondCategoryId){
        categoryChangable && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId);
    }
    // 如果只有一级品类
    else{
        categoryChangable && this.props.onCategoryChange(this.state.firstCategoryId, 0);
    }
  }
  render() {
    let firstCategoryHtml = this.state.firstCategoryList.map((item,index)=>{
      return(
        <option key={index} value={item.id}>{item.name}</option>
      )
    })
    let secondCategoryHtml = this.state.secondCategoryList.map((item,index)=>{
      return(
        <option key={index} value={item.id}>{item.name}</option>
      )
    })
    return (
      <div className="col-sm-12">
        <select className="form-control cate-select"
        value={this.state.firstCategoryId}
        onChange={(e)=>{this.getSecondCategory(e,'first')}}>
          {firstCategoryHtml}
        </select>
        {
          this.state.secondCategoryList.length>0
          ?<select className="form-control cate-select"
          value={this.state.secondCategoryId}
          onChange={(e)=>{this.getSecondCategory(e,'second')}}>
          { secondCategoryHtml}
          </select>
          :''
        }
      </div>
    );
  }
}
