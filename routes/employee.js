var express = require("express");
var router = express.Router();
var { Project, Emp_Proj, Employee, Role } = require("../models");
var { isLoggedIn } = require("./middlewares");
const { isPM } = require("./middlewares");

router.use(isLoggedIn);
//프로젝트 등록 & PM 등록
router.post("/createProject", async (req, res, next) => {
  const { name, start_date, end_date, organization, budget } = req.body;
  console.log(name, start_date, end_date, organization, budget);
  try {
    //프로젝트 등록부분
    const new_proj = await Project.create({
      project_name: name,
      proj_start_date: start_date,
      proj_end_date: end_date,
      budget,
      project_organization: organization,
    });
    console.log(new_proj);
    //PM 등록부분
    const Role_id = 2;
    const proj_PM = await Emp_Proj.create({
      part_start_date: start_date,
      part_end_date: end_date,
      Role_id,
      Employee_number: req.user.id,
      Project_id: new_proj.id,
    });
    console.log(proj_PM);
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// 직원- 프로젝트 관리
router.get("/projectList", function (req, res, next) {
  res.render("employee/projectList", {
    title: "projectList",
    state: req.state,
  });
});

// 직원- 프로젝트 등록
router.get("/createProject", function (req, res, next) {
  res.render("employee/createProject", {
    title: "createProject",
    state: req.state,
  });
});

router.get("/pm/project/:id", async (req, res, next) => {
  try {
    const currentProj = await Project.findOne({ where: { id: req.params.id } });
    const employeeList = await Emp_Proj.findAll({
      include: [
        { model: Employee },
        { model: Project, where: { id: req.params.id } },
        { model: Role },
      ],
    });
    res.render("pm/pmProjectDetail", {
      title: "pmProjectDetail",
      currentProj,
      employeeList,
      totalEmp: employeeList.length,
      state: req.state,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});
// PM - 프로젝트 업데이트
router.get("/pm/project/:id/update", isPM, async function (req, res, next) {
  console.log("--------------------------");
  console.log(req.params.id);
  try {
    const currentProj = await Project.findOne({ where: { id: req.params.id } });
    const employeeList = await Emp_Proj.findAll({
      include: [
        { model: Employee },
        { model: Project, where: { id: req.params.id } },
        { model: Role },
      ],
    });
    const employees = employeeList.map((element) => {
      return element.Employee;
    });
    res.render("pm/updatePmProjectDetail", {
      title: "updatePmProjectDetail",
      currentProj,
      employeeList,
      totalEmp: employeeList.length,
      state: req.state,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
