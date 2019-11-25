var express = require('express');
var router = express.Router();

const runSql = require('../mysql');

router.get('/p', function (req, res, next) {
    let { account, type } = req.body;



});
