const {Sequelize} = require('sequelize');

module.exports = class Manager extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            manager_position:{
                type: Sequelize.STRING(20),
                allowNull:false
            }
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'Manager',
            tableName:'Manager',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci'
        })
    }
    static associate(db){
        db.Manager.belongsTo(db.Employee, {foreignKey:'Employee_number',targetKey:'id'})
    }
}