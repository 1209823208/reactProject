import React from 'react';
import { Link } from "react-router-dom";
import PageTitle from '../../component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';
import User from 'service/user-service.jsx';
import MUtil from 'util/mm.jsx';
const _mm = new MUtil();
const _user = new User();
import TableList from 'util/table-list/index.jsx';
export default class UserList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pageNum:1,
      list: [],
    }
  }
  onChange(page) {
    this.setState({
        pageNum: page,
      }, () => {
        this.loadUserList();
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
    return (
      <div id="page-wrapper">
        <div id="UserList">
            <PageTitle title="用户列表" />
            <TableList tableHeader={['ID','用户名','电话','email','日期']}>{userList}</TableList>
            <Pagination onChange={this.onChange.bind(this)} current={this.state.pageNum} total={this.state.total}/> 
        </div>
      </div>
    );
  }
}
