const db = require('../config/db_config');
const sequelize = db.sequelize;

exports.getList = (req, res) => {
    let query = `SELECT * FROM tbl_branch`;
    sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
    }).then(list => {
        res.send(list);
    })
}
