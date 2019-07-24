module.exports = (sequelize, Sequelize) => {
    const ChildBenefit= sequelize.define('tbl_child_benefit', {
        child_benefit_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.INTEGER
       },
        child_count:{
            type:Sequelize.INTEGER
        },
        checked_by:{
            type:Sequelize.INTEGER
        },
        verified_by:{
            type:Sequelize.INTEGER
        },
        approved_by:{
            type:Sequelize.INTEGER
        },
        rejected_by:{
            type:Sequelize.INTEGER
        },
        createdBy: {
            type: Sequelize.INTEGER
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedBy: {
            type: Sequelize.INTEGER
        },
        updatedAt: {
            type: Sequelize.DATE
        }
    },
        {
            freezeTableName: true,
            tableName: 'tbl_child_benefit'

        });

    return ChildBenefit;
}