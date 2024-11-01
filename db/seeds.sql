-- Inserts department data into department table
INSERT INTO department (name) VALUES 
('Sales'),
('Engineering'),
('Finance'),
('Human Resources');

-- Inserts role data into role table
INSERT INTO role (title, salary, department_id) VALUES 
('Salesperson', 50000, 1),
('Engineer', 75000, 2),
('Accountant', 60000, 3),
('HR Specialist', 55000, 4),
('Manager', 85000, 1),
('Director', 100000, 2),
('Senior Engineer', 90000, 2),
('Finance Manager', 85000, 3);

-- Inserts employee data into employee table with popular NBA player names
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('LeBron', 'James', 5, NULL),
('Stephen', 'Curry', 7, NULL),
('Kevin', 'Durant', 2, 1),
('Giannis', 'Antetokounmpo', 2, 1),
('James', 'Harden', 1, 5),
('Kawhi', 'Leonard', 2, 5),
('Anthony', 'Davis', 1, 5),
('Damian', 'Lillard', 3, 8),
('Luka', 'Doncic', 2, 2),
('Joel', 'Embiid', 3, 8),
('Nikola', 'Jokic', 2, 2),
('Jayson', 'Tatum', 1, 6),
('Jimmy', 'Butler', 4, 6),
('Devin', 'Booker', 1, 6),
('Chris', 'Paul', 4, 1),
('Russell', 'Westbrook', 3, 8),
('Kyrie', 'Irving', 7, NULL),
('Klay', 'Thompson', 2, 2),
('Trae', 'Young', 1, 5),
('Zion', 'Williamson', 3, 8);
