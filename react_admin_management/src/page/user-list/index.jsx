import React from 'react';
import { Link } from "react-router-dom";
import PageTitle from '../../component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';
import User from 'service/user-service.jsx';
import MUtil from 'util/mm.jsx';
const _mm = new MUtil();
const _user = new User();

export default class UserList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pageNum:1,
      list: [],
    }
  }
  onChange(page) {
    console.log(page);
    this.setState({
      pageNum: page,
    });
  }
  componentDidMount(){
    this.loadUserList()
  }
  loadUserList(){
    _user.getUserList(this.state.pageNum).then(res => {
        this.setState(res);
    }, errMsg => {
        this.setState({
            list : []
        });
        _mm.errorTips(errMsg);
    });
  }
  render() {
    let userList = this.state.list.map((item,index)=>{
      return(
        <tr key={index}>
          <td>{item.id}</td>
          <td>{item.username}</td>
          <td>{item.phone}</td>
          <td>{item.email}</td>
          <td>{new Date().toLocaleString(item.createTime)}</td>
        </tr>
      )
    })
    let nodata = <tr><td colSpan="5">暂无数据</td></tr>
    let tableData = this.state.list.length>0?userList:nodata
    return (
      <div id="page-wrapper">
        <div id="UserList">
            <PageTitle title="用户列表" />
            <div className="row">
                <div className="col-md-12">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>id</th>
                        <th>用户名</th>
                        <th>电话</th>
                        <th>email</th>
                        <th>时间</th>
                      </tr>
                    </thead>
                    <tfoot>{tableData}</tfoot>
                  </table>
                  <Pagination onChange={this.onChange.bind(this)} current={this.state.pageNum} total={this.state.total}/>
                </div>
            </div>
        </div>
      </div>
    );
  }
}
