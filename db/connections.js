const mysql2 = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'CharlieBear17!',
    databases: 'employee_tracker_db'
});

module.exports = db;