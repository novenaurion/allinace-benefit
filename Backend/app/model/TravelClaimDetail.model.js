module.exports = (sequelize, Sequelize) => {
    const TravelClaimDetail = sequelize.define('tbl_claim_travel_detail', {
        travel_claim_detail_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        travel_claim_id: {
            type: Sequelize.INTEGER
        },
        actual_date: {
            type: Sequelize.DATE
        },
        start_location: {
            type: Sequelize.STRING
        },
        destination: {
            type: Sequelize.STRING
        },
        start_time: {
            type: Sequelize.TIME
        },
        end_time: {
            type: Sequelize.TIME
        },
        noOfDays: {
            type: Sequelize.INTEGER
        },
        noOfNights: {
            type: Sequelize.INTEGER
        },
        meals: {
            type: Sequelize.INTEGER
        },
        lodging: {
            type: Sequelize.INTEGER
        },
        transport: {
            type: Sequelize.INTEGER
        },
        amount: {
            type: Sequelize.DOUBLE
        }
    },

        {
            freezeTableName: true,
            tableName: 'tbl_claim_travel_detail'

        });

    return TravelClaimDetail;
}