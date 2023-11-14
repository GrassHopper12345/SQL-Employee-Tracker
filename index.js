const inquirer = require('inquirer');
const dbConnections = require('./db/connections');

db.connect(err => {
    if (err) throw error;
    console.log('Database connected successfully');
    employee_tracker();
})