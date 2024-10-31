const db = require("./db");

const Queries = {
  // Retrieve all departments
  getAllDepartments: async () => {
    return db.query("SELECT * FROM department");
  },

  // Retrieve all roles with department names
  getAllRoles: async () => {
    const query = `
      SELECT role.id, role.title, role.salary, department.name AS department
      FROM role
      JOIN department ON role.department_id = department.id;
    `;
    return db.query(query);
  },

  // Retrieve all employees with role, department, salary, and manager details
  getAllEmployees: async () => {
    const query = `
      SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, 
             department.name AS department, role.salary, 
             CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM employee
      JOIN role ON employee.role_id = role.id
      JOIN department ON role.department_id = department.id
      LEFT JOIN employee AS manager ON employee.manager_id = manager.id;
    `;
    return db.query(query);
  },

  // Add a new department
  addDepartment: async (name) => {
    return db.query("INSERT INTO department (name) VALUES ($1) RETURNING *", [
      name,
    ]);
  },

  // Add a new role with a specific department ID
  addRole: async (title, salary, departmentId) => {
    return db.query(
      "INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *",
      [title, salary, departmentId]
    );
  },

  // Add a new employee with an optional manager ID
  addEmployee: async (firstName, lastName, roleId, managerId = null) => {
    return db.query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [firstName, lastName, roleId, managerId]
    );
  },

  // Update an employee's role by ID
  updateEmployeeRole: async (employeeId, roleId) => {
    return db.query(
      "UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *",
      [roleId, employeeId]
    );
  },

  // Get employees by department (optional feature)
  getEmployeesByDepartment: async (departmentId) => {
    const query = `
      SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department
      FROM employee
      JOIN role ON employee.role_id = role.id
      JOIN department ON role.department_id = department.id
      WHERE department.id = $1;
    `;
    return db.query(query, [departmentId]);
  },

  // Get employees by manager (optional feature)
  getEmployeesByManager: async (managerId) => {
    const query = `
      SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, 
             department.name AS department, role.salary
      FROM employee
      JOIN role ON employee.role_id = role.id
      JOIN department ON role.department_id = department.id
      WHERE employee.manager_id = $1;
    `;
    return db.query(query, [managerId]);
  },

  // Delete a department
  deleteDepartment: async (departmentId) => {
    return db.query("DELETE FROM department WHERE id = $1", [departmentId]);
  },

  // Delete a role
  deleteRole: async (roleId) => {
    return db.query("DELETE FROM role WHERE id = $1", [roleId]);
  },

  // Delete an employee
  deleteEmployee: async (employeeId) => {
    return db.query("DELETE FROM employee WHERE id = $1", [employeeId]);
  },

  // Calculate total utilized budget of a department
  getDepartmentBudget: async (departmentId) => {
    const query = `
      SELECT SUM(role.salary) AS total_budget
      FROM employee
      JOIN role ON employee.role_id = role.id
      WHERE role.department_id = $1;
    `;
    return db.query(query, [departmentId]);
  },
};

module.exports = Queries;
