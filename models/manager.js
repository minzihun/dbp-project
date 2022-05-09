const Sequelize = require('sequelize');

module.exports = class Manager extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            manager_position:{
                type: Sequelize.STRING(20),
                allowNull:false
            }
        },{
            sequelize,
            timestamps:true,
            underscored:false,
            modelName:'Manager',
            tableName:'manager',
            paranoid:false,
            charset:UTF8,
            collate:'utf8_general_ci'
        })
    }
    static associate(db){
        db.Manager.belongsTo(db.Employee, {foreignKey:'Employee_number',targetKey:'id'})
    }
}