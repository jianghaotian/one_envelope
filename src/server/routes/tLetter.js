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
            // runSql(`select * from theme where uid= ?`, [uid], (result1) => {
            //     for(var i=0;i<result1.data.length;i++){
            //         runSql(`select uid from tMember where tid=? `,[result1.data[i].Tid],(result2)=>{
            //             // console.log(result2.data.length);
            //             // console.log(result1.data[0]);
            //         })
            //     }
            // });
            // runSql(`select *  from theme,tmember where theme.uid=?`)
            runSql(`select distinct theme.* from theme,tmember where theme.uid=? and (theme.tid=tmember.tid) `,[uid],(result1) => {
                let obj={};
                obj=result1;
                console.log(obj);
                for(var i=0;i<result1.data.length;i++){
                    runSql(`select count(uid) from tmember where tid =?`,[result1.data[i].Tid],(result2) => {
                        obj.data['count(uid)'] = result2;
                        console.log(obj);
                    })
                }
            })
        }
    });
   
});

/**
 * 获取主题详情
 * 请求方式：
 *  GET
 * 接受参数：
 *      uid:用户id
 *      tid：主题id
 * 返回参数：
 *      tname：主题名称
 *      timage：主题图片
 *      tday：创建日期
 *      ltitle：信件标题
 *      lcontent:信件内容
 *      uid:写信id
 *      lday:信件创建日期
 */
router.get('/theme/:tid/showtheme',function(req,res,next){
    checkToken(token,(result)=>{
        // let {uid,tid} = req.query;
        let uid=1,tid=1;
        if(result.status != 0){
            res.json(result);
        }else{
            runSql(`select theme.tname,theme.timage,theme.tday,tletter.ltitle,tletter.lcontent,tletter.uid,tletter.lday from theme,tletter where theme.uid=? and theme.tid=? and (theme.tid=tletter.tid)`,
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
 *      uid:用户id
 *      tid:主题id
 * 返回参数：
 *      uid：成员id
 * http://localhost:3000/v1/together/theme/1/showtheme/member?uid=1&tid=2
 */
router.get("/theme/:id/showtheme/member",function(req,res,next){
    let{uid,tid} = req.query;
    runSql(`select tmember.uid from theme,tmember where theme.uid=? and theme.tid=? and (theme.tid=tmember.tid)`,[uid,tid],(result1) =>{
        res.json(result1);
    } )
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
    let { title, content,lday} = req.body;
    checkToken(token, (result) => {
        if(result.status != 0){
            res.json(result);
        }else{
            let tid = 1;
            let uid = result.data.uid;
            runSql(`insert into tletter(Ltitle, Lcontent, Uid,Lday,Tid) values (?,?,?,?,?)`, [title, content,uid,lday,tid],(result1)=>{
                res.json(result1);
            })
        }
    })
});

module.exports = router;