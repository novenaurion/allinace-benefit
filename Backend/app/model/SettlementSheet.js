module.exports = (sequelize, Sequelize) => {
    const SettlementSheet = sequelize.define('tbl_settlement_sheet', {
        sheet_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        released_amount: {
            type: Sequelize.DOUBLE
        },
        rate_of_interest: {
            type: Sequelize.DOUBLE
        },
        collection_date: {
            type: Sequelize.DATE
        },
        installment_amount: {
            type: Sequelize.DOUBLE
        },
        principle_amount: {
            type: Sequelize.DOUBLE
        },
        interest_amount: {
            type: Sequelize.DOUBLE
        },
        principle_repaid: {
            type: Sequelize.DOUBLE
        },
        interest_repaid: {
            type: Sequelize.DOUBLE
        },
        total: {
            type: Sequelize.DOUBLE
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
            tableName: 'tbl_settlement_sheet'

        });

    return SettlementSheet;
}