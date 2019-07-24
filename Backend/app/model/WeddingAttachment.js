module.exports = (sequelize, Sequelize) => {
    const WeddingAttachment= sequelize.define('tbl_wedding_attachment', {
        attachment_id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        wedding_benefit_id:{
            type:Sequelize.INTEGER
        },
        file_name:{
            type:Sequelize.TEXT
        },
        mime_type:{
            type:Sequelize.TEXT
        },
        status:{
            type:Sequelize.BOOLEAN
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
            tableName: 'tbl_wedding_attachment'

        });

    return WeddingAttachment;
}