const Sequelize = require('sequelize');
const Dept = require('./dept');
const Employee = require('./employee');
const Project = require('./project');
const Role = require('./role');
const Emp_Proj = require('./emp_proj');
const Manager = require('./manager');


const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.Dept = Dept;;
db.Employee = Employee;
db.Project = Project;
db.Role = Role;
db.Emp_Proj = Emp_Proj;
db.Manager = Manager;

Dept.init(sequelize);
Employee.init(sequelize);
Project.init(sequelize);
Role.init(sequelize);
Emp_Proj.init(sequelize);
Manager.init(sequelize);

Dept.associate(db);
Employee.associate(db);
Project.associate(db);
Role.associate(db);
Emp_Proj.associate(db);
Manager.associate(db);

module.exports = db;
