module.exports = (sequelize, Sequelize) => {
   const TravelAdvanceAllowance = sequelize.define('tbl_advance_travel_allowance', {
      advance_travel_allowance_id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true
      },

      user_id: {
         type: Sequelize.INTEGER
      },
      isAdvanced: {
         type: Sequelize.INTEGER
      },
      purpose: {
         type: Sequelize.STRING
      },
      start_date: {
         type: Sequelize.DATE
      },
      end_date: {
         type: Sequelize.DATE
      },
      start_location: {
         type: Sequelize.STRING
      },
      destination: {
         type: Sequelize.STRING
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
      total_amount: {
         type: Sequelize.DOUBLE
      },
      form_no: {
         type: Sequelize.STRING
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
         tableName: 'tbl_advance_travel_allowance'

      });

   return TravelAdvanceAllowance;
}