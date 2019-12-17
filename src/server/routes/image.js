var express = require('express');
var router = express.Router();
var multer = require("multer");
const path = require('path');

const runSql = require('../mysql');
const { getTimestamp_13 } = require('../src/timer');
const { getToken, checkToken } = require('../src/token');
const getRandom = require('../src/user/verification');


const storage = multer.diskStorage({
    // 配置文件上传的位置
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/head'));
    },
    // 配置上传文件的名称（包含后缀）
    filename: (req, file, cb) => {
        // 文件后缀
        let ext = path.extname(file.originalname);
        cb(null, getTimestamp_13() + '_' + getRandom(2) + ext);
    }
});
const upload = multer({storage: storage});
router.post('/head', upload.any(), function (req, res, next) {
    let token = req.header('token');
    checkToken(token, (result) => {
        console.log(token);
        console.log(result);
        if (result.status === 0) {
            var filename = req.files[0].filename;
            runSql('update user set Uimage = ? where Uid = ?', [filename, result.data.uid], (result1) => {
                let jsonData = {...result1};
                jsonData.data.filename = filename;
                res.json(jsonData);
            });
        } else {
            res.json(result);
        }
    });
});


const storage1 = multer.diskStorage({
    // 配置文件上传的位置
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/head'));
    },
    // 配置上传文件的名称（包含后缀）
    filename: (req, file, cb) => {
        // 文件后缀
        let ext = path.extname(file.originalname);
        cb(null, getTimestamp_13() + '_' + getRandom(2) + ext);
    }
});
const upload1 = multer({storage: storage1});



router.post('/back', upload1.any(), function (req, res, next) {
    let token = req.header('token');
    checkToken(token, (result) => {
        console.log(token);
        console.log(result);
        if (result.status === 0) {
            var filename = req.files[0].filename;
            runSql('update user set Uimage = ? where Uid = ?', [filename, result.data.uid], (result1) => {
                let jsonData = {...result1};
                jsonData.data.filename = filename;
                res.json(jsonData);
            });
        } else {
            res.json(result);
        }
    });
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
            var filename = req.files[0].filename;
            runSql('insert into paper(ppimage) values(?)  ', [filename], (result1) => {
                let jsonData = {...result1};
                jsonData.data.filename = filename;
                res.json(jsonData);
            });

});
module.exports = router;