//sql.js
// SQL语句封裝
var user = {
    insert:'INSERT INTO user(id, name, age) VALUES(?,?,?)',
    update:'UPDATE user SET name=?, age=? WHERE id=?',
    delete: 'DELETE FROM user WHERE id=?',
    queryById: 'SELECT * FROM user WHERE id=?',
    queryAll: 'SELECT * FROM user'
};
module.exports = user;