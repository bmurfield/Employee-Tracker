const inquirer = require('inquirer');
const Queries = require('./queries'); // Adjust the path if necessary

const startApp = async () => {
  try {
    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Update employee manager',
        'View employees by manager',
        'View employees by department',
        'Delete a department',
        'Delete a role',
        'Delete an employee',
        'View total utilized budget of a department',
        'Exit',
      ],
    });

    switch (action) {
      case 'View all departments':
        const departments = await Queries.getAllDepartments();
        console.table(departments.rows);
        break;

      case 'View all roles':
        const roles = await Queries.getAllRoles();
        console.table(roles.rows);
        break;

      case 'View all employees':
        const employees = await Queries.getAllEmployees();
        console.table(employees.rows);
        break;

      case 'Add a department':
        const { departmentName } = await inquirer.prompt({
          type: 'input',
          name: 'departmentName',
          message: 'Enter the name of the department:',
        });
        await Queries.addDepartment(departmentName);
        console.log(`Department '${departmentName}' added.`);
        break;

      case 'Add a role':
        const { roleTitle, roleSalary, departmentId } = await inquirer.prompt([
          {
            type: 'input',
            name: 'roleTitle',
            message: 'Enter the title of the role:',
          },
          {
            type: 'input',
            name: 'roleSalary',
            message: 'Enter the salary for this role:',
            validate: (input) => !isNaN(input) && parseFloat(input) > 0,
          },
          {
            type: 'input',
            name: 'departmentId',
            message: 'Enter the department ID this role belongs to:',
            validate: (input) => !isNaN(input),
          },
        ]);
        await Queries.addRole(roleTitle, parseFloat(roleSalary), parseInt(departmentId));
        console.log(`Role '${roleTitle}' added.`);
        break;

      case 'Add an employee':
        const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
          {
            type: 'input',
            name: 'firstName',
            message: 'Enter the first name of the employee:',
          },
          {
            type: 'input',
            name: 'lastName',
            message: 'Enter the last name of the employee:',
          },
          {
            type: 'input',
            name: 'roleId',
            message: 'Enter the role ID for this employee:',
            validate: (input) => !isNaN(input),
          },
          {
            type: 'input',
            name: 'managerId',
            message: 'Enter the manager ID for this employee (leave blank if none):',
            validate: (input) => input === '' || !isNaN(input),
          },
        ]);
        await Queries.addEmployee(firstName, lastName, parseInt(roleId), managerId === '' ? null : parseInt(managerId));
        console.log(`Employee '${firstName} ${lastName}' added.`);
        break;

      case 'Update an employee role':
        const { employeeId, newRoleId } = await inquirer.prompt([
          {
            type: 'input',
            name: 'employeeId',
            message: 'Enter the employee ID to update:',
            validate: (input) => !isNaN(input),
          },
          {
            type: 'input',
            name: 'newRoleId',
            message: 'Enter the new role ID for this employee:',
            validate: (input) => !isNaN(input),
          },
        ]);
        await Queries.updateEmployeeRole(parseInt(employeeId), parseInt(newRoleId));
        console.log(`Employee ID ${employeeId} role updated.`);
        break;

      case 'Update employee manager':
        const { empId, newManagerId } = await inquirer.prompt([
          {
            type: 'input',
            name: 'empId',
            message: 'Enter the employee ID to update:',
            validate: (input) => !isNaN(input),
          },
          {
            type: 'input',
            name: 'newManagerId',
            message: 'Enter the new manager ID for this employee:',
            validate: (input) => !isNaN(input),
          },
        ]);
        await Queries.updateEmployeeManager(parseInt(empId), parseInt(newManagerId));
        console.log(`Employee ID ${empId} manager updated.`);
        break;

      case 'View employees by manager':
        const { managerID } = await inquirer.prompt({
          type: 'input',
          name: 'managerID',
          message: 'Enter the manager ID:',
          validate: (input) => !isNaN(input),
        });
        const employeesByManager = await Queries.getEmployeesByManager(parseInt(managerID));
        console.table(employeesByManager.rows);
        break;

      case 'View employees by department':
        const { depId } = await inquirer.prompt({
          type: 'input',
          name: 'depId',
          message: 'Enter the department ID:',
          validate: (input) => !isNaN(input),
        });
        const employeesByDepartment = await Queries.getEmployeesByDepartment(parseInt(depId));
        console.table(employeesByDepartment.rows);
        break;

      case 'Delete a department':
        const { deleteDepId } = await inquirer.prompt({
          type: 'input',
          name: 'deleteDepId',
          message: 'Enter the department ID to delete:',
          validate: (input) => !isNaN(input),
        });
        await Queries.deleteDepartment(parseInt(deleteDepId));
        console.log(`Department ID ${deleteDepId} deleted.`);
        break;

      case 'Delete a role':
        const { deleteRoleId } = await inquirer.prompt({
          type: 'input',
          name: 'deleteRoleId',
          message: 'Enter the role ID to delete:',
          validate: (input) => !isNaN(input),
        });
        await Queries.deleteRole(parseInt(deleteRoleId));
        console.log(`Role ID ${deleteRoleId} deleted.`);
        break;

      case 'Delete an employee':
        const { deleteEmployeeId } = await inquirer.prompt({
          type: 'input',
          name: 'deleteEmployeeId',
          message: 'Enter the employee ID to delete:',
          validate: (input) => !isNaN(input),
        });
        await Queries.deleteEmployee(parseInt(deleteEmployeeId));
        console.log(`Employee ID ${deleteEmployeeId} deleted.`);
        break;

      case 'View total utilized budget of a department':
        const { budgetDepId } = await inquirer.prompt({
          type: 'input',
          name: 'budgetDepId',
          message: 'Enter the department ID to view its budget:',
          validate: (input) => !isNaN(input),
        });
        const budget = await Queries.getDepartmentBudget(parseInt(budgetDepId));
        console.log(`Total utilized budget for department ID ${budgetDepId}: $${budget.rows[0].total_budget}`);
        break;

      case 'Exit':
        console.log('Goodbye!');
        process.exit();
    }

    // Start the app again after the current action
    startApp();
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

// Initialize the application
startApp();
