var express = require('express');
var router = express.Router();

const runSql = require('../mysql');
const { getToken, checkToken } = require('../src/token');
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTU3NDkzNDk1NCwiZXhwIjoxNTc3NjEzMzU0fQ.PQu7Dzp4MsurerTMR-wYSITeWKxGoo_aH_002CeEzqg';


/**
 * 获取信箱内容
 * GET
 * 接收参数:
 */
router.get('/', function (req, res, next) {
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            let uid = result.data.uid;
            runSql(`select * from pletter where isSend = ? and touid=?`, [1,uid], (result1) => {
                console.log(result1);
                res.json(result1);
            });
        }
    });
});
/**
 * 展示信箱具体内容
 * GET
 * 接收参数:
 *      pid:信件id
 */
router.get('/showmail', function (req, res, next) {
    let {pid} = req.query;
    console.log(pid);
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            let uid = result.data.uid;
            runSql(`select * from pletter where isSend = ? and touid=? and pid=?`, [1,uid,pid], (result1) => {
                console.log(result1);
                res.json(result1);
            });
        }
    });
});
/**
 * 点击收藏标识收藏信件
 * GET
 * 接收参数:
 *      pid:信件id
 */
router.get('/collect', function (req, res, next) {
    let {pid} = req.query;
    console.log(pid);
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            let uid = result.data.uid;
            runSql(`update pletter set isCollection=? where isSend = ? and touid=? and pid=?`, [1,1,uid,pid], (result1) => {
                console.log(result1);
                res.json(result1);
            });
        }
    });
});
module.exports = router;