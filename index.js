const inquirer = require('inquirer');
const db = require('./db/connections');



var employeeTracker = function () {
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
        } else if (answers.prompt == 'View All Roles') {
            db.query(`SELECT * FROM role`, (err, result) => {
                if (err) throw err;
                console.log('Viewing All Roles: ');
                console.table(result);
                employeeTracker();
            });
        } else if (answers.prompt == 'View All Employees') {
            db.query(`SELECT * FROM employee`, (err, result) => {
                if (err) throw err;
                console.log('Viewing All Employees: ');
                console.table(result);
                employeeTracker();
            });
        } else if (answers.prompt == 'Add A Department') {
            inquirer.prompt([{
                //adding department
                type: 'input',
                name: 'Department',
                message: 'What departmentare you wanting to add?',
                validate: departmentAdded => {
                    if (departmentAdded) {
                        return true;
                    } else {
                        console.log('Please Add A Department');
                        return false;
                    }
                }
            }]).then((answers) => {
                db.query('INSERT INTO department (name) VALUES (?)', [answers.department], (err, result) => {
                    if (err) throw err;
                    console.log(`Added ${answers.department} to database.`)
                    employeeTracker();
                });
            })
        } else if (answers.prompt == 'Add A Role') {
            //acquire departments for choice from database via query
            db.query('SELECT * FROM department', (err, result) => {
                if (err) throw err;
                inquirer.prompt([
                    {
                        //adding role
                        type: 'input',
                        name: 'role',
                        message: 'Please enter the name of the role.',
                        validate: roleAdded => {
                            if (roleAdded) {
                                return true;
                            }else {
                                console.log('Please enter a role you want to add.');
                                return false;
                            }
                        }
                    },
                    {
                        //adding salary for role
                        type: 'input',
                        name: 'salary',
                        message: 'Please enter the salary of the role you just added.',
                        validate: salaryAdded => {
                            if (salaryAdded) {
                                return true;
                            }else {
                                console.log('Please enter a salary for the role you added.');
                                return false;
                            }
                        }
                    },
                    {
                        //adding department for role added
                        type: 'list',
                        name: 'department',
                        message: 'Please choose from list provided the department for the added role',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].name);
                            }
                            return array;
                        }
                    }
                ]).then((answerts) => {
                    //compare result and store as new variable
                    for (var)
                })
            })
        }
        

    })
};

employeeTracker();