

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
        const message = encodeURIComponent('로그인한 상태입니다.');
        // res.redirect(`/?error=${message}`);
        // res.send(`<script type="text/javascript">document.location.herf="/";</script>`)

        // res.redirect(`/?error=${message}`,`<script type="text/javascript"> alert("${message}")</script>`);
        res.send(`<script type="text/javascript">window.location="/";alert('로그인한 상태입니다.');</script>`);
        // res.redirect('/');

        // res.send(`<script type="text/javascript"> alert("${message}")</script>`)

    }
}