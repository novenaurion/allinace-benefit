module.exports = (sequelize, Sequelize) => {
    const RepaymentSchedule = sequelize.define('tbl_repayment_schedule', {
        schedule_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        amount: {
            type: Sequelize.DOUBLE
        },
        installment_amount: {
            type: Sequelize.DOUBLE
        },
        installment_date: {
            type: Sequelize.DATE
        },
        kantkaw_account: {
            type: Sequelize.STRING
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
            tableName: 'tbl_repayment_schedule'

        });

    return RepaymentSchedule;
}