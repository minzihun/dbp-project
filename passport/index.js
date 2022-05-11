const passport = require('passport');
const local = require('./localStrategy');
const Employee = require('../models/employee');
const Manager = require('../models/manager');

module.exports = () =>{
    passport.serializeUser((user, done)=>{
        done(null, user.id)
    });
    passport.deserializeUser((id, done)=>{
        Employee.findOne({where:{id}})
            .then(async user => {
                const admin = await Manager.findOne({where:{Employee_number:id}});
                if(admin){
                    user.isAdmin = true;
                }else{
                    user.isAdmin = false;
                }
                done(null, user)
            })
            .catch(err => done(err));
    });

    local();
};