var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log('======================================================')
  // console.log(req.user);
  res.render('index', { title: 'Express' });
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
  res.render('mypage', { title: 'Mypage' });
});

// 마이페이지 수정
router.get('/updateMyInfo', (req, res, next) => {
  res.render('updateMyInfo', { title: 'Mypage' });
});


//관리 미들웨어 확인용(지울 것)
const {isAdmin} = require('./middlewares');
router.get('/isadmin', isAdmin, (req,res,next)=>{
  res.send(req.user);
})

module.exports = router;
