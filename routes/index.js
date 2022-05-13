var express = require("express");
var router = express.Router();
const Employee = require("../models/employee");
const { isLoggedIn } = require("./middlewares");
const { getUser, getDeptId } = require("./user");

var state;
/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("======================================================");
  // console.log(req.user);
  if (!req.user) {
    state = "beforeLogin";
  } else {
    var { isAdmin } = req.user;
    if (isAdmin) {
      state = "management";
    } else {
      state = "developer";
    }
  }
  console.log(state);
  res.render("index", { title: "Express", state });
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
router.get("/mypage", isLoggedIn, function (req, res, next) {
  console.log(state);
  const current_user = getUser(req.user);
  res.render("mypage", { title: "Mypage", state, current_user });
});

// 마이페이지 수정 렌더
router.get("/updateMyInfo", isLoggedIn, (req, res, next) => {
  const current_user = getUser(req.user);
  res.render("updateMyInfo", { title: "Mypage", state, current_user });
});

//마이페이지 수정
router.post("/updateMyInfo", isLoggedIn, async (req, res, next) => {
  const { name, final_edu, skill, career, dept } = req.body;
  const Dept_id = getDeptId(dept);
  console.log("변화전", req.user);
  try {
    const afterEmp = await Employee.update(
      { emp_name: name, emp_final_edu: final_edu, skill, career, Dept_id },
      { where: { id: req.user.id } }
    );
    console.log("변화후", afterEmp);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//관리 미들웨어 확인용(지울 것)
const { isAdmin } = require("./middlewares");
router.get("/isadmin", isLoggedIn, isAdmin, (req, res, next) => {
  res.send(req.user);
});

//데이터 확인용(지울 것)
const { Dept } = require("../models");
const { Emp_Proj } = require("../models");
const { Manager } = require("../models");
const { Project } = require("../models");
const { Role } = require("../models");

module.exports = router;
