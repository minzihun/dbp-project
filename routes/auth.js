var express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const Employee = require('../models/employee');
var router = express.Router();

// 회원가입
router.post('/signin',isNotLoggedIn,async function(req, res, next) {
    const {id, password, name, resident_number, final_edu, skill, career, dept} = req.body;
    try{
        const exEmp = await Employee.findOne({where:{id}});
        if(exEmp){
            return res.redirect('/join?error=exist');
        }
        const hash = await bcrypt.hash(password, 12);
        await Employee.create({
            emp_ID:id, 
            emp_PW:hash,
            emp_name:name,
            emp_resident_number:resident_number,
            emp_final_edu:final_edu,
            skill,
            career,
            Dept_id:dept
        });
        return res.redirect('/');
    }catch(err){
        console.error(err);
        return next(err);
    }
    
});
  
  //로그인
router.post('/login', isNotLoggedIn, (req,res,next)=>{
    passport.authenticate('local',(authError, user, info)=>{
        if(authError){
            console.error(authError);
            return next(authError);
        }
        if(!user){
            return res.redirect(`/?loginError=${info.message}`)
        }
        return req.logIn(user,(loginError)=>{
            if(loginError){
                console.error('loginError');
                return next(loginError);
            }
            return res.redirect('/');
        })
    })(req,res,next);
})


//로그아웃
router.get('/mypage', isLoggedIn, (req,res)=>{
    req.logout();
    req.session.destroy();
    res.redirect('/');
})

//마이페이지
router.get('/mypage',isLoggedIn, function(req, res, next) {
    res.render('mypage', { title: 'Mypage' });
});

router.get('/mypage/update',isLoggedIn, function(req,res,next){
    res.render('updateMyInfo',{title:'UpdateMyInfo'})
})
  
module.exports = router;