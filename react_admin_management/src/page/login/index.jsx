import React from 'react';
import './index.css';
import User from 'service/user-service.jsx';
const _user = new User();
import MUtil from 'util/mm.jsx';
const _mm = new MUtil();
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            redirect:_mm.getUrlParams('redirect')||'/'
        }
    }
    // 数据双向绑定
    changeInputValue(e){
      let inputValue = e.target.value,
          inputName = e.target.name;
      this.setState({
        [inputName]:inputValue
      })
    }
    // 提交按钮 请求接口
    onSubmit(e){
        let dataInfo = {
            username : this.state.username,
            password : this.state.password
        }
        let checkMsg = _user.checkLoginInfo(dataInfo);
        if(checkMsg.status){
            _user.login(dataInfo).then(
                (res)=>{
                    _mm.setStorage('userInfo',res);
                    this.props.history.push(this.state.redirect); // 路由跳转
                },
                (err)=>{
                    console.log('err',err);
                    _mm.errorTips(err);
                }
            )
        }else{
            _mm.errorTips(checkMsg.msg);
        }
        // var myFetchOptions = {
		// 	headers: {
        //         'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        //     },
        //     method: "POST",
        //     body: 'username='+this.state.username+'&password='+this.state.password
		// };
        // fetch("http://admintest.happymmall.com/manage/user/login.do", myFetchOptions)
        // .then(response => response.json())
        // .then(res=>{
        //     console.log('fetch-then:',res); 
        // })
        // .catch(res => {
        //     console.log('fetch-catch:',res); 
		// })
    }
    onInputKeyUp(e){
        if(e.keyCode === 13){
            this.onSubmit();
        }
    }
    render() {
        return (
            <div id="login" className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div className="panel panel-default">
                        <div className="panel-heading">login</div>
                        <div className="panel-body">
                            <div className="form-group">
                                <label htmlFor="exampleInputUsername">Username</label>
                                <input type="text" className="form-control" id="exampleInputUsername" name="username"
                                        placeholder="Username"  onChange={(e)=>{this.changeInputValue(e)} }
                                        onKeyUp={this.onInputKeyUp.bind(this)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" name="password"
                                        placeholder="Password"  onChange={this.changeInputValue.bind(this)}
                                        onKeyUp={this.onInputKeyUp.bind(this)}/>
                            </div>
                            <button type="submit" className="btn btn-default" onClick={this.onSubmit.bind(this)}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}