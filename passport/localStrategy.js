const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const Employee = require("../models/employee");
const Manager = require("../models/manager");

module.exports = () => {
  passport.use(
    "employeeLocal",
    new localStrategy(
      {
        usernameField: "id",
        passwordField: "password",
      },
      async (id, password, done) => {
        try {
          const exEmp = await Employee.findOne({ where: { emp_ID: id } });
          if (exEmp) {
            // const admin = await Manager.findOne({
            //   where: { Employee_number: exEmp.id },
            // });
            const result = await bcrypt.compare(password, exEmp.emp_PW);
            if (result) {
              // if(admin){
              //     exEmp.isAdmin = true;
              // }else{
              //     exEmp.isAdmin = false;
              // }
              // console.log(admin);
              // console.log("------------------------------------------------------------")
              // console.log(exEmp.isAdmin);
              done(null, exEmp);
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다!" });
            }
          } else {
            done(null, false, { message: "가입되지 않은 회원입니다!" });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};

// module.exports = ()=>{
//     passport.use('managerLocal',new localStrategy({
//         usernameField:'id',
//     }, async(id,done)=>{
//         try{
//             const exEmp = await Employee.findOne({where: {emp_ID:id}});
//             const admin = await Manager.findOne({where:{Employee_number:exEmp.id}});
//             if(admin){
//                 done(null, admin)
//             }else{
//                 done(null, false, {message:'관리자가 아닙니다!!'})
//             }
//         }catch(error){
//             console.error(error);
//         }
//     }))
// }
