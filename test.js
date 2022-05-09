const express = require('express');
const app = express()
const {Employee} = require('./models');
const {Dept} = require('./models');
const {Manager} = require('./models');
const {Project} = require('./models');
const {Role} = require('./models');
const {Emp_Proj} = require('./models');

const {sequelize} = require('./models');
sequelize.sync({force:false})
    .then(()=>{
        console.log('데이터베이스 연결 성공')
    })
    .catch((err)=>{
        console.error(err)
    })

app.set('port', 3001);
app.listen(app.get('port'),()=>{
    console.log('3001번 포트에서 대기 중')



})

app.get('/', async (req,res)=>{
    const emps = await Employee.findAll({});
    const depts = await Dept.findAll({});
    const managers = await Manager.findAll({});
    const projs = await Project.findAll({});

    const emp_projs = await Emp_Proj.findAll({});
    const roles = await Role.findAll({});
    console.log(emps);
    console.log('--------------------------');
    console.log(depts);
    console.log('--------------------------');
    console.log(managers);
    console.log('--------------------------');
    console.log(projs);
    console.log('--------------------------');
    console.log(emp_projs);
    console.log('--------------------------');
    console.log(roles);
    console.log('--------------------------');
    res.end();
})