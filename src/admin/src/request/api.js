import { get, post } from './http';

const api = {

    //Login
    // login: p => post('users/login', p),//登录
    // login_Vcode: p => post('users/verification', p),//登录验证码
    // register_Vcode: p => post('users/verification', p),//注册验证码
    
    login: p => post('adminlogin/login',p),
    getname:p => get('adminlogin/getname',p),
    showadmin: p => get('adminmanager/show',p),
    deladmin: p => post('adminmanager/deladmin',p),
    checkphone: p=> get('adminmanager/checkphone',p),
    addadmin: p => post('adminmanager/addadmin',p),
    newuser: p => get('analy', p),
    totalnum: p => get('analy/totalnum',p),
    userdata: p => get('analy/userdata',p),
    addletternum: p => get('analy/addletternum',p),
    totalletnum: p => get('analy/totalletnum',p),
    shareletternum: p => get('analy/shareletternum',p),
    adminletman: p => get('adminletman',p),
    delpletter: p=> post('adminletman/delpletter',p),
    tletterlist: p => get('adminletman/tletterlist',p),
    deltletter: p=> post('adminletman/deltletter',p),
    totallid: p=> get('adminletman/totallid',p),
    getusers: p => get('usermanager/getusers',p),
    userlist: p => get('usermanager/userlist',p),
    checkuid: p => get('usermanager/checkuid',p),
    deluser:p => post('usermanager/deluser',p)

}


export default api;

// 调用
// this.$api.login(表单).then(res => {
//     // 获取数据成功后的其他操作
//     …………
// }) 

// http://localhost:8000/v1/user/login