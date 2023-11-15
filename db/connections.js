const mysql = require('mysql2');
require('dotenv').config();



const db = mysql.createConnection(
  {
    host:'localhost',
    user: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  console.log('Connection to database employeeTracker_db completed.')
);

module.exports = db;