const { Sequelize } = require("sequelize");

module.exports = class Role extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        role_name: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Role",
        tableName: "Roles",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    // db.Role.belongsTo(db.Emp_Proj, {foreignKey:'Role_id',sourceKey:'id'})
  }
};
