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
            runSql(`select * from users where uid =?`,[uid],(result1)=>{
                res.json(result1);
            })
        }
    });
   
});

module.exports = router;