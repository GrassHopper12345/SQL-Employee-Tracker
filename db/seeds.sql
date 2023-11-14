INSERT INTO department(name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role(title, salary, department_id)
VALUES
('Sales Lead', 100000, 1),
('Salesperson', 80000, 2),
('Lead Engineer', 150000, 3),
('Software Engineer',120000, 4),
('Account Manager', 160000, 5),
('Accountant', 125000, 6),
('Legal Team Lead', 250000, 7),
('Lawyer', 190000, 8);

INSERT INTO employee
(first_name, last_name, role_id, manager)
VALUES
(John, Doe, 1, null),
(Mike, Chan, 2, John Doe),
(Ashley, Rodriquez, 3, null),
(Kevin, Tupik, 4, Ashley Rodriguez),
(Kunal, Singh, 5, null),
(Malia, Brown, 6, Kunal Singh),
(Sarah, Lourd, 7, null),
(Tom, Allen, 8, Sarah Lourd);

