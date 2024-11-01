# Employee-Tracker

## Description

A command-line application to manage a company's employee database, using Node.js, Inquirer, and PostgreSQL.

Developers frequently have to create interfaces that allow non-developers to easily view and interact with information stored in databases. These interfaces are called content management systems (CMS). Your assignment this week is to build a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and PostgreSQL.

* Wanted to make a content management system to store employee information
* The app creates a node.js file in the terminal to track and sort many different aspects of an employee roster.
* Throughout this project I refined my skills with Node and Inquirer. This was also my first project using PostgreSQL to create and add information to tables.


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

Files can be cloned from my github repository. Run 'npm i' to install the decessary Node apps to make the tracker work. Then log into PostgreSQL with 'psql -U postgres'. Then enter your password. This can be altered in the .env file. Mine is provided there for ease of use. Next run the schema.sql file to create the database. This is done with '\i /db/schema.sql'. To add employees to the table run the seeds.sql file with '\i /db/seeds.sql'. Lastly to run the inquirer node app exit out of PostgreSQL with '\q' and type 'node src/app.js'. 

## Usage

Program can be used to track employee names, role, department, salary and managerial status. There are also commands to find total salaries of departments, add and delete employees and update employee data.

## Credits

I referenced code from SQL activities in edX's full stack bootcamp.
I also used OpenAI to supply the database of employees for the seeds.sql file.

## License

MIT License is listed in LICENSE file

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Examples

Here is a link to a video of the application in action:
https://drive.google.com/file/d/1QSP--g46zwBK4WHn6F_H1Tck3aKoFhvK/view?usp=sharing

## How to Contribute

Reach out to me to collaborate using my [Github](https://github.com/bmurfield) or
email me at bmurfield@gmail.com.


