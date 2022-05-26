const passport = require("passport");
const local = require("./localStrategy");
const { Employee, Manager } = require("../models");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    Employee.findOne({ include: [{ model: Manager }], where: { id } })
      .then(async (user) => {
        done(null, user);
      })
      .catch((err) => done(err));
  });

  local();
};
