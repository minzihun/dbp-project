var express = require("express");
var router = express.Router();
const Employee = require("../models/employee");
const { isLoggedIn } = require("./middlewares");
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
router.get("/mypage", function (req, res, next) {
  console.log(state);
  res.render("mypage", { title: "Mypage", state });
});

// 마이페이지 수정 렌더
router.get("/updateMyInfo", (req, res, next) => {
  res.render("updateMyInfo", { title: "Mypage", state });
});

//마이페이지 수정
router.post("/updateMyInfo", isLoggedIn, async (req, res, next) => {
  const { name, final_edu, skill, career, dept } = req.body;
  let Dept_id;
  switch (dept) {
    case "개발 1팀":
      Dept_id = 1;
      break;
    case "개발 2팀":
      Dept_id = 2;
      break;
    case "개발 3팀":
      Dept_id = 3;
      break;
    default:
      Dept_id = 1;
      break;
  }
  try {
    await Employee.update(
      { emp_name: name, emp_final_edu: final_edu, skill, career, Dept_id },
      { where: { id: req.user.id } }
    );
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//관리 미들웨어 확인용(지울 것)
const { isAdmin } = require("./middlewares");
router.get("/isadmin", isAdmin, (req, res, next) => {
  res.send(req.user);
});

//데이터 확인용(지울 것)
const { Dept } = require("../models");
const { Emp_Proj } = require("../models");
const { Manager } = require("../models");
const { Project } = require("../models");
const { Role } = require("../models");

module.exports = router;
