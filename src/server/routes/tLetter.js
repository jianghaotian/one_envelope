var express = require('express');
var router = express.Router();

const runSql = require('../mysql');
const { getToken, checkToken } = require('../src/token');

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTU3NDkzNDk1NCwiZXhwIjoxNTc3NjEzMzU0fQ.PQu7Dzp4MsurerTMR-wYSITeWKxGoo_aH_002CeEzqg';
/**
 * 获取一起写主题
 * 请求方式：
 *  GET
 * 接受参数：
 *      Uid:用户id
 */
router.get('/theme', function (req, res, next) {
    checkToken(token, (result) => {
        // console.log(result);//这个可以获取到uid
        if (result.status !== 0) {
            res.json(result);
        } else {
            let uid = result.data.uid;
            runSql(`select distinct theme.* from theme,tmember where theme.uid=? and (theme.tid=tmember.tid) `,[uid],(result1) => {
                res.json(result1);
            })
        }
    });
   
});



/**
 * 获取主题详情
 * 请求方式：
 *  GET
 * 接受参数：
 *      tid：主题id
 * 返回参数：
 *      tid:主题id
 *      tname：主题名称
 *      timage：主题图片
 *      tday：创建日期
 *      ltitle：信件标题
 *      lcontent:信件内容
 *      lday:信件创建日期
 */
router.get('/theme/showtheme',function(req,res,next){
    // http:localhost:8000/v1/together/theme/showtheme?tid=1
    let {tid} = req.query;
    checkToken(token,(result)=>{
        if(result.status != 0){
            res.json(result);
        }else{
            let uid = result.data.uid;
            runSql(`select theme.tname,theme.timage,theme.tday,tletter.ltitle,tletter.lcontent,tletter.tid,tletter.lday from theme,tletter where theme.uid=? and theme.tid=? and (theme.tid=tletter.tid)`,
                    [uid,tid],(result1) => {
                        res.json(result1);
                    })
        }
    })
})
/**
 * 获取成员
 * GET
 * 接受参数：
 *      tid:主题id
 * 返回参数：
 *      uname:用户名
 */
router.get("/theme/showtheme/member",function(req,res,next){
    // http://localhost:3000/v1/together/theme/showtheme/member?tid=2
    let{tid} = req.query;
    checkToken(token,(result)=>{
        if(result.status != 0){
            res.json(result);
            }else{
                runSql(`select distinct user.uname from tmember,user where tmember.tid=? and (tmember.uid = user.uid)`,[tid],(result1) =>{
                    res.json(result1);
                } )
        }
    })
})
/**
 * 书写主题信件内容
 * POST
 * 接收参数:
 *     Ltitle:信件标题
 *     Lcontent:信件内容
 *     Uid:写信人id
 *     Lday:创建日期
 *     Tid:主题id
 */
router.post('/theme/:tid/writeletter', function (req, res, next) {
    let { title, content,lday,tid} = req.body;
    checkToken(token, (result) => {
        if(result.status != 0){
            res.json(result);
        }else{
            let uid = result.data.uid;
            runSql(`insert into tletter(Ltitle, Lcontent, Uid,Lday,Tid,isDeletc) values (?,?,?,?,?,?)`,
             [title, content,uid,lday,tid,0],(result1)=>{
                res.json(result1);
            })
        }
    })
});
 /**
 * 删除一起写信件
 * 请求方式：
 *      POST
 * 接受参数：
 *      lid：信件id
 * 返回参数：
 * 
 */
router.post("/theme/delletter",function(req,res,next){
    let {lid} = req.body;
    checkToken(token,(result)=>{
        if(result.status != 0){
            res.json(result);
        }else{
            runSql(`delete from tletter where lid=?`,[lid],(result1)=>{
                res.json(result1);
            })

        }
    })
})

/**
 * 添加主题
 * 请求方式：
 *      POST
 * 接受参数：
 *      tname：主题名称
 *      timage：主题图片
 *      tday：创建日期
 *      isPrivate:是否公开
 * 返回参数：
 * 
 */

 router.post('/theme/addtheme',function(req,res,next){
     let {tname,timage,tday,isPrivate} = req.body;
     checkToken(token,(result) => {
         if(result.status != 0){
             res.json(result);
         }else{
             let uid = result.data.uid;
             runSql(`insert into theme (tname,timage,isPrivate,uid,tday) value(?,?,?,?,?)`,[tname,timage,isPrivate,uid,tday],
             (result1) => {
                 res.json(result1);
             })
         }
     })
 })
module.exports = router;