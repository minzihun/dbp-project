var express = require("express");
var router = express.Router();
const { isLoggedIn, isAdmin } = require("./middlewares");

router.use(isLoggedIn, isAdmin);
// 경영진 - 직원검색
router.get("/searchEmployee", function (req, res, next) {
  res.render("manager/searchEmployee", { title: "searchEmployee" });
});

// 경영진 - 프로젝트검색
router.get("/manageAllProject", function (req, res, next) {
  res.render("manager/manageAllProject", { title: "manageAllProject" });
});

// 경영진 - 프로젝트 상세 페이지로 이동
router.get("/project/1", function (req, res, next) {
  res.render("manager/manProjectDetail", { title: "manProjectDetail" });
});

// 경영진 - 프로젝트 수정
router.get("/project/1/update", function (req, res, next) {
  res.render("manager/updateManProjectDetail", {
    title: "updateManProjectDetail",
  });
});

module.exports = router;
