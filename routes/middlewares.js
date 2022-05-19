const { Manager } = require("../models");
const { Emp_Proj } = require("../models");

/*회원가입, 로그인, 로그아웃 라우터*/
//로그인한 사용자는 회원가입과 로그인 라우터에 접근 불가
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    // res.status(403).send("로그인 필요");
    res
      .status(403)
      .send(
        `<script type="text/javascript">window.location="/";alert('로그인이 필요합니다.');</script>`
      );
  }
};
//로그인하지 않은 사용자는 로그아웃 라우터에 접근 불가
//로그인 중이면 req.isAuthenticated()==true, 아니면 false
exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    // const message = encodeURIComponent('로그인한 상태입니다.');
    res.send(
      `<script type="text/javascript">window.location="/";alert('로그인한 상태입니다.');</script>`
    );

    // res.redirect(`/?error=${message}`);
    // res.redirect('/');
  }
};

// //관리자확인
// exports.isAdmin = (req, res, next) => {
//   if (req.user.isAdmin) {
//     next();
//   } else {
//     res.send(
//       `<script type="text/javascript">window.location="/";alert('관리자가 아닙니다.');</script>`
//     );
//   }
// };

exports.isAdmin = async (req, res, next) => {
  // req.flash('errors', {login:"You don't have permission"});
  // req.logout();
  // res.redirect('/');
  console.log("====================================");
  console.log(req.user.id);
  const exManager = await Manager.findOne({
    where: { Employee_number: req.user.id },
  });

  if (exManager) {
    next();
  } else {
    res.send(
      `<script type="text/javascript">window.location="/";alert('관리자가 아닙니다.');</script>`
    );
  }
};

exports.isPM = async (req, res, next) => {
  const exPM = await Emp_Proj.findOne({
    where: {
      Role_id: 2,
      Employee_number: req.user.id,
      Project_id: req.params.Project_id,
    },
  });
  if (exPM) {
    next();
  } else {
    res.send('<script type="text/javascript">alert("PM이 아닙니다.");');
  }
};

exports.getState = async (req, res, next) => {
  if (!req.user) {
    req.state = "beforeLogin";
  } else {
    const isAdmin = await Manager.findOne({
      where: { Employee_number: req.user.id },
    });
    if (isAdmin) {
      req.state = "manager";
    } else {
      req.state = "employee";
    }
  }
  next();
};
