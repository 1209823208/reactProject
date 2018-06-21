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
      secondCategoryId:0,
      secondCategoryList:[],
    }
  }
  componentDidMount(){
    this.getFirstCategory();
  }
  componentWillReceiveProps(nextProps){
      let categoryIdChange        = this.props.categoryId !== nextProps.categoryId,
          parentCategoryIdChange  = this.props.parentCategoryId !== nextProps.parentCategoryId;
      // 数据没有发生变化的时候，直接不做处理
      if(!categoryIdChange && !parentCategoryIdChange){
          return;
      }
      // 假如只有一级品类
      if(nextProps.parentCategoryId === 0){
          this.setState({
              firstCategoryId     : nextProps.categoryId,
              secondCategoryId    : 0
          });
      }
      // 有两级品类
      else{
          this.setState({
              firstCategoryId     : nextProps.parentCategoryId,
              secondCategoryId    : nextProps.categoryId
          }, () => {
              parentCategoryIdChange && this.getSecondCategory();
          });
      }

  }
  // 获取一级分类
  getFirstCategory(){
    _product.getCategoryList().then(res=>{
      this.setState({
        firstCategoryList:res
      })
    },errMsg=>{
      _mm.errorTips(errMsg);
    })
  }
  getSecondCategory(){
    let categoryId = this.state.firstCategoryId;
    _product.getCategoryList(categoryId).then(res=>{
      this.setState({
        secondCategoryList:res
      })
    },errMsg=>{
      _mm.errorTips(errMsg);
    })
  }
  // 改变一级分类的值
  updateFirstCategory(e){
    if(this.props.readOnly){
      return;
    }
    let newValue = e.target.value || 0;
    this.setState({
        firstCategoryId     : newValue,
        secondCategoryId    : 0,
        secondCategoryList  : []
    }, () => {
        // 更新二级品类
        this.getSecondCategory();
        this.onPropsCategoryChange();
    });
  }
  // 获取二级分类
  updateSecondCategory(e){
      if(this.props.readOnly){
        return;
      }
      this.setState({
        secondCategoryId:e.target.value
      },()=>{
        this.onPropsCategoryChange()
      })
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
        readOnly = {this.props.readOnly}
        value={this.state.firstCategoryId}
        onChange={(e)=>{this.updateFirstCategory(e)}}>
          {firstCategoryHtml}
        </select>
        {
          this.state.secondCategoryList.length>0
          ?<select className="form-control cate-select"
          readOnly = {this.props.readOnly}
          value={this.state.secondCategoryId}
          onChange={(e)=>{this.updateSecondCategory(e)}}>
          { secondCategoryHtml}
          </select>
          :''
        }
      </div>
    );
  }
}
