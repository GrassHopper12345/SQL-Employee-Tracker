const inquirer = require('inquirer');
const db = require('./db/connections');



var employeeTracker = function () {
    inquirer.prompt([{
        type: 'list',
        name: 'prompt',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Log Out']
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
                name: 'department',
                message: 'What department are you wanting to add?',
                validate: departmentAdded => {
                    if (departmentAdded) {
                        return true;
                    } else {
                        console.log('Please Add A Department');
                        return false;
                    }
                }
            }]).then((answers) => {
                console.log(answers);
                db.query('INSERT INTO department (name) VALUES (?)', [answers.department], (err, result) => {
                    if (err) throw err;
                    console.log(`Added ${answers.department} to database.`)
                    employeeTracker();
                });
            })
        } else if (answers.prompt == 'Add A Role') {
            //acquire departments for choice from database via query
            db.query('SELECT * FROM department', (err, results) => {
                if (err) throw err;
                console.log(results);
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
                        //adding department for role added?????????????????????????????????????????????????????????????
                        type: 'list',
                        name: 'department',
                        message: 'Please choose from list provided the department for the added role',
                        choices: results.map(results => ({
                            name: `${results.name}`,
                            value: results.id,
                        })),
                    }
                ]).then((answers) => {
                    //compare result and store as new variable
                    var department = results.find(result => result.name === answers.department);
                    db.query(`INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`, [answers.role, answers.salary, answers.department_id], (err, results) => {
                        if (err) throw err;

                        console.log(`Added ${answers.role} to the database`);
                        employeeTracker();
                    });
                });
            });
        } else if (answers.prompt === 'Add An Employee') {
            // acquire role and managers from database via a query
            db.query(`SELECT * FROM role`, (err, roles) => {
                if (err) throw err;
                console.log(roles);
                db.query('SELECT * FROM employee', (err, managers) => {
                    if (err) throw err;
                    console.log(managers);

                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'firstName',
                            message: "Please enter the employee's first name.",
                            validate: firstNameAdded => {
                                if (firstNameAdded) {
                                    return true;
                                } else {
                                    console.log("Please enter the employee's first name.");
                                    return false;
                                }
                            },
                        },
                        {
                            type: 'input',
                            name: 'lastName',
                            message: "Please enter the employee's last name.",
                            validate: lastNameAdded => {
                                if (lastNameAdded) {
                                    return true;
                                } else {
                                    console.log("Please enter the employee's last name");
                                    return false;
                                }
                            },
                        },
                        {
                            type: 'list',
                            name: 'role_id',
                            message: "Please choose the employee's role.",
                            choices: roles.map(roles => ({
                                name: roles.title,
                                value: roles.id,
                            })),
                        },
                        {
                            type: 'list',
                            name: 'manager_id',
                            message: "Please choose the employee's manager.",
                            choices: managers.map(managers => ({
                                name: `${managers.first_name} ${managers.last_name}`,
                                value: managers.id,
                            })),
                        },
                    ])
                        .then(answers => {
                            console.log(answers);
                            db.query(
                                'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
                                [answers.firstName, answers.lastName, answers.role_id, answers.manager_id],
                                (err, result) => {
                                    if (err) throw err;
                                    console.log(answers);
                                    console.log(`Added ${answers.firstName} ${answers.lastName} to the database.;`)

                                    employeeTracker();
                                }
                            );
                        });
                });
            });
        } else if (answers.prompt === 'Update An Employee Role') {
            // acquire roles and managers from database
            db.query(`SELECT * FROM employee`, (err, result) => {
                if (err) throw err;
                console.log(result);
                db.query(`SELECT * FROM role`, (err2, role) => {
                    if (err2) throw err2;
                    inquirer.prompt([
                        {
                            //choosing employee to update
                            type: 'list',
                            name: 'employee',
                            message: 'Please select an employee you would like to update',
                            choices: result.map(result => ({
                                name: `${result.first_name} ${result.last_name}`,
                                value: result.id,
                            })),

                        },
                        {
                            //updating the new role in database
                            type: 'list',
                            name: 'role',
                            meesage: 'Please choose from the provided list the role of the new employee.',
                            choices: role.map(role => ({
                                name: `${role.title}`,
                                value: role.id,
                            })),
                        }
                    ]).then((answers) => {
                        // compare result and store in new variable
                        for (var i = 0; i < result.length; i++) {
                            if (result[i].id === answers.employee) {
                                var eId = result[i].id;
                            }
                        }
                        for (var i = 0; i < role.length; i++) {
                            if (role[i].id === answers.role) {
                                var r = role[i].id;
                        }
                        }
                        console.log(eId, r);
                        db.query(`UPDATE employee SET ? WHERE ?`, [{ role_id: r }, { id: eId }], (err, result) => {
                            if (err) throw err;
                            console.log(answers);
                            console.log(`Updated ${answers.employee} role to the database.`);
                            employeeTracker();
                        });
                    })
                });
            });
        } else if (answers.prompt === 'Log Out') {
            db.end();
            console.log('You are now logged out, Good-Bye!');
        }
    })
};

employeeTracker();