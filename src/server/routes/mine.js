var express = require('express');
var router = express.Router();

const runSql = require('../mysql');
const { getToken, checkToken } = require('../src/token');

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTU3NDkzNDk1NCwiZXhwIjoxNTc3NjEzMzU0fQ.PQu7Dzp4MsurerTMR-wYSITeWKxGoo_aH_002CeEzqg';
/**
 * 获取个人信息
 * GET
 * 接收参数:
 *      title:信件标题
 *      content：信件内容
 *      uid:写信人id
 *      toUid:收件人id
 *      toNick:收信人称呼
 *      pday:创建日期
 * 
 */
router.get('/', function (req, res, next) {
    checkToken(token, (result) => {
        console.log(result);
        let uid = result.data.uid;
        if (result.status !== 0) {
            res.json(result);
        } else {
            runSql(`select * `)
        }
    });
   
});

module.exports = router;