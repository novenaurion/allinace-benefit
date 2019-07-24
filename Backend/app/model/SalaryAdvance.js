module.exports = (sequelize, Sequelize) => {
    const SalaryAdvance = sequelize.define('tbl_salary_advance', {
        salary_advance_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        requested_amount: {
            type: Sequelize.DOUBLE
        },
        purpose: {
            type: Sequelize.STRING
        },
        duration: {
            type: Sequelize.DOUBLE
        },
        monthly_installment: {
            type: Sequelize.DOUBLE
        },
        approved_amount: {
            type: Sequelize.DOUBLE
        },
        verifier_comment: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.INTEGER
        },
        checked_by: {
            type: Sequelize.INTEGER
        },
        verified_by: {
            type: Sequelize.INTEGER
        },
        approved_by: {
            type: Sequelize.INTEGER
        },
        rejected_by: {
            type: Sequelize.INTEGER
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
            tableName: 'tbl_salary_advance'

        });

    return SalaryAdvance;
}