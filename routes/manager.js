var express = require("express");
var router = express.Router();
const { isLoggedIn, isAdmin } = require("./middlewares");
const { Project, Emp_Proj, Employee, Role, Dept } = require("../models");
const { Op } = require("sequelize");

router.use(isLoggedIn, isAdmin);

// 경영진 - 직원 정보 검색
router.get("/searchEmployee", async (req, res, next) => {
  try{
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
router.post("/searchEmployeeProject", async (req, res, next) =>{
  var selected_search_key = req.body.selected_search_key;
  var search_key = req.body.search_key;
  console.log(selected_search_key, search_key);

  if (selected_search_key == "id") {
    try{
      const initemp = await Employee.findOne({
        where: [{ id: search_key }],
        include: [{ model: Dept }],
      });
      const proj_all = await Emp_Proj.findAll({
        include: [
          { model: Employee, where: {id: search_key}},
          { model: Project },
          { model: Role },
        ]
      });
      res.render("manager/searchEmployeeProject",{
        title: "searchEmployee",
        state: req.state,
        result: initemp,
        result2: proj_all,
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }

  } else {
    try{
      const initemp = await Employee.findOne({
        where: [{ emp_name: search_key }],
        include: [{ model: Dept }],
      });
      const proj_all = await Emp_Proj.findAll({
        include: [
          { model: Employee, where: {emp_name: search_key}},
          { model: Project },
          { model: Role },
        ]
      });
      res.render("manager/searchEmployeeProject",{
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

// 경영진 - 프로젝트검색
router.get("/manageAllProject", async function (req, res, next) {
  const projList = await Project.findAll();

  res.render("manager/manageAllProject", {
    title: "manageAllProject",
    state: req.state,
    result: projList,
  });
});

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

module.exports = router;
