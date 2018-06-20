import React from 'react';
export default class ProductSearchList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchKeyWord:'',
      searchKey:'productId',
    }
  }
  handleChange(e) {
    let name = e.target.name,
        value = e.target.value;
    this.setState({
      [name]:value
    })
  }
  handleKeyUp(e){
    if(e.keyCode === 13){
      this.onSearch()
    }
  }
  onSearch(){
    this.props.onSearch(this.state.searchKey,this.state.searchKeyWord)
  }
  render() {
    return (
          <div className="row">
            <div className="col-md-12">
              <div className="form-inline">
                <div className="form-group">
                  <select
                  className="form-control" 
                  name='searchKey' 
                  onChange={(e)=>{this.handleChange(e)}}>
                    <option value="productId">按照商品ID搜索</option>
                    <option value="productName">按照商品名称搜索</option>
                  </select>
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="关键词" 
                  value={this.state.searchKeyWord}
                  name='searchKeyWord' 
                  onChange={(e)=>{this.handleChange(e)}} onKeyUp={(e)=>{this.handleKeyUp(e)}} />
                </div>
                <button className="btn btn-primary" onClick={(e)=>{this.onSearch(e)}}>search</button>
              </div>
            </div>
          </div> 
    );
  }
}
