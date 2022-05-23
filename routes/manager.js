var express = require("express");
var router = express.Router();
const { isLoggedIn, isAdmin } = require("./middlewares");
const { Project, Emp_Proj, Employee, Role, Dept } = require("../models");
const { Op } = require("sequelize");

// 요구사항 4번) 경영진은 일반직원과는 다르게
// 타 직원들의 정보를 검색할 수 있는 권한이 있어야 한다.
router.use(isLoggedIn, isAdmin);

// 경영진 - 직원 정보 검색
router.get("/searchEmployee", async (req, res, next) => {
  try {
    const initemp = await Employee.findAll({
      include: [{ model: Dept }],
    });
    res.render("manager/searchEmployee", {
      title: "searchEmployee",
      state: req.state,
      result: initemp,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// 경영진 - 직원 프로젝트 이력 열람
router.post("/searchEmployeeProject", async (req, res, next) => {
  var selected_search_key = req.body.selected_search_key;
  var search_key = req.body.search_key;
  console.log(selected_search_key, search_key);

  if (selected_search_key == "id") {
    try {
      const initemp = await Employee.findOne({
        where: [{ id: search_key }],
        include: [{ model: Dept }],
      });
      const proj_all = await Emp_Proj.findAll({
        include: [
          { model: Employee, where: { id: search_key } },
          { model: Project },
          { model: Role },
        ],
      });
      res.render("manager/searchEmployeeProject", {
        title: "searchEmployeeProject",
        state: req.state,
        result: initemp,
        result2: proj_all,
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  } else {
    try {
      const initemp = await Employee.findOne({
        where: [{ emp_name: search_key }],
        include: [{ model: Dept }],
      });
      const proj_all = await Emp_Proj.findAll({
        include: [
          { model: Employee, where: { emp_name: search_key } },
          { model: Project },
          { model: Role },
        ],
      });
      res.render("manager/searchEmployeeProject", {
        title: "searchEmployee",
        state: req.state,
        result: initemp,
        result2: proj_all,
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }
});

// 요구사항 6번) 경영진은 관리페이지를 통해 각 프로젝트 진행 상황 관리를 할 수 있다.
// 경영진 - 프로젝트검색
router.get("/manageAllProject", async function (req, res, next) {
  const projList = await Project.findAll();
  res.render("manager/manageAllProject", {
    title: "manageAllProject",
    state: req.state,
    result: projList,
  });
});

// 요구사항 7번) 경영진은 관리 페이지에서 기간을 입력하여
// 그 기간 내에 진행되었던 프로젝트를 볼 수 있다.
router.post("/manageAllProject", async function (req, res, next) {
  let { start_date, end_date } = req.body;
  start_date = new Date(start_date);
  end_date = new Date(end_date);

  const projList = await Project.findAll({
    where: {
      proj_start_date: { [Op.gte]: start_date },
      proj_end_date: { [Op.lte]: end_date },
    },
  });
  res.render("/manager/manageAllProject", {
    title: "manageAllProject",
    result: projList,
    state: req.state,
  });
});

// 경영진 - 프로젝트 상세 페이지로 이동
router.get("/project/:id", async function (req, res, next) {
  try {
    const currentProj = await Project.findOne({ where: { id: req.params.id } });
    const employeeList = await Emp_Proj.findAll({
      include: [
        { model: Employee },
        { model: Project, where: { id: req.params.id } },
        { model: Role },
      ],
    });
    res.render("manager/manProjectDetail", {
      title: "manProjectDetail",
      state: req.state,
      currentProj,
      employeeList,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});


// 경영진 - 프로젝트 수정
router.get("/project/:id/update", async function (req, res, next) {
  try {
    const currentProj = await Project.findOne({ where: { id: req.params.id } });
    const employeeList = await Emp_Proj.findAll({
      include: [
        { model: Employee },
        { model: Project, where: { id: req.params.id } },
        { model: Role },
      ],
    });
    res.render("manager/updateManProjectDetail", {
      title: "updateManProjectDetail",
      state: req.state,
      currentProj,
      employeeList,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// 요구사항 12번) 경영진은 프로젝트 예산을 조정할 수 있다.
router.post("/project/:id/update", async (req, res, next) => {});
module.exports = router;
