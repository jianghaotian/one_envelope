import { get, post } from './http';

const api = {

    
    login: p => post('adminlogin/login',p),
    getname:p => get('adminlogin/getname',p),
    showadmin: p => get('adminmanager/show',p),
    deladmin: p => post('adminmanager/deladmin',p),
    checkphone: p=> get('adminmanager/checkphone',p),
    addadmin: p => post('adminmanager/addadmin',p),
    getusers: p => get('usermanager/getusers',p),
    userlist: p => get('usermanager/userlist',p),
    checkuid: p => get('usermanager/checkuid',p),
    deluser:p => post('usermanager/deluser',p),
    getpaper: p => get('papermanager/getpaper',p),
    paperlist: p=> get('papermanager/paperlist',p),
    addpaper: p => post('image/paper',p),
    delpaper: p => post('papermanager/delpaper',p)

}


export default api;

// 调用
// this.$api.login(表单).then(res => {
//     // 获取数据成功后的其他操作
//     …………
// }) 

// http://localhost:8000/v1/user/login