import { get, post } from './http';

const api = {

    login: p => post('user/login', p),
    headimg: p => post('image/head',p),

    // zym
    theme: p=> get('together/theme',p),
    themetitle:p=>get('together/theme/showtitle',p),
    themeContent: p=>get('together/theme/showtheme',p),
    member: p=>get('together/theme/showtheme/member',p),
    wrdelect: p=>post('together/theme/delletter',p),
    addtheme:p=>post('together/theme/addtheme',p),
    thdelect:p=>post('together/theme/deltheme',p),
    mbdelect:p=>post('together/theme/deltmember',p),
    addletter:p=>post('together/theme/writeletter',p),
    showletter:p=>get('together/theme/show',p),
    changeletter:p=>post('together/theme/edit',p),
    addimage:p => post('image/theme',p)


    // login: p => post('users/login', p),
    // login_veri: p => post('users/login/verification', p),
    // veri_login: p => post('users/verilogin', p),
    // register_veri: p => post('users/register/verification', p),
    // register: p => post('users/register', p),
    // get_token: p => get('users/gettoken', p),
    // get_info: p => get('info/get',p),


    // change_pwd: p => post('users/changepwd', p),
    // change_pwd_veri: p => post('users/cpwdveri', p),
    // veri_change_pwd: p => post('users/vericpwd', p),

    // set_grade: p => post('info/setgrade', p)

    
}


export default api;

// 调用
// this.$api.login(表单).then(res => {
//     // 获取数据成功后的其他操作
//     …………
// }) 

// http://localhost:8000/v1/user/login