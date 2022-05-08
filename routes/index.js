var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 회원가입
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Signup' });
});


//로그인
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});


module.exports = router;
