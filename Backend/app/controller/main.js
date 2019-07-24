const db = require('../config/db_config');
const sequelize = db.sequelize;
let user_id = 0;
const today = new Date();

exports.setUserInfo = (req, res) => {
    user_id = req.body.user_id;
    res.send("Success")
}

exports.getUserInfo = (req, res) => {
    console.log('hello');
    let query = `select a.fullname, a.user_id, u.role_id from tbl_account_details as a 
    inner join tbl_users as u on u.user_id = a.user_id  where u.user_id = 1`;
    sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
    })
        .then(info => {
            res.send(info)
        })

}

async function checkEmployee(id) {
    // let query = `select employ_date from tbl_account_details where user_id=2`;

    let query = `select employ_date from tbl_account_details where user_id=${id}`;
    let info = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
    })
    let employ_date = info[0].employ_date;
    let months = diff_months(today, new Date(employ_date));
    if (months !== NaN && months > 6) return true;
    else return false;
}

function diff_months(dt2, dt1) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60 * 24 * 7 * 4);
    return Math.abs(Math.round(diff));

}

async function getData(tbl_name, where) {
    let query = `select * from ${tbl_name} where ${where}`;
    let data = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
    })
    if (data.length > 0) return true;
    else return false;

}

module.exports.checkEmployee = checkEmployee;
module.exports.getData = getData;
