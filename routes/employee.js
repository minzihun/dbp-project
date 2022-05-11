var express = require('express');
var router = express.Router();

// 직원- 프로젝트 관리
router.get('/projectList', function(req, res, next) {
    res.render('employee/projectList', { title: 'projectList' });
  });

// 직원- 프로젝트 등록
router.get('/createProject', function(req, res, next) {
    res.render('employee/createProject', { title: 'createProject' });
  });

 // PM - 프로젝트 상세
router.get('/pm/project/1', function(req, res, next) {
  res.render('pm/pmProjectDetail', { title: 'pmProjectDetail' });
});

module.exports = router;