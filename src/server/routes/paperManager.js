var express = require('express');
var router = express.Router();

const runSql = require('../mysql');

/**
 * 获取信纸数量
 */
router.get('/getpaper',function(req,res,next){
    runSql(`select count(*) as num from paper`,[],(result)=>{
        console.log(result)
        res.json(result);
    })
})
/**
 * 展示信纸列表
 * 
 */
router.get('/paperlist',function(req,res,next){
    runSql(`select * from paper`,[],(result)=>{
        res.json(result);
    })
})
/**
 * 删除信纸
 */
router.post('/delpaper',function(req,res,next){
    let {ppid} = req.body;
    runSql(`delete from paper where ppid=?`,[ppid],(result)=>{
        
    })
})
module.exports = router;