var express = require("express");
var router = express.Router();
const { Employee, Manager } = require("../models");
const { isLoggedIn } = require("./middlewares");
const { getUser, getDeptId } = require("./user");

var state;
/* GET home page. */
router.get("/", async function (req, res, next) {
  console.log(state);
  if (!req.user) {
    state = "beforeLogin";
  } else {
    const isAdmin = await Manager.findOne({
      where: { Employee_number: req.user.id },
    });
    if (isAdmin) {
      state = "manager";
    } else {
      state = "employee";
    }
  }
  res.render("index", { title: "Express", state });
});

//마이페이지
router.get("/mypage", isLoggedIn, function (req, res, next) {
  const current_user = getUser(req.user);
  console.log(current_user);
  console.log(current_user.emp_ID);
  const emp_ID = current_user.emp_ID;
  res.render("mypage", { title: "Mypage", state, current_user, emp_ID });
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
  try {
    const afterEmp = await Employee.update(
      { emp_name: name, emp_final_edu: final_edu, skill, career, Dept_id },
      { where: { id: req.user.id } }
    );
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//아이디 중복체크
router.post("/checkId", async (req, res, next) => {
  const id = req.body.rawID;
  if (id) {
    const exEmp = await Employee.findOne({ where: { emp_ID: id } });

    if (exEmp) {
      res.send("이미 있는 사용자입니다.");
    }
  }
});

//관리 미들웨어 확인용(지울 것)
const { isAdmin } = require("./middlewares");
const { Emp_Proj, Dept, Project, Role } = require("../models");
router.get("/isadmin", isLoggedIn, isAdmin, async (req, res, next) => {
  const participate = await Emp_Proj.findAll();
  const dept = await Dept.findAll();
  const project = await Project.findAll();
  const role = await Role.findAll();
  console.log(participate, dept, project, role);
  res.send(req.user);
});

module.exports = router;
