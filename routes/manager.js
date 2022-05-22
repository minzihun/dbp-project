var express = require("express");
var router = express.Router();
const { isLoggedIn, isAdmin } = require("./middlewares");
const { Project, Emp_Proj, Employee, Role, Dept } = require("../models");

router.use(isLoggedIn, isAdmin);

// 경영진 - 직원검색
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

// 요구사항 5번) 경영진은 관리 페이지에서 직원 검색을 통해 해당 직원의 과거 프로젝트 이력을 볼 수 있다.
// 특정 직원 검색(post): 검색한 직원에 대한 정보만 나옴. + 참여한 프로젝트 정보 표시
router.post("/searchEmployee", async (req, res, next) => {
  const { selected_search_key, search_key } = req.body;
  console.log(selected_search_key, search_key);
  if (selected_search_key == "id") {
    try {
      const employee = await Employee.findOne({
        where: {
          id: search_key,
        },
      });
      const result = await Emp_Proj.findAll({
        include: [
          {
            model: Employee,
            attribute: ["id"],
            where: { id: search_key },
          },
          {
            model: Project,
          },
          {
            model: Role,
          },
        ],
      });
      res.render("manager/searchEmployee", {
        title: "searchEmployee",
        employee,
        result,
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  } else {
    try {
      const employee = await Employee.findOne({
        where: {
          emp_name: search_key,
        },
      });
      const result = await Emp_Proj.findAll({
        include: [
          {
            model: Employee,
            attribute: ["id"],
            where: { id: employee.id },
          },
          {
            model: Project,
          },
          {
            model: Role,
          },
        ],
      });
      res.render("manager/searchEmployee", {
        title: "searchEmployee",
        employee,
        result,
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }
});

// 경영진 - 프로젝트검색
router.get("/manageAllProject", function (req, res, next) {
  res.render("manager/manageAllProject", {
    title: "manageAllProject",
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
