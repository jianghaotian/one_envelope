var express = require('express');
var router = express.Router();

const runSql = require('../mysql');
const { getToken, checkToken } = require('../src/token');

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTU3NDkzNDk1NCwiZXhwIjoxNTc3NjEzMzU0fQ.PQu7Dzp4MsurerTMR-wYSITeWKxGoo_aH_002CeEzqg';
/**
 * 获取个人信息
 * GET
 * 接收参数:
 *      uid:用户id
 * 返回参数：
 *      uname：用户名称
 *      uimage：用户头像
 * 
 * 
 */
router.get('/', function (req, res, next) {
    checkToken(token, (result) => {
        let uid = result.data.uid;
        if (result.status !== 0) {
            res.json(result);
        } else {
            runSql(`select * from user where uid =?`,[uid],(result1)=>{
                res.json(result1);
            })
        }
    });
   
});

/**
 * 修改昵称
 * 请求方式：
 *      POST
 * 接收参数：
 *      uname：用户名
 * 返回参数：
 * 
 * url:http://localhost:3000/v1/mine/changename
 */
router.post('/changename', function (req, res, next) {
    let {uname}=req.body;
    checkToken(token, (result) => {
        let uid = result.data.uid;
        if (result.status !== 0) {
            res.json(result);
        } else {
            runSql(`update user set uname=? where uid=?`,[uname,uid],(result1)=>{
                res.json(result1);
            })
        }
    });
});

/**
 * 修改密码
 * 请求方式：
 *      POST
 * 接收参数：
 *      oldpwd：用户旧密码
 *      newpwd：用户新密码
 * 返回参数：
 *      
 */
router.post('/changepwd',function(req,res,next){
    let{oldpwd,newpwd} = req.body;
    checkToken(token,(result)=>{
        if(result.status != 0){
            res.json(result);
        }else{
            let uid = result.data.uid;
            runSql(`select upassword from user where uid=? and upassword=?`,[uid,oldpwd],(result1)=>{
                var data = result1.data;
                var arr = Object.getOwnPropertyNames(data);
                // console.log(arr.length);
                if(arr.length == 1){
                    res.json('旧密码不正确！')
                }else{
                    runSql(`update user set upassword=? where uid=?`,[newpwd,uid],(result2)=>{
                        res.json(result2);
                    })
                }
            })
        }
    })
})
module.exports = router;