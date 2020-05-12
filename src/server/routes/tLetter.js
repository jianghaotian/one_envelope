var express = require('express');
var router = express.Router();

const runSql = require('../mysql');
const { getToken, checkToken } = require('../src/token');

const path = require('path');

const { getTimestamp_13 } = require('../src/timer');
const getRandom = require('../src/user/verification');
var multiparty = require('multiparty');
var fs = require('fs');

// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTU3NDkzNDk1NCwiZXhwIjoxNTc3NjEzMzU0fQ.PQu7Dzp4MsurerTMR-wYSITeWKxGoo_aH_002CeEzqg';
/**
 * 获取一起写主题
 * 请求方式：
 *  GET
 * 接受参数：
 *      Uid:用户id
 */
router.get('/theme', function (req, res, next) {
    let token = req.header('token');
    checkToken(token, (result) => {
        // console.log(result);//这个可以获取到uid
        if (result.status !== 0) {
            res.json(result);
        } else {
            let uid = result.data.uid;
            var addUid = '%'+uid+'%';
            runSql(`select distinct theme.* from theme where theme.uid=? or inviteUid like ?`,[uid,addUid],(result1) => {
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
 *      lid:信件id
 *      ltitle：信件标题
 *      lcontent:信件内容
 *      lday:信件创建日期
 */
router.get('/theme/showtheme',function(req,res,next){
    // http:localhost:8000/v1/together/theme/showtheme?tid=1
    let token = req.header('token');
    let {tid} = req.query;
    checkToken(token,(result)=>{
        if(result.status != 0){
            res.json(result);
        }else{
            let uid = result.data.uid;
            let addUid = '%'+ uid +'%';
            runSql(`select tletter.ltitle,tletter.lcontent,tletter.tid,tletter.lday,tletter.lid from tletter where  tletter.tid=? and (tletter.uid=? or inviteUid like ?)`,
                    [tid,uid,addUid],(result1) => {
                        console.log(result1);
                        res.json(result1);
                    })
        }
    })
})
/**
 * 展示主题详情头部
 * 请求方式：
 *      GET
 * 接受参数：
 *      tid：主题id
 * 返回参数：
//  *      
 */
router.get('/theme/showtitle',function(req,res,next){
    let{tid} = req.query;
    let token = req.header('token');
    // console.log(tid)
    checkToken(token,(result)=>{
        if(result.status !=0){
            res.json(result);
        }else{
            runSql(`select theme.*  from theme where theme.tid=?  `,[tid],(result1)=>{
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
 *      tid:主题id
 */
router.get("/theme/showtheme/member",function(req,res,next){
    // http://localhost:3000/v1/together/theme/showtheme/member?tid=2
    let{tid} = req.query;
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status != 0){
            res.json(result);
            }else{
                runSql(`select distinct user.uname,tmember.tid,user.uid from tmember,user where tmember.tid=? and (tmember.uid = user.uid)`,[tid],(result1) =>{
                    res.json(result1);
                } )
        }
    })
})
/**
 * 书写主题信件内容
 * POST
 * 接收参数:
 *     title:信件标题
 *     content:信件内容
 *     day:创建日期
 */
router.post('/theme/writeletter', function (req, res, next) {
    let { title, content,lday,tid,imgArr} = req.body;
    // let imgBrr = JSON.parse(imgArr);
    let token = req.header('token');
    checkToken(token, (result) => {
        if(result.status != 0){
            res.json(result);
        }else{
            let uid = result.data.uid;
            if(imgArr==undefined){
                runSql(`insert into tletter(Ltitle, Lcontent, Uid,Lday,Tid,isDelete,insertImg) values (?,?,?,?,?,?,?)`,
                [title, content,uid,lday,tid,0,null],(result1)=>{
                    res.json(result1);
                })
            }else{
                var form = new multiparty.Form();
                form.parse(req, function(err, fields, files){ 
                    //将前台传来的base64数据去掉前缀
                    var imgData = imgArr.replace(/^data:image\/\w+;base64,/, '');
                    var dataBuffer = new Buffer.from(imgData, 'base64');
                    // 写入文件
                    var name = getTimestamp_13()+'_'+getRandom(2)+'.png';
                    var picPath = path.join(__dirname,'../public/insertimg/'+name);
                    fs.writeFile(picPath, dataBuffer, function(err){
                        if(err){
                            res.send(err);
                        }
                        else{
                            runSql(`insert into tletter(Ltitle, Lcontent, Uid,Lday,Tid,isDelete,insertImg) values (?,?,?,?,?,?,?)`,
                            [title, content,uid,lday,tid,0,name],(result3)=>{
                                res.json({status: 0, data: name});
                            })
                        }
                    });
                })
            }
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
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status != 0){
            res.json(result);
        }else{
            runSql(`delete from tletter where lid=?`,[lid],(result1)=>{
                // runSql(`select * from tletter where lid=?`,[lid],(result2)=>{
                //     res.json(result2);
                // })
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
     let token = req.header('token');
     checkToken(token,(result) => {
         if(result.status != 0){
             res.json(result);
         }else{
             let uid = result.data.uid;
             runSql(`insert into theme (tname,timage,isPrivate,uid,tday) value(?,?,?,?,?)`,[tname,timage,isPrivate,uid,tday],
             (result1) => {
                 
             })
         }
     })
 })
 /**
  * 添加创建者成员
  * 请求方式：
  *      POST
  * 接收参数：
  *     tid:信件id
  * 返回参数：
  *     
  */
router.post('/theme/addFirstMember',function(req,res,next){
    let {tid} = req.body;
    let token = req.header('token');
    let own;
    checkToken(token,(result)=>{
        if(result.status!=0){
            res.json(result);
        }else{
            let uid =result.data.uid;
            runSql('select uid from theme where tid=?',[tid],(result1)=>{
                own = result1.data[0].uid;
                if(own == uid){
                    runSql(`select uid from tmember where tid=?`,[tid],(result2)=>{; 
                        if(result2.data.length==0){
                            runSql('insert into tmember(tid,uid) value(?,?)',[tid,own],(result3)=>{
                                console.log(result3);
                            })
                        }
                    })
                }
            })
        }
    })
})
  /**
  * 删除成员
  * 请求方式：
  *      POST
  * 接受参数：
  *     uid:用户id
  *     tid:主题id
  * 返回参数：
  *     
  */
 router.post('/theme/deltmember',function(req,res,next){
    let {uid,tid} = req.body;
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status != 0){
            res.json(result.json);
        }else{
           runSql(`delete from tmember where uid=? and tid=?`,[uid,tid],(result1)=>{
               res.json(result1);
           })
        }
    })
})
 /**
  * 删除主题
  * 请求方式：
  *     POST
  * 接收参数：
  *     tid：主题id
  * 返回参数：
  */
 router.post('/theme/deltheme',function(req,res,next){
    let {tid} = req.body;
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status !=0){
            res.json(result)
        }else{
            var length;
            runSql(`select * from tletter where tid=?`,[tid],(result4)=>{
                length = result4.data.length;
                if(length > 0){
                    runSql(`delete from tletter where tid=?`,[tid],(result2)=>{
                        runSql(`delete from tmember where tid=?`,[tid],(result3)=>{
                            runSql(`delete from theme where tid=?`,[tid],(result1)=>{
                                res.json(result1);
                        })
                    })
                })
                }else{
                    runSql(`delete from tmember where tid=?`,[tid],(result3)=>{
                        runSql(`delete from theme where tid=?`,[tid],(result1)=>{
                            res.json(result1);
                        })
                    })
                }
            })
        }
    })
})
 /**
 * 一起写修改信件内容()
 * 请求方式：
 *      POST
 * 接受参数：
 *      lid：信件id
 *      title:信件标题
 *      content：信件内容
 *      lday：信件修改后的日期
 *      ppid：信件背景
 * 返回参数：
 *      
 */
router.post('/theme/edit',function(req,res,next){
    let {lid,title,content,lday,ppid} = req.body;
    let token = req.header('token');
    // console.log(title,content);
    checkToken(token,(result) => {
        if(result.status !=0){
            res.json(result);
        }else{
            let uid =  result.data.uid;
            runSql(`update tletter set ltitle=?,lcontent=?,lday=?,ppid=? where lid=? and uid=? `,
                [title,content,lday,ppid,lid,uid],(result2)=>{
                res.json(result2);
            })
        }        
        })    
})
/**
 * 展示信件内容(编辑和展示用)
 * GET
 * 接收参数:
 *      lid:信件id
 * 
 */
router.get('/theme/show', function (req, res, next) {
    let {lid} = req.query;
    let token = req.header('token');
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {   
            runSql(`select * from tletter where lid=?`, [lid], (result) => {
                res.json(result);
            });
        }
    });
});
/**
 * 更换信纸
 * 请求方式：
 *      POST
 * 接收参数：
 *      lid：信件id
 *      ppid：更换后的信纸id
 */
router.post('/changebg',function(req,res,next){
    let token = req.header('token');
    let {lid,ppid} =  req.body;
    checkToken(token,(result)=>{
        if(result.status != 0){
            res.json(result)
        }else{
            runSql('update tletter set ppid=? where lid=? ',[ppid,lid],(result1)=>{
                res.json(result1);
            })
        }
    })
})
module.exports = router;