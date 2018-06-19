import $ from 'jquery';
import MUtil from 'util/mm.jsx';
const _mm = new MUtil();
class User{
    // 用户登录
    login(loginInfo){
        return _mm.request({
            type: 'post',
            // url: 'http://admintest.happymmall.com/manage/user/login.do',
            url: '/manage/user/login.do',
            data: loginInfo
        });
    }
    //检查数据
    checkLoginInfo(loginInfo){
       let username = $.trim(loginInfo.username),
        password  = $.trim(loginInfo.password);
        if(username===''|| username.length===0){
            return {
                status:false,
                msg:'用户名不能为空'
            }
        }
        if(password===''|| password.length===0){
            return {
                status:false,
                msg:'密码不能为空'
            }
        }
        return {
            status:true,
            msg:'数据格式正确'
        }
    }
    // 退出登录
    logout(){
        return _mm.request({
            type    : 'post',
            url     : '/user/logout.do'
        });
    }
    getUserList(pageNum){
        return _mm.request({
            type    : 'post',
            url     : '/manage/user/list.do',
            data    : {
                pageNum : pageNum
            }
        });
    }
}
export default User;
