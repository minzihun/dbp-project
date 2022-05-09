var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');

var indexRouter = require('./routes/index');
var employeeRouter = require('./routes/employee');
var managerRouter = require('./routes/manager');

dotenv.config();

var app = express();


app.set('views', './views')
app.set('view engine','pug')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//- Router
app.use('/', indexRouter);
app.use('/employee', employeeRouter);
app.use('/manager', managerRouter);

module.exports = app;
