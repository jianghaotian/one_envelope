import { get, post } from './http';

const api = {

    login: p => post('users/login', p),
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
    headimg:p => post('image/head',p),
    changehead:p=>post('image/changehead',p),

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
    addimage:p => post('image/theme',p),

    //Login
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
    changeBack : p=>post('private/changeback',p),//更换背景
    selBack : p=>get('private/getback',p),//选择背景
        
}


export default api;

// 调用
// this.$api.login(表单).then(res => {
//     // 获取数据成功后的其他操作
//     …………
// }) 

// http://localhost:8000/v1/user/login