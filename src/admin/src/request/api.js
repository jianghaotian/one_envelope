import { get, post } from './http';

const api = {
    // 登录
    login: p => post('adminlogin/login',p),
    // 获取用户名
    getname:p => get('adminlogin/getname',p),
    // 展示管理员列表
    showadmin: p => get('adminmanager/show',p),
    // 删除管理员
    deladmin: p => post('adminmanager/deladmin',p),
    // 检查添加手机号码
    checkphone: p=> get('adminmanager/checkphone',p),
    // 添加管理员
    addadmin: p => post('adminmanager/addadmin',p),
    // 获取昨日新注册用户数量
    newuser: p => get('analy', p),
    // 获取累计注册
    totalnum: p => get('analy/totalnum',p),
    // 用户分析获取历史数据查询
    userdata: p => get('analy/userdata',p),
    // 获取昨日新增加的写信数
    addpletternum: p => get('analy/addpletternum',p),
    // 获取累计写信数
    totalletnum: p => get('analy/totalletnum',p),
    // 获取昨日新增加分享数
    shareletternum: p => get('analy/shareletternum',p),
    // 获取私密写信件列表
    adminletman: p => get('adminletman',p),
    // 私密写信件列表删除操作
    delpletter: p=> post('adminletman/delpletter',p),
    // 获取一起写信件列表
    tletterlist: p => get('adminletman/tletterlist',p),
    // 一起写信件列表删除操作
    deltletter: p=> post('adminletman/deltletter',p),
    // 获取一起写信件总数
    totallid: p=> get('adminletman/totallid',p),
    // 获取私密写信件总数
    totalpid: p=> get('adminletman/totalpid',p),
    // 信件分析获取历史数据查询
    letterdata: p=> get('analy/letterdata',p),
    // 获取用户总数
    getusers: p => get('usermanager/getusers',p),
    // 获取用户列表
    userlist: p => get('usermanager/userlist',p),
    // 检查uid是否是主题创建者
    checkuid: p => get('usermanager/checkuid',p),
    // 删除用户
    deluser:p => post('usermanager/deluser',p),
    // 获取信纸数量
    getpaper: p => get('papermanager/getpaper',p),
    // 展示信纸列表
    paperlist: p=> get('papermanager/paperlist',p),
    // 上传信纸
    addpaper: p => post('image/paper',p),
    // 删除信纸
    delpaper: p => post('papermanager/delpaper',p),
    
    //新增
    //获取帮助用户信息
    helpUser: p => get('help/helpUser',p),
    //保存反馈信息
    saveBack:p=> post('/help/saveBack',p),
    //获取feedback
    searchFeedback:p => get('/help/searchFeedback',p),
    //获取公开信件信息
    getopen:p=>get('/openManager/getopen',p),
    //删除公开写信件
    delopen:p=>post('/openManager/delopen',p),
    //获取公开写信件数
    opennum:p=>get('/openManager/opennum',p),
}


export default api;

// 调用
// this.$api.login(表单).then(res => {
//     // 获取数据成功后的其他操作
//     …………
// }) 

// http://localhost:8000/v1/user/login