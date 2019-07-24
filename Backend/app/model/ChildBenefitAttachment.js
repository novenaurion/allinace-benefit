module.exports = (sequelize, Sequelize) => {
    const ChildAttachment= sequelize.define('tbl_child_attachment', {
        child_attachment_id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        child_benefit_id:{
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
            tableName: 'tbl_child_attachment'

        });

    return ChildAttachment;
}