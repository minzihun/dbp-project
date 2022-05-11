var express = require('express');
var router = express.Router();


// 경영진 - 직원검색
router.get('/searchEmployee', function(req, res, next) {
    res.render('manager/searchEmployee', { title: 'searchEmployee' });
  });

// 경영진 - 프로젝트검색
router.get('/manageAllProject', function(req, res, next) {
    res.render('manager/manageAllProject', { title: 'manageAllProject' });
  });
  
// 프로젝트 상세 페이지로 이동
router.get('/project/1', function(req, res, next) {
    res.render('manager/projectDetail', { title: 'projectDetail' });
  });

module.exports = router;