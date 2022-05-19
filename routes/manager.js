var express = require("express");
var router = express.Router();
const { isLoggedIn, isAdmin } = require("./middlewares");

router.use(isLoggedIn, isAdmin);
// 경영진 - 직원검색
router.get("/searchEmployee", function (req, res, next) {
  res.render("manager/searchEmployee", {
    title: "searchEmployee",
    state: req.state,
  });
});

// // 경영진 - 직원검색
// // 직원 id나 이름 받아오고 /searchEmplyee/:name(id나 이름) 페이지로 redirect 해준다.
// router.post("/searchEmployee", function (req, res, next) {
//   const { selected_search_key, search_key } = req.body;
//   console.log(selected_search_key, search_key);
//   const result = ///
//     res.render("/employee", { result });
//   // res.render('manager/searchEmployee', { title: 'searchEmployee' });
// });

// // 경영진 - 직원 전체 목록, 검색된 직원 정보 + 프로젝트 내역
// router.get(
//   "/searchEmployee",
//   "/searchEmployee/:name",
//   function (req, res, next) {
//     // res.render('manager/searchEmployee', { title: 'searchEmployee' });

//     var name = req.params.name;
//     // id나 직원이름으로 들어온 url이면 해당 직원정보(직원번호, 부서명, 이름, 최종학력, 기술, 경력)랑 프로젝트정보(프로젝트명, 역할, 예산, 발주처, 시작일, 종료일) 데이터 보내줌
//     if (name) {
//     } else {
//       // 초기화면은 전체 직원정보(직원번호, 부서명, 이름, 최종학력, 기술, 경력) 데이터 보내줌
//     }
//   }
// );

// 경영진 - 프로젝트검색
router.get("/manageAllProject", function (req, res, next) {
  res.render("manager/manageAllProject", {
    title: "manageAllProject",
    state: req.state,
  });
});

// 경영진 - 프로젝트 상세 페이지로 이동
router.get("/project/1", function (req, res, next) {
  res.render("manager/manProjectDetail", {
    title: "manProjectDetail",
    state: req.state,
  });
});

// 경영진 - 프로젝트 수정
router.get("/project/1/update", function (req, res, next) {
  res.render("manager/updateManProjectDetail", {
    title: "updateManProjectDetail",
    state: req.state,
  });
});

module.exports = router;
