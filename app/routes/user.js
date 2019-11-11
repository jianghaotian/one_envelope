var express = require('express');
var router = express.Router();

const sendEmail = require('../src/user/email');
const sendMsg = require('../src/message');

/**
 * 获取验证码
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

    if (type === 'phone') {
        var verification = '123456';
        var minute = '3';

        sendMsg(account, verification, minute, (result) => {
            jsonData = {
                status: result.status,
                message: result.message
            }
            res.json(jsonData);
        });

    } else if (type === 'email') {
        var verification = '123456';
        var minute = '3';

        sendEmail(account, verification, minute, (result) => {
            jsonData = {
                status: result.status,
                message: result.message
            }
            res.json(jsonData);
        });
    } else {
        jsonData = {
            status: 103,
            message: 'type error'
        }
        res.json(jsonData);
    }
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



});


module.exports = router;
