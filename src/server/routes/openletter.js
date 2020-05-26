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
            runSql(`select user.Uname,user.Uimage,open.* from open,user where user.uid=open.uid and user.uid=? order by open.oid desc`,
            [uid],(result1) => {
                res.json(result1);
            });
        }
    });
});
/**
 * 返回用户的vip属性
 * GET
 * 接收参数:
 */
router.get('/isVip', function (req, res, next) {
    let token = req.header('token');
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            let uid = result.data.uid;
            runSql(`select user.Uname,user.Vip from user where uid=?`,
            [uid],(result1) => {
                res.json(result1);
            });
        }
    });
});
/**
 * 修改信件内容(公开写)
 * 请求方式：
 *      POST
 * 接受参数：
 *      oid：信件id
 *      Otitle:信件标题
 *      Ocontent：信件内容
 *      Oday：信件修改后的日期
 *      weather:天气情况
 * 返回参数：
 *      
 */
router.post('/amendLetter',function(req,res,next){
    let {oid,Otitle,Ocontent,Oday,weather} = req.body;
    let token = req.header('token');
    checkToken(token,(result) => {
        if(result.status !=0){
            res.json(result);
        }else{
            let uid =  result.data.uid;
            runSql(`update open set Otitle=?,Ocontent=?,Oday=?,weather=? where oid=? and uid=? `,
            [Otitle,Ocontent,Oday,weather,oid,uid],(result2)=>{
                res.json(result2);
            })
        }
    })
})
/**
 * 点赞
 * GET
 * 接收参数:
 *      oid:信件id
 */
// router.get('/addLikes', function (req, res, next) {
//     let {oid} = req.query;
//     let token = req.header('token');
//     checkToken(token, (result) => {
//         if (result.status !== 0) {
//             res.json(result);
//         } else {
//             let uid = result.data.uid;
//             runSql(`select open.number from open where oid=? and uid=?`, [oid,uid], (result1) => {
//                 let number = result1.data[0].number;
//                 number++;
//                 runSql(`update open set number=? where uid=? and oid=?`, [number,uid,oid], (result2) => {
//                     runSql(`select open.number from open where oid=? and uid=?`, [oid,uid], (result3) => {
//                         res.json(result3)
//                     })
//                 });
//             });
//         }
//     });
// });
router.get('/addLikes', function (req, res, next) {
    let {oid} = req.query;
    let token = req.header('token');
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            let uid = result.data.uid;
            runSql(`select open.number from open where oid=?`, [oid], (result1) => {
                let num = result1.data[0].number;
                num++;
                runSql(`select likepeo from open where oid=?`,[oid],(result2)=>{
                    var peo = result2.data[0].likepeo;
                    if(peo==null){
                        runSql('update open set number=?,likepeo=? where oid=? ',[num,uid,oid],(result3)=>{
                            runSql(`select open.number from open where oid=?`, [oid], (result4) => {
                                res.json(result4);
                            })
                        })
                    }else{
                        runSql('update open set number=?,likepeo=? where oid=? ',[num,peo+','+uid,oid],(result5)=>{
                            runSql(`select open.number from open where oid=?`, [oid], (result6) => {
                                res.json(result6);
                            })
                        })
                    }
                })
            });
        }
    });
});
/**
 * 取消点赞
 * GET
 * 接收参数:
 *      oid:信件id
 */
router.get('/cancelLikes', function (req, res, next) {
    let {oid} = req.query;
    let token = req.header('token');
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            let uid = result.data.uid;
            runSql(`select open.number from open where oid=? and uid=?`, [oid,uid], (result1) => {
                let number = result1.data[0].number;
                number--;
                runSql(`update open set number=? where uid=? and oid=?`, [number,uid,oid], (result2) => {
                    runSql(`select open.number from open where oid=? and uid=?`, [oid,uid], (result3) => {
                        res.json(result3)
                    })
                });
            });
        }
    });
});
/**
 * 获取指定用户信息
 * GET
 * 接收参数:
 *      uid:用户id
 */
router.get('/designuser', function (req, res, next) {
    let {uid} = req.query;
    let token = req.header('token');
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            runSql(`select user.Uid,user.Uname,user.Uimage,user.Uday,user.Signature,user.homeBack,user.Vip,user.Grade from user where uid=?`,
            [uid], (result1) => {
                res.json(result1);
            });
        }
    });
});
module.exports = router;
