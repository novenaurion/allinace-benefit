module.exports = (sequelize, Sequelize) => {
    const StaffLoan = sequelize.define('tbl_staff_loan', {
        staff_loan_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        applicant_id: {
            type: Sequelize.INTEGER
        },
        guarantor_id: {
            type: Sequelize.INTEGER
        },
        recommended_by: {
            type: Sequelize.INTEGER
        },
        family_member_name: {
            type: Sequelize.STRING
        },
        family_member_nrc: {
            type: Sequelize.STRING
        },
        institution_name: {
            type: Sequelize.STRING
        },
        outstanding_amount: {
            type: Sequelize.DOUBLE
        },
        installment_term: {
            type: Sequelize.DOUBLE
        },
        installment_amount: {
            type: Sequelize.DOUBLE
        },
        maturity_date: {
            type: Sequelize.DATE
        },
        amount_requested: {
            type: Sequelize.DOUBLE
        },
        repayment_period: {
            type: Sequelize.INTEGER
        },
        loan_purpose: {
            type: Sequelize.STRING
        },
        salary_advance: {
            type: Sequelize.INTEGER
        },
        personal_loan: {
            type: Sequelize.INTEGER
        },
        collateral_loan: {
            type: Sequelize.INTEGER
        },
        other_outstanding_debts: {
            type: Sequelize.INTEGER
        },
        target_achieve: {
            type: Sequelize.STRING
        },
        performance: {
            type: Sequelize.STRING
        },
        comment: {
            type: Sequelize.STRING
        },
        attachment: {
            type: Sequelize.STRING
        },
        term_and_condition: {
            type: Sequelize.INTEGER
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
        }
    },
        {
            freezeTableName: 'true',
            tableName: 'tbl_staff_loan'
        })
    return StaffLoan;
}