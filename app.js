var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');

dotenv.config();

var indexRouter = require('./routes/index');
var employeeRouter = require('./routes/employee');
var managerRouter = require('./routes/manager');
const authRouter = require('./routes/auth');
const { sequelize } = require('./models');
const passportConfig = require('./passport');


var app = express();
passportConfig(); //패스포트 설정

app.set('views', './views')
app.set('view engine','pug')
sequelize.sync({force:false})
    .then(()=>{
        console.log('데이터베이스 연결 성공!')
    })
    .catch((err)=>{
        console.error(err);
    })

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false
    }
}));
app.use(passport.initialize());
app.use(passport.session());

//- Router
app.use('/', indexRouter);
app.use('/employee', employeeRouter);
app.use('/manager', managerRouter);
app.use('/auth',authRouter);

module.exports = app;
