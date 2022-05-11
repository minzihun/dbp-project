

/*회원가입, 로그인, 로그아웃 라우터*/ 
//로그인한 사용자는 회원가입과 로그인 라우터에 접근 불가
exports.isLoggedIn = (req,res,next) => {
    if(req.isAuthenticated()){
        next();
    }else{
        res.status(403).send('로그인 필요');
    }
}
//로그인하지 않은 사용자는 로그아웃 라우터에 접근 불가
//로그인 중이면 req.isAuthenticated()==true, 아니면 false
exports.isNotLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        next();
    }else{
        // const message = encodeURIComponent('로그인한 상태입니다.');
        res.send(`<script type="text/javascript">window.location="/";alert('로그인한 상태입니다.');</script>`);
        
        // res.redirect(`/?error=${message}`);
        // res.redirect('/');

    }
}

// //관리자확인
exports.isAdmin = (req,res,next)=>{
    if(req.user.isAdmin){
        next();
    }else{
        res.send(`<script type="text/javascript">window.location="/";alert('관리자가 아닙니다.');</script>`);
        
    }
}



