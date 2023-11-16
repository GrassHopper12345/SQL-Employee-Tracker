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
                            } else {
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
                            } else {
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
                ]).then((answers) => {
                    //compare result and store as new variable
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].name === answers.department) {
                            var department = result[i];
                        }
                    }
                    db.query(`INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`, [answers.role, answers.salary, answers.department.id], (err, results) => {
                        if (err) throw err;
                        console.log(`Added ${answers.role} to the database`);
                        employeeTracker();
                    });
                })
            });
        } else if (answers.prompt === 'Add A Employee') {
            // acquire role and managers from database via a query
            db.query(`SELECT * FROM employee, role`, (err, result) => {
                if (err) throw err;
                inquirer.prompt([
                    {
                        //add employee first name
                        type: 'input',
                        name: 'firstName',
                        message: `Please enter the employee's first name.`,
                        validate: firstNameAdded => {
                            if (firstNameAdded) {
                                return true;
                            } else {
                                console.log(`Please enter the employee's first name.`);
                                return false;
                            }
                        }
                    },
                    {
                        //add employee last name
                        type: 'input',
                        name: 'lastName',
                        message: `Please enter the employee's last name.`,
                        validate: lastNameAdded => {
                            if (lastNameAdded) {
                                return true;
                            } else {
                                console.log(`Please enter the employee's last name`);
                                return false;
                            }
                        }
                    },
                    {
                        //add an employees role
                        type: 'list',
                        name: 'role',
                        messsage: `Please choose from the list provided the employee's role.`,
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].title);
                            }
                            var newArray = [...new Set(array)];
                            return newArray;
                        }
                    },
                    {
                        //adding manager for added employee
                        type: 'input',
                        name: 'manager',
                        message: `Please add the employee's manager`,
                        validate: managerAdded => {
                            if (managerAdded) {
                                return true;
                            } else {
                                console.log(`Please enter the employee's manager`);
                                return false;
                            }
                        }
                    }
                ]).then((answers) => {
                    // compare result and store in new variable
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].title === answers.role) {
                            var role = result[i];
                        }
                    }
                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`, [answers.firstName, answers.lastName, role.id, answers.manager.id], (err, result) => {
                        if (err) throw err;
                        console.log(`Added ${answers.firstName} ${answers.lastName} to database.`);
                        employeeTracker();
                    });
                })
            });
        } else if (answers.prompt === 'Update An Employee Role') {
            // acquire roles and managers from database
            db.query(`SELECT * FROM employee, role`, (err, result) => {
                if (err) throw err;
                inquirer.prompt([
                    {
                        //choosing employee to update
                        type: 'list',
                        name: 'employee',
                        message: 'Please select an employee you would like to update',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].last_name);
                            }
                            var employeeArray = { ...new Set(array) };
                            return employeeArray;
                        }
                    },
                    {
                        //updating the new role in database
                        type: 'list',
                        name: 'role',
                        meesage: 'Please choose from the provided list the role of the new employee.',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].title);
                            }
                            var roleAdded = { ...new Set(array) };
                            return roleAdded;
                        }
                    }
                ]).then((answers) => {
                    //compare result and store in new variable
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].last_name === answers.employee) {
                            var lastName = result[i];
                        }
                    }
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].title === answers.role) {
                            var role = result[i];
                        }
                    }
                    db.query(`UPDATE employee SET ? WHERE ?`, [{role_id: role}, {last_name: lastName}], (err, result) => {
                        if(err) throw err;
                        console.log(`Updated ${answers.employee} role to the database.`);
                        employeeTracker();
                    });
                })
            });
        }else if (answers.prompt === 'Log Out') {
            db.end();
            console.log('You are now logged out, Good-Bye!');
        }
    })
};

employeeTracker();