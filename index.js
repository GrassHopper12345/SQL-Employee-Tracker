const inquirer = require('inquirer');
const dbConnections = require('./db/connections');

db.connect(err => {
    if (err) throw error;
    console.log('Database connected successfully');
    employeeTracker();
});

var employeeTracker = function() {
    inquirer.prompt([{
        type: 'list',
        name: 'prompt',
        message: 'What would you like to do?',
        Choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Log Out'] 
    }]).then((answers) => {
        // View all departments
        if (answers.prompt == 'View All Departments') {
            db.query('SELECT * FROM department', (err, result) => {
                if (err) throw err;
                console.log('Viewing All Departments: ');
                console.table(result);
                employeeTracker();
            });
        }else if (answers.prompt == 'View All Roles') {
            db.query(`SELECT * FROM role`, (err, result) => {
                if(err) throw err;
                console.log('Viewing All Roles: ');
                console.table(result);
                employeeTracker();
            });    
        }else if (answers.prompt == 'View All Employees') {
            db.query(`SELECT * FROM employee`, (err, result) => {
                if(err) throw err;
                console.log('Viewing All Employees: ');
                console.table(result);
                employeeTracker();
            });
        }else if (answers.prompt == 'Add A Department') {
            inquirer.prompt([{
                //adding department
                type: 'input',
                name: 'Department',
                message: 'What departmentare you wanting to add?',
                validate: departmentAdded => {
                    if (departmentAdded) {
                        return true;
                    }else {
                        console.log('Please Add A Department');
                        return false;
                }
                }
            }]).then((answers) => {
                
            }
        }    
        

        )
};