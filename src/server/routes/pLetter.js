var express = require('express');
var router = express.Router();

const runSql = require('../mysql');
const { getToken, checkToken } = require('../src/token');
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTU3NDkzNDk1NCwiZXhwIjoxNTc3NjEzMzU0fQ.PQu7Dzp4MsurerTMR-wYSITeWKxGoo_aH_002CeEzqg';

/**
 * 获取所有私密写信件
 * GET
 * 接收参数:
 *      toUid：收件人id
 * 
 */
router.get('/getletter', function (req, res, next) {
    //http://localhost:3000/v1/private/getletter?uid=1&toUid=1
    
    let { uid, toUid } = req.query;
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            // console.log(result);
            let uid = result.data.uid;
            runSql(`select * from pletter where uid=? and toUid=?`, [uid,toUid], (result) => {
                console.log(result);
                res.json(result);
            });
        }
    });
});


/**
 * 书写信件内容
 * POST
 * 接收参数:
 *      title:信件标题
 *      content：信件内容
 *      toUid:收件人id
 *      toNick:收信人称呼
 *      pday:创建日期
 * 
 */
router.post('/writeletter', function (req, res, next) {
    let { title, content,toUid,toNick,pday } = req.body;
    checkToken(token, (result) => {
        if(result.status != 0){
            res.json(result);
        }else{
            let uid = result.data.uid;
            runSql(`insert into pletter(Ptitle, Pcontent, Uid,toUid,toNick,isSend,Pday,isCollection,isDelete) values (?,?,?,?,?,0,?,0,0)`, [title, content,uid,toUid,toNick,0,pday],(result1)=>{
                res.json(result1);
            })
        }
    })
});

/**
 * 展示收信人列表
 *请求方式
 *  GET
 * 接受参数：
 * 
 * 返回参数：
 *      Uimage：用户头像
 *      Uname：用户名
 *      toNick：收信人昵称
 *      toUid：收信人id
 */
router.get('/getlist',function(req,res,next){
    checkToken(token,(result)=>{
        let uid = result.data.uid;
        if(result.status != 0){
            res.json(result);
        }else{
            runSql(`select user.uimage,user.uname,pletter.toNick,pletter.toUid from user,pletter where user.uid=? and(user.uid = pletter.uid)`,[uid],
            (result1)=>{
                console.log(result1);
                res.json(result1);
            })
        }
    })

})
module.exports = router;
