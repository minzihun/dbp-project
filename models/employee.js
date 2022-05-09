const Sequelize = require('sequelize');

module.exports = class Employee extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            emp_name:{
                type:Sequelize.STRING(20),
                allowNull:false
            },
            emp_resident_number:{
                type:Sequelize.STRING(45),
                allowNull:false,
                unique:true
            },
            emp_final_edu:{
                type: Sequelize.STRING(255),
                allowNull:false
            },
            skill:{
                type:Sequelize.STRING(255),
                allowNull:false
            },
            carrer:{
                type:Sequelize.STRING(255),
                allowNull:false,
            },
            emp_ID:{
                type:Sequelize.STRING(45),
                allowNull:false,
            },
            emp_PW:{
                type:Sequelize.STRING(45),
                allowNull:false,
            }
        },{
            sequelize,
            timestamps:true,
            underscored:false,
            modelName:'Employee',
            tableName:'employee',
            paranoid:false,
            charset:UTF8,
            collate:'utf8_general_ci'
        })
    }
    static associate(db){
        db.Employee.belongsTo(db.Employee, {foreignKey:'Dept_id', targetKey:'id'});
        db.Employee.hasOne(db.Manager, {foreignKey:'Employee_number',sourceKey:'id'});
        db.Employee.belongsTo(db.Emp_Proj, {foreignKey:'Employee_number',sourceKey:'id'})
        
    }
}