module.exports = (sequelize, Sequelize) => {
    const FuneralAttachment= sequelize.define('tbl_funeral_attachment', {
        funeral_attachment_id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        funeral_benefit_id:{
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
            tableName: 'tbl_funeral_attachment'

        });

    return FuneralAttachment;
}