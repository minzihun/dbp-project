var express = require('express');
var router = express.Router();


// 직원- 프로젝트 관리
router.get('/myprojects', function(req, res, next) {
    res.render('employee/myprojects', { title: 'myprojects' });
  });

// 직원- 프로젝트 등록
router.get('/createProject', function(req, res, next) {
    res.render('employee/createProject', { title: 'createProject' });
  });
  

module.exports = router;