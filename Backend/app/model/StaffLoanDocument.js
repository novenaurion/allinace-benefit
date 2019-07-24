module.exports = (sequelize, Sequelize) => {
    const StaffLoanDocument = sequelize.define('tbl_staff_loan_document', {
        document_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        staff_loan_id: {
            type: Sequelize.INTEGER
        },
        mime_type: {
            type: Sequelize.STRING
        },
        file_name: {
            type: Sequelize.STRING
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
            type: Sequelize.DATE
        }
    },
        {
            freezeTableName: true,
            tableName: 'tbl_staff_loan_document'

        });

    return StaffLoanDocument;
}