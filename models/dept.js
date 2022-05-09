const Sequelize = require('sequelize');

module.exports = class Dept extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            dept_name:{
                type: Sequelize.STRING(45),
                allowNull:false
            }
        },{
            sequelize,
            timestamps:true,
            underscored:false,
            modelName:'Dept',
            tableName:'dept',
            paranoid:false,
            charset:UTF8,
            collate:'utf8_general_ci'
        })
    }
    static associate(db){
        db.Dept.hasMany(db.Employee, {foreignKey:'Dept_id', sourceKey:'id'})
    }
}