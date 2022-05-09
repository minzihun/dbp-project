const {Sequelize} = require('sequelize');

module.exports = class Dept extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            dept_name:{
                type: Sequelize.STRING(45),
                allowNull:false
            }
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'Dept',
            tableName:'Dept',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci'
        })
    }
    static associate(db){
        // db.Dept.hasMany(db.Employee, {foreignKey:'Dept_id', sourceKey:'id'})
    }
}