import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';
import Product from 'service/product-service.jsx';
import MUtil from 'util/mm.jsx';
const _mm = new MUtil();
const _product = new Product();
import { Link } from "react-router-dom";
import ProductSearchList from 'page/product/index/index-list-search.jsx';
export default class CategoryList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pageNum:1,
      list: [],
      parentCategoryId    : this.props.match.params.categoryId || 0
    }
  }
  componentDidMount(){
    this.loadCategoryList()
  }
  componentDidUpdate(prevProps, prevState){
      let oldPath = prevProps.location.pathname,
          newPath = this.props.location.pathname,
          newId   = this.props.match.params.categoryId || 0;
      if(oldPath !== newPath){
          this.setState({
              parentCategoryId : newId
          }, () => {
              this.loadCategoryList();
          });
      }
  }
  // 加载品类列表
  loadCategoryList(){
      _product.getCategoryList(this.state.parentCategoryId).then(res => {
          this.setState({
              list : res
          });
      }, errMsg => {
          this.setState({
              list : []
          });
          _mm.errorTips(errMsg);
      });
  }
  // 修改品类名称　
  changeCategoryName(e,categoryId,categoryName){
    let newName = window.prompt('请输入新的品类名称', categoryName);
    if(newName){
        _product.updateCategoryName({
            categoryId: categoryId,
            categoryName : newName
        }).then(res => {
            _mm.successTips(res);
            this.loadCategoryList();
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }
  }
  render() {
    let categoryList = this.state.list.map((item,index)=>{
      return(
        <tr key={index}>
          <td>{item.id}</td>
          <td>
            <p>{item.name}</p>
          </td>
          <td>
            <button type="button" className="btn btn-warning" onClick={(e)=>{this.changeCategoryName(e,item.id,item.name)}}>修改名称</button>
            {
              item.parentId === 0
              ? <Link to={`/product-category/index/${item.id}`}>查看子品类</Link>
              : null
            }
          </td>
        </tr>
      )
    })
    let tableHeader = [
      {name:'品类ID',width:'15%'},
      {name:'品类名称',width:'15%'},
      {name:'操作',width:'15%'},
    ]
    return (
      <div id="page-wrapper">
        <div id="ProductIndex">
            <PageTitle title="品类列表">
              <div className='addproduct'>
                <Link to={'/product-category/add' }>
                    <i className="fa fa-plus" aria-hidden="true"></i>
                    <span>添加品类</span>
                </Link>
              </div>
              <div className="row">
                  <div className="col-md-12">
                      <p>父品类ID: {this.state.parentCategoryId}</p>
                  </div>
              </div>
            </PageTitle>
            <TableList tableHeader={tableHeader}>{categoryList}</TableList>
        </div>
      </div>
    );
  }
}
