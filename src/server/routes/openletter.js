var express = require('express');
var router = express.Router();
const path = require('path');

const runSql = require('../mysql');
const { getToken, checkToken } = require('../src/token');
const { getTimestamp_13 } = require('../src/timer');
const getRandom = require('../src/user/verification');
var multiparty = require('multiparty');
var fs = require('fs');

/**
 * 展示公开写信件list(全部)
 * GET
 * 接收参数:
 */
router.get('/getOlist', function (req, res, next) {
    let token = req.header('token');
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            runSql(`select user.Uname,user.Uimage,open.* from open,user where user.uid=open.uid order by open.oid desc`,
            [],(result1) => {
                res.json(result1);
            });
        }
    });
});
/**
 * 展示公开写信件内容
 * GET
 * 接收参数:
 *      oid:信件id
 */
router.get('/getOletter', function (req, res, next) {
    let{oid} = req.query;
    let token = req.header('token');
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            runSql(`select open.*,paper.ppimage from open,paper where open.oid=? and paper.ppid=open.ppid`,
            [oid],(result1)=>{
                console.log(result1)
                res.json(result1);
            });
        }
    });
});
/**
 * 删除公开写的信件
 * POST
 * 接收参数:
 *   oid：信件id
 */
router.post('/delOletter', function (req, res, next) {
    let {oid} = req.body;
    let token = req.header('token');
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            let uid = result.data.uid;
            runSql(`delete from open where uid=? and oid=?`,[uid,oid],(result1)=>{
                res.json(result1);
            })
        }
    });
});

/**
 * 书写公开写信件内容
 * POST
 * 接收参数:
 *      Otitle:信件标题
 *      Ocontent：信件内容
 *      Oday:创建日期
 *      ppid:背景id
 *      anonymous:是否匿名
 */
router.post('/writeOpen', function (req, res, next) {
    let {Otitle, Ocontent,Oday,ppid,weather,anonymous} = req.body;
    let token = req.header('token');
    checkToken(token, (result) => {
        if(result.status != 0){
            res.json(result);
        }else{
            let uid = result.data.uid;
            runSql(`insert into open(Otitle, Ocontent,Oday,Uid,ppid,number,weather,anonymous) values (?,?,?,?,?,?,?,?)`,[Otitle,Ocontent,Oday,uid,ppid,0,weather,anonymous],(result1) =>{
                res.json(result1)
            });
        }
    });
});
/**
 * 修改背景
 * 请求方式：
 *      POST
 * 接收参数：
 *      oid：信件id
 *      ppid：更换后的背景id
 */
router.post('/modifyObg',function(req,res,next){
    let token = req.header('token');
    let {oid,ppid} =  req.body;
    checkToken(token,(result)=>{
        if(result.status != 0){
            res.json(result)
        }else{
            runSql('update open set ppid=? where oid=? ',[ppid,oid],(result1)=>{
                res.json(result1);
            })
        }
    })
})
/**
 * 个人所写公开信
 * GET
 * 接收参数:
 */
router.get('/perOlist', function (req, res, next) {
    let token = req.header('token');
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            let uid = result.data.uid;
            runSql(`select user.Uname,user.Uimage,open.* from open,user where user.uid=open.uid and uid=?`,
            [uid],(result1) => {
                res.json(result1);
            });
        }
    });
});
module.exports = router;
