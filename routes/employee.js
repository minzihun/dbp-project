var express = require("express");
var router = express.Router();
var { Project, Emp_Proj, Employee, Role } = require("../models");
var { isLoggedIn } = require("./middlewares");
const { isPM } = require("./middlewares");

router.use(isLoggedIn);
// 요구사항 8번) PM은 프로젝트 등록 페이지를 통해
// 프로젝트 번호, 프로젝트명, 프로젝트 착수일자/종료일자, 발주처, 예산 등
// 프로젝트 정보를 저장할 수 있다.
//프로젝트 등록 & PM 등록
router.post("/createProject", async (req, res, next) => {
  const { name, start_date, end_date, organization, budget } = req.body;
  try {
    //프로젝트 등록부분
    const new_proj = await Project.create({
      project_name: name,
      proj_start_date: start_date,
      proj_end_date: end_date,
      budget,
      project_organization: organization,
    });
    //PM 등록부분
    const Role_id = 2;
    const proj_PM = await Emp_Proj.create({
      part_start_date: start_date,
      part_end_date: end_date,
      Role_id,
      Employee_number: req.user.id,
      Project_id: new_proj.id,
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// 직원- 프로젝트 관리
router.get("/projectList", (req, res, next) => {
  res.render("employee/projectList", {
    title: "projectList",
  });
});

// 직원- 프로젝트 등록
router.get("/createProject", (req, res, next) => {
  res.render("employee/createProject", {
    title: "createProject",
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
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});
// 요구사항 11번) PM은 프로젝트 정보를 수정할 수 있다.
// PM - 프로젝트 업데이트
router.get("/pm/project/:id/update", isPM, async (req, res, next) => {
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
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// 요구사항 11번)
router.post("/pm/project/:id/update", isPM, async (req, res, next) => {
  const {
    project_name,
    proj_start_date,
    proj_end_date,
    project_organization,
    budget,
    employee_id,
    employee_role,
  } = req.body;

  await Project.update(
    {
      project_name,
      proj_start_date,
      proj_end_date,
      budget,
      project_organization,
    },
    { where: { id: req.params.id } }
  );
  const employee_ids = employee_id.slice(1);
  let employee_roles = [];
  if (!Array.isArray(employee_role)) {
    employee_roles.push(employee_role);
  } else {
    employee_roles = employee_role;
  }
  employee_ids.forEach(async (element, index) => {
    let Role_id;
    switch (employee_roles[index]) {
      case "pl":
        Role_id = 3;
        break;
      case "analyst":
        Role_id = 4;
        break;
      case "designer":
        Role_id = 5;
        break;
      default:
        Role_id = 1;
    }
    const result = await Emp_Proj.update(
      { Role_id },
      {
        where: { Employee_number: element, Project_id: req.params.id },
      }
    );
  });
  res.redirect(`/employee/pm/project/${req.params.id}`);
});

module.exports = router;
