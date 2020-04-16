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
 * 插入音频
 * 请求方式：
 *      POST
 * 接受参数：
 *      pid:信件id
 */
router.post('/insertMp3', function(req, res){
    let token = req.header('token');
    let {pid} = req.body;
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {   
            var form = new multiparty.Form();
            form.parse(req, function(err, fields, files){
                //将前台传来的base64数据去掉前缀
                var musicData = req.body.mp3Data.replace(/^data:audio\/\w+;base64,/,"");;
                var dataBuffer = new Buffer.from(musicData, 'base64');
                //写入文件
                var name = getTimestamp_13()+'_'+getRandom(2)+'.mp3';
                var musicPath = path.join(__dirname,'../public/music/'+name);
                fs.writeFile(musicPath, dataBuffer, function(err){
                    if(err){
                        res.send(err);
                    }else{
                        runSql('select music from pletter where pid=?',[pid],(result1)=>{
                            var mp3 = result1.data[0].music;
                            if(mp3==null){
                                runSql('update pletter set music=? where pid=? ',[name,pid],(result2)=>{
                                    // res.json(result2);
                                })
                            }else{
                                runSql('update pletter set music=? where pid=? ',[mp3+','+name,pid],(result3)=>{
                                    // res.json(result3);
                                })
                            }
                            res.json({status: 0, data: [name]});
                        })
                    }
                });
            });
        }
    })
});
/**
 * 展示插入音频
 * 请求方式：
 *      GET
 * 接受参数：
 *      pid：信件id
 * 返回参数：
 *      
 */
router.get('/showmusic',function(req,res){
    let token = req.header('token');
    let {pid} = req.query;
    checkToken(token,(result)=>{
        if(result.status !== 0) {
            res.json(result);
        }else{ 
            runSql('select music from pletter where pid=?',[pid],(result1)=>{
                var music = result1.data[0].music;
                if(music == null){
                    res.json(result1)
                }else{
                    var mp3 = music.split(",")
                    // res.send(mp3);
                    res.json({status: 0, data: mp3});
                }
            })
        }
    })
})
module.exports = router;