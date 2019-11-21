const mysql = require('mysql');
const mysqlconfig = require('../config').mysql;  // 引入mysql连接配置
const poolextend = require('./poolextend');  // 引入连接池配置

var pool = mysql.createPool(poolextend({}, mysqlconfig));  // 使用连接池，提升性能

function runSql(sql, data, callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log(1);
            let jsonData = {
                status: err.errno,
                message: err.sqlMessage,
                data: {
                    code: err.code
                }
            }
            callback(jsonData);
        } else {
            connection.query(sql, data, function(err, result) {
                if (err) {
                    console.log(2);
                    let jsonData = {
                        status: err.errno,
                        message: err.sqlMessage,
                        data: {
                            sql: err.sql,
                            code: err.code
                        }
                    }
                    callback(jsonData);
                } else {
                    let jsonData = {
                        status: 0,
                        message: 'OK',
                        data: result
                    }
                    callback(jsonData);
                }
                connection.release();
            });
        }
    });
}


// runSql('insert into verification(vaccount, vtype, vcode) values (?,?,?)', ['jht@qswq.com', 'email', '236547'], (result) => {
//     console.log(result);
// })

// runSql('select * from verification', [], (result) => {
//     console.log(result);
// })

module.exports = runSql;

