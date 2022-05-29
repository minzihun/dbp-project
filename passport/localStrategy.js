const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const { Employee } = require("../models");

module.exports = () => {
  passport.use(
    "local",
    new localStrategy(
      {
        usernameField: "id",
        passwordField: "password",
      },
      async (id, password, done) => {
        try {
          const exEmp = await Employee.findOne({ where: { emp_ID: id } });
          if (exEmp) {
            const result = await bcrypt.compare(password, exEmp.emp_PW);
            if (result) {
              done(null, exEmp);
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다" });
            }
          } else {
            done(null, false, { message: "가입되지 않은 회원입니다" });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
