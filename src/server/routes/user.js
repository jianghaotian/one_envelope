var express = require('express');
var router = express.Router();

const runSql = require('../mysql');

const { getTimestamp_13 } = require('../src/timer');
const getRandom = require('../src/user/verification');
const sendEmail = require('../src/user/email');
const sendMsg = require('../src/user/message');

/**
 * 获取验证码  POST
 * 接收参数:
 *     account : 手机号/邮箱
 *     type    : 类型  (phone/email)
 * 返回参数:
 *     status: 0,
 *     message: "OK"
 */
router.post('/verification', function (req, res, next) {    
    let account = req.body.account;
    let type = req.body.type;
    let jsonData = {};
    
    var verification = getRandom(6);
    var minute = '3';

    runSql('insert into verification(vaccount, vtype, vcode, vtime) values (?,?,?,?)', [account, type, verification, getTimestamp_13()], (result) => {
        if (result.status === 0) {
            if (type === 'phone') {
                sendMsg(account, verification, minute, (result) => {
                    jsonData = {
                        status: result.status,
                        message: result.message
                    }
                    res.json(jsonData);
                });
            } else if (type === 'email') {
                sendEmail(account, verification, minute, (result) => {
                    jsonData = {
                        status: result.status,
                        message: result.message
                    }
                    res.json(jsonData);
                });
            } else {
                jsonData = {
                    status: 10003,
                    message: 'type error'
                }
                res.json(jsonData);
            }
        } else {
            res.json(result);
        }
    })
});

/**
 * 用户注册
 * 接收参数:
 *     account      : 手机号/邮箱
 *     type         : 类型  (phone/email)
 *     verification : 验证码
 *     password     : 密码
 *     name         : 昵称 (可选)
 * 
 * 返回参数:
 *     status: 0,
 *     message: "OK"
 */
router.post('/register', function (req, res, next) {    
    let account = req.body.type;
    let type = req.body.type;
    let verification = req.body.verification;
    let password = req.body.password;
    let name = req.body.name;



    if (type === 'phone') {
        runSql('insert into user(uphone, upassword, uname) values (?,?,?)', [account, password, name], (result) => {
    
    
    
        });


    } else if (type === 'email') {


    } else {
        jsonData = {
            status: 10003,
            message: 'type error'
        }
        res.json(jsonData);
    }

});

module.exports = router;
