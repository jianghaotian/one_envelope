var express = require('express');
var router = express.Router();

const runSql = require('../mysql');
const { getToken, checkToken } = require('../src/token');

/**
 * 获取昨日新注册用户数量
 * GET
 * 返回参数：
 *  {
 *     status: 0, 
 *     message: 'OK', 
 *     data: [ { usernum: 3 } ]     
 *  } 
 * 
 */
router.get('/', function (req, res, next) {
    let timestamp1 = new Date(new Date(new Date().toLocaleDateString()).getTime())-24 * 60 * 60 * 1000;
    let timestamp = new Date(new Date(new Date().toLocaleDateString()).getTime())-1;
    let time1 = new Date(timestamp1)    //先将时间戳转为Date对象，然后才能使用Date的方法
    let ntime = time1.getFullYear()+'-'+(time1.getMonth() + 1)+'-'+time1.getDate();
    let time = new Date(timestamp)    //先将时间戳转为Date对象，然后才能使用Date的方法
    let otime = time.getFullYear()+'-'+(time.getMonth() + 1)+'-'+time.getDate();
    runSql(`select count(uday) as usernum from user where uday between ? and ?`, [ntime,otime], (result1) => {
        console.log(result1);
        res.json(result1);
    }); 
});
/**
 * 获取累计注册
 * GET
 * 返回参数：
 *  {
 *     status: 0, 
 *     message: 'OK', 
 *     data: [ { totalnum: 4 } ]     
 *  } 
 * 
 */
router.get('/totalnum', function (req, res, next) {
    runSql(`select count(*) as totalnum from user`, [], (result1) => {
        console.log(result1);
        res.json(result1);
    });
});
/**
 * 获取历史数据查询
 * GET
 * 返回参数：
 *  {
 *     status: 0, 
 *     message: 'OK', 
 *     data: [ 
 *         {
 *            Uday:'2019-12-13',
 *            newregist:1 
 *         } 
 *     ]     
 *  } 
 * 
 */
router.get('/userdata', function (req, res, next) {
    runSql(`select Uday,count(Uday) as newregist from user group by uday`, [], (result1) => {   
        console.log(result1)
        res.json(result1);
    });
});

/**
 * 获取昨日新增加的写信数
 * GET
 * 返回参数：
 *  {
 *     status: 0, 
 *     message: 'OK', 
 *     data: [ { newletnum: 1 } ]     
 *  } 
 * 
 */
router.get('/addletternum', function (req, res, next) {
    let timestamp1 = new Date(new Date(new Date().toLocaleDateString()).getTime())-24 * 60 * 60 * 1000;
    let timestamp = new Date(new Date(new Date().toLocaleDateString()).getTime())-1;
    runSql(`select count(pid) as newletnum,count(isSend) as sharenum from pletter where pday between ? and ?`, [timestamp1,timestamp], (result1) => {
        console.log(result1);
        res.json(result1);
    });
});
/**
 * 获取昨日新增加分享数
 * GET
 * 返回参数：
 *  {
 *     status: 0, 
 *     message: 'OK', 
 *     data: [ { sharenum: 1 } ]     
 *  } 
 * 
 */
router.get('/shareletternum', function (req, res, next) {
    let timestamp1 = new Date(new Date(new Date().toLocaleDateString()).getTime())-24 * 60 * 60 * 1000;
    let timestamp = new Date(new Date(new Date().toLocaleDateString()).getTime())-1;
    runSql(`select count(isSend) as sharenum from pletter where isSend=? and (pday between ? and ?)`, [1,timestamp1,timestamp], (result1) => {
        console.log(result1);
        res.json(result1);
    });
});

/**
 * 获取累计写信数
 * GET
 * 返回参数：
 *  {
 *     status: 0, 
 *     message: 'OK', 
 *     data: [ { usernum: 3 } ]     
 *  } 
 * 
 */
router.get('/totalletnum', function (req, res, next) {
    runSql(`select count(pid) as totalletnum from pletter`, [], (result1) => {
        console.log(result1);
        res.json(result1);
    });
});

module.exports = router;