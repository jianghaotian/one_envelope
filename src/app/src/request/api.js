import { get, post } from './http';

const api = {

    //Login
    login: p => post('users/login', p),//登录
    login_Vcode: p => post('users/verification', p),//登录验证码
    register_Vcode: p => post('users/verification', p),//注册验证码
    register: p => post('users/register', p),//注册
    getLetter: p => get('private/getletter',p),//获取信件
    getToUList:p =>get('private/getlist',p),//获取收件人列表
    delPrivateLetter : p=> post('private/getletter/pdelete',p),//删除信件
    reName : p=> post('private/changetoNick',p),//重命名
    getContent : p=> get('showletter/show',p),//展示信件内容
    writeLetter : p =>post('private/writeletter',p),//新建信件
    editLetter : p=> post('showletter/edit',p),//编辑信件
    addAddressee : p=> post('private/addlist',p),//添加收信人
    delAddressee : p=> post('private/dellist',p),//删除收信人
    notice :p=> get('mine/notice',p),//消息通知

    theme: p=> get('together/theme',p),

    headimg: p => post('image/head',p),

    // lxc
    mailbox: p => get('mailbox',p),
    showmail: p => get('mailbox/showmail',p),
    mine: p => get("mine",p),
    sharenum : p => get("mine/sharenum",p),
    favorite : p => get('mine/favorite',p),
    recyclebin : p => post('mine/recyclebin/deletebin',p),
    changename : p => post('mine/changename',p),
    collec: p => get("mailbox/collect",p),
    delcollect:p => post("mine/delcollect",p),
    deletemail:p => post("mailbox/deletemail",p),
    recyclepletter:p=> get('mine/recyclepletter',p),
    restore:p => post('mine/recyclebin/restore',p),
    changepwd:p => post('mine/changepwd',p),
    getoldpwd: p => get('mine/getoldpwd',p),
    notice: p => get('mine/notice',p)
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