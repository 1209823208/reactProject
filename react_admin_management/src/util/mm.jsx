import $ from 'jquery'
class MUtil{
    request(params){
        return new Promise((resolve,reject)=>{
            $.ajax({
                type: params.type||"GET",
                url:  params.url||"",
                data: params.data||null,
                dataType:  params.dataType|"json",
                success: (res)=>{
                    // 请求成功
                    if(res.status === 0 ){
                        if(typeof resolve === 'function'){
                            resolve(res.data,res.msg)
                        }
                    }else if(res.status === 10){
                         // 未登陆
                         this.doLogin();
                    }else{
                        // 请求失败
                        if(typeof reject === 'function'){
                            reject(res.msg||res.data)
                        }
                    } 
                },
                error:(err)=>{
                    typeof reject === 'function' && reject(err.statusText);
                }
            })
        })
    }
    // 跳转登录
    doLogin(){
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    }
    //获取URL参数
    getUrlParams(name){
        let quersyList = window.location.search;
        if(quersyList){
            let params_arr = quersyList.split('&');
            for(let item of params_arr){
                if(item.indexOf(name)>-1){
                    return item.split('=')[1];
                }
            }
        }
        return '';
    }
    // 成功提示
    successTips(successMsg){
        alert(successMsg || '操作成功！');
    }
    // 错误提示
    errorTips(errMsg){
        alert(errMsg || '好像哪里不对了~');
    }
    // 本地存储
    setStorage(name,data){
        let dataType = typeof data;
        if(dataType === 'object'){
            window.localStorage.setItem(name, JSON.stringify(data));
        }else if(['number','string','boolean'].indexOf(dataType)>-1){
            window.localStorage.setItem(name, data);
        }else{
            // 其他不支持的类型
            alert('该类型不能用于本地存储');
        }
    }
    // 获取
    getStorage(name){
        let data = window.localStorage.getItem(name);
        if(data){
            return JSON.parse(data);
        }else{
            return '';
        }
    }
    // 删除
    removeStorage(name){
        window.localStorage.removeItem(name);
    }
}
export default  MUtil;