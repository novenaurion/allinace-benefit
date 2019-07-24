module.exports = (sequelize, Sequelize) => {
    const WeddingBenefit= sequelize.define('tbl_wedding_benefit', {
        benefit_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        is_alliance_staff:{
            type:Sequelize.BOOLEAN
        },
        spouse_name:{
            type:Sequelize.TEXT
        },
        status:{
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
            tableName: 'tbl_wedding_benefit'

        });

    return WeddingBenefit;
}