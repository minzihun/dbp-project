const passport = require('passport');
const local = require('./localStrategy');
const Employee = require('../models/employee');

module.exports = () =>{
    passport.serializeUser((user, done)=>{
        done(null, user.id)
    });
    passport.deserializeUser((id, done)=>{
        Employee.findOne({where:{id}})
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    local();
};