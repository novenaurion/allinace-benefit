module.exports = (sequelize, Sequelize) => {
    const TravelClaimAllowance = sequelize.define('tbl_claim_travel_allowance', {
        claim_travel_allowance_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        advanced_travel_id: {
            type: Sequelize.INTEGER
        },
        advancedForm_no: {
            type: Sequelize.INTEGER
        },
        purpose: {
            type: Sequelize.STRING
        },
        advanced_amount: {
            type: Sequelize.DOUBLE
        },
        actual_amount: {
            type: Sequelize.DOUBLE
        },
        settle_amount: {
            type: Sequelize.DOUBLE
        },
        is_Claim: {
            type: Sequelize.INTEGER
        },
        check_by: {
            type: Sequelize.INTEGER
        },
        approve_by: {
            type: Sequelize.INTEGER
        },
        verify_by: {
            type: Sequelize.INTEGER
        },
        rejected_by: {
            type: Sequelize.INTEGER
        }
    },

        {
            freezeTableName: true,
            tableName: 'tbl_claim_travel_allowance'

        });

    return TravelClaimAllowance;
}