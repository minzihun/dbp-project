var express = require('express');
var router = express.Router();
const Employee = require('../models/employee');


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('======================================================')
  // console.log(req.user);
  var state = '';
  if(!(req.user)){
    state = 'beforeLogin'
  }else{
    var {isAdmin} = req.user;
    if(isAdmin){
      state = 'management';
    }else{
      state = 'developer';
    }
  }
  console.log(state);
  res.render('index', { title: 'Express', state });
});

// // 회원가입
// router.get('/signup', function(req, res, next) {
//   res.render('signup', { title: 'Signup' });
// });

// router.post('/signup', (req, res)=>{
  
// })


// //로그인
// router.get('/login', function(req, res, next) {
//   res.render('login', { title: 'Login' });
// });

//마이페이지
router.get('/mypage', function(req, res, next) {
  res.render('mypage', { title: 'Mypage' ,state});
});

// 마이페이지 수정
router.get('/updateMyInfo', (req, res, next) => {
  res.render('updateMyInfo', { title: 'Mypage',state });
});


//관리 미들웨어 확인용(지울 것)
const {isAdmin} = require('./middlewares');
router.get('/isadmin', isAdmin, (req,res,next)=>{
  res.send(req.user);
})

//데이터 확인용(지울 것)
const {Dept} = require('../models');
const {Emp_Proj} = require('../models');
const {Manager} = require('../models');
const {Project} = require('../models');
const {Role} = require('../models');

module.exports = router;
