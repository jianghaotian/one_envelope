const mysql = require('mysql');
const mysqlconfig = require('../config').mysql;  // 引入mysql连接配置
const poolextend = require('./poolextend');  // 引入连接池配置

var pool = mysql.createPool(poolextend({}, mysqlconfig));  // 使用连接池，提升性能

function runSql(sql, data, callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log(1);
            console.log(err);
        } else {
            connection.query(sql, data, function(err, result) {
                if (err) {
                    console.log(2);
                    console.log(err);
                } else {
                    callback(result);
                }
                connection.release();
            });
        }
    });
}


runSql('insert into verification(vaccount, vtype, vcode) values (?,?,?)', ['jht@qw.com', 'email', '236547'], (result) => {
    console.log(result);
})

runSql('select * from verification', [], (result) => {
    console.log(result);
})

module.exports = runSql;

