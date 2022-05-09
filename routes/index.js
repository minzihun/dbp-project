var express = require('express');
var router = express.Router();
const {User} = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});

// 회원가입
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Signup' });
});

router.post('/signup', (req, res)=>{
  
})


//로그인
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

//마이페이지
router.get('/mypage', function(req, res, next) {
  res.render('mypage', { title: 'Mypage' });
});

// 마이페이지 수정
router.get('/updateMyInfo', (req, res, next) => {
  res.render('updateMyInfo', { title: 'Mypage' });
});


module.exports = router;
