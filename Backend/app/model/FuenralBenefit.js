module.exports = (sequelize, Sequelize) => {
    const FuneralBenefit= sequelize.define('tbl_funeral_benefit', {
        funeral_benefit_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.INTEGER
       },
        funeral_type:{
            type:Sequelize.TEXT
        },
        head_no:{
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
            tableName: 'tbl_funeral_benefit'

        });

    return FuneralBenefit;
}