const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'prompt',
    port:'3306',
    dateStrings:'date'
})

module.exports = connection;