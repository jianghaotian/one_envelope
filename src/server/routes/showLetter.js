var express = require('express');
var router = express.Router();

const runSql = require('../mysql');
const { getToken, checkToken } = require('../src/token');
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTU3NDkzNDk1NCwiZXhwIjoxNTc3NjEzMzU0fQ.PQu7Dzp4MsurerTMR-wYSITeWKxGoo_aH_002CeEzqg';


/**
 * 展示信件内容
 * GET
 * 接收参数:
 *      pid:信件id
 * 
 */
router.get('/show', function (req, res, next) {
    // let { account, type } = req.query;
    let {pid} = req.query;
    console.log(req.query);
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            let uid = result.data.uid;
            runSql(`select * from pletter where uid=? and pid=?`, [uid,pid], (result) => {
                console.log(result);
                res.json(result);
            });
        }
    });
});


module.exports = router;