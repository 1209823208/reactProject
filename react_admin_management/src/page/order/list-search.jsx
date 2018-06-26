import React from 'react';
export default class OrderSearchList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      orderNo:'',
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
    this.props.onSearch(this.state.orderNo)
  }
  render() {
    return (
          <div className="row">
            <div className="col-md-12">
              <div className="form-inline">
                <div className="form-group">
                  <select
                  className="form-control">
                    <option>按照订单编号搜索</option>
                  </select>
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="关键词"
                  value={this.state.orderNo}
                  name='orderNo'
                  onChange={(e)=>{this.handleChange(e)}} onKeyUp={(e)=>{this.handleKeyUp(e)}} />
                </div>
                <button className="btn btn-primary" onClick={(e)=>{this.onSearch(e)}}>search</button>
              </div>
            </div>
          </div>
    );
  }
}
