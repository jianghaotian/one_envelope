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
    //http://localhost:3000/v1/private/getletter?toUid=1
    let {toUid } = req.query;
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            // console.log(result);
            let uid = result.data.uid;
            runSql(`select * from pletter where uid=? and toUid=? and isDelete=?`, [uid,toUid,0], (result1) => {
                console.log(result1);
                res.json(result1);
            });
        }
    });
});
/**
 * 删除私密写的信件
 * POST
 * 接收参数:
 *   pid：信件id
 */
router.get('/getletter/pdelete', function (req, res, next) {
    //http://localhost:8000/v1/private/getletter/pdelete?pid=6
    console.log(req.query);
    let {pid} = req.query;
    console.log(pid);
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            // console.log(result);
            let uid = result.data.uid;
            runSql(`select isDelete from pletter where uid=? and pid=?`,[uid,pid],(result1) =>{
                console.log(result1.data[0].isDelete);
                if(result1.data[0].isDelete == 0){
                    runSql(`update pletter set isDelete=? where uid=? and pid=? `, [1,uid,pid], (result2) => {
                        console.log(result2);                        
                            res.json(result2);
                    })
                }
            })
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
