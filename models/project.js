const Sequelize = require('sequelize');

module.exports = class Project extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            project_name:{
                type: Sequelize.STRING(255),
                allowNull:false
            },
            proj_start_date:{
                type: Sequelize.DATE,
                allowNull:false
            },
            proj_end_date:{
                type: Sequelize.DATE,
                allowNull:false
            },
            budget:{
                type: Sequelize.STRING(255),
                allowNull:false
            },
            project_organization:{
                type: Sequelize.STRING(255),
                allowNull:false
            }
        },{
            sequelize,
            timestamps:true,
            underscored:false,
            modelName:'Project',
            tableName:'project',
            paranoid:false,
            charset:UTF8,
            collate:'utf8_general_ci'
        })
    }
    static associate(db){
        db.Project.belongsTo(db.Emp_Proj, {foreignKey:'Project_id',sourceKey:'id'})
        
    }
}