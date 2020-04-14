var express = require('express');
var router = express.Router();
var multer = require("multer");
const path = require('path');

const runSql = require('../mysql');
const { getTimestamp_13 } = require('../src/timer');
const { getToken, checkToken } = require('../src/token');
const getRandom = require('../src/user/verification');
var multiparty = require('multiparty');
var fs = require('fs');

/**
 * 头像上传
 */
router.post('/head', function(req, res){
    let token = req.header('token');
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else { 
            var form = new multiparty.Form();
            form.parse(req, function(err, fields, files){
                // console.log(req);
                // console.log(files);
                //将前台传来的base64数据去掉前缀
                var imgData = req.body.src.replace(/^data:image\/\w+;base64,/, '');
                var dataBuffer = new Buffer.from(imgData, 'base64');
                //写入文件
                var name = getTimestamp_13()+'_'+getRandom(2)+'.png';
                var picPath = path.join(__dirname,'../public/head/'+name);
                fs.writeFile(picPath, dataBuffer, function(err){
                    if(err){
                        console.log(err);
                        res.send(err);
                    }else{
                        res.send(name);
                    }
                });
            });
        }
    })
});
/**
 * 更换头像
 */
router.post('/changehead', function (req, res, next) {
    let {name} = req.body;
    let token = req.header('token');
    // console.log(token);
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {   
            let uid = result.data.uid;
            // let uid = 1;
            runSql(`update user set uimage=? where uid=?`, [name,uid], (result) => {
                res.json(result);
            });
        }
    });
});

/**
 * 上传主题图片
 */
router.post('/theme', function(req, res){
    // let token = req.header('token');
    // checkToken(token, (result) => {
    //     if (result.status !== 0) {
    //         res.json(result);
    //     } else {   
            var form = new multiparty.Form();
            form.parse(req, function(err, fields, files){
                //将前台传来的base64数据去掉前缀
                var imgData = req.body.imgData.replace(/^data:image\/\w+;base64,/, '');
                var dataBuffer = new Buffer.from(imgData, 'base64');
                //写入文件
                var name = getTimestamp_13()+'_'+getRandom(2)+'.png';
                var picPath = path.join(__dirname,'../public/theme/'+name);
                fs.writeFile(picPath, dataBuffer, function(err){
                    if(err){
                        res.send(err);
                    }else{
                        res.send(name);
                    }
                });
            });
    //     }
    // })

});


/**
 * 上传信纸
 * 请求方式：
 *      POST
 * 接受参数：
 *      
 */
const storage2 = multer.diskStorage({
    // 配置文件上传的位置
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/paper'));
    },
    // 配置上传文件的名称（包含后缀）
    filename: (req, file, cb) => {
        // 文件后缀
        let ext = path.extname(file.originalname);
        cb(null, getTimestamp_13() + '_' + getRandom(2) + ext);
    }
});
const upload2 = multer({storage: storage2});

router.post('/paper', upload2.any(), function (req, res, next) {
    let token = req.header('token');
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {   
            var filename = req.files[0].filename;
            runSql('insert into paper(ppimage) values(?)  ', [filename], (result1) => {
                let jsonData = {...result1};
                jsonData.data.filename = filename;
                res.json(jsonData);
            });
        }
    })
});

/**
 * 插入图片
 * 请求方式：
 *      POST
 * 接受参数：
 *      pid:信件id
 */
router.post('/insertImg', function(req, res){
    let token = req.header('token');
    let {pid} = req.body;
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {   
            var form = new multiparty.Form();
            form.parse(req, function(err, fields, files){
                //将前台传来的base64数据去掉前缀
                var imgData = req.body.imgData.replace(/^data:image\/\w+;base64,/, '');
                var dataBuffer = new Buffer.from(imgData, 'base64');
                //写入文件
                var name = getTimestamp_13()+'_'+getRandom(2)+'.png';
                var picPath = path.join(__dirname,'../public/insertimg/'+name);
                fs.writeFile(picPath, dataBuffer, function(err){
                    if(err){
                        res.send(err);
                    }else{
                        // let arr = [];
                        runSql('select insertImg from pletter where pid=?',[pid],(result)=>{
                            var img = result1.data[0].insertImg;
                            if(!img){
                                runSql('insert into pletter(insertImg) values(?) where pid=? ',[name,pid],(result1)=>{
                                    res.json(result1);
                                })
                            }else{
                                runSql('insert into pletter(insertImg) values(?) where pid=? ',[img+','+name,pid],(result1)=>{
                                    res.json(result1);
                                })
                            }
                        })
                        res.send(name);
                    }
                });
            });
        }
    })
});
module.exports = router;