const db = require('../config/db_config');
const lan = require('../config/languages');
const sequelize = db.sequelize;
const SalaryAdvance = db.tbl_salary_advance;

exports.getSalaryAdvanceList = (req, res) => {
    let user_id = req.params.user_id;
    let where = "";
    if (user_id > 0) {
        where += ` and user_id=${user_id}`;
    }
    let query = `select s.salary_advance_id,s.purpose, s.requested_amount, s.user_id, s.status, a.fullname as applicant_name
                from tbl_salary_advance as s 
                inner join tbl_account_details as a on s.user_id = a.user_id
                where 1 ${where}`;
    sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
    })
        .then(list => {
            res.send(list);
        })
}

exports.getOneSalaryAdvance = (req, res) => {
    let query = `select s.*, a.fullname as employee_name, dept.deptname as department , b.branch_name as location, p.payment_amount as salary
    from tbl_salary_advance as s 
    inner join tbl_account_details as a on s.user_id = a.user_id 
    inner join tbl_users as u on s.user_id = u.user_id 
    inner join tbl_departments as dept on u.departments_id = dept.departments_id
    inner join tbl_branch as b on u.branch_id= b.branch_id 
    inner join tbl_salary_payment as p on u.user_id=p.user_id
    where salary_advance_id=${req.params.advance_id} and p.payment_month=(select max(payment_month) from tbl_salary_payment as p1
    inner join tbl_salary_advance as s1 on s1.user_id=p1.user_id
    where s1.salary_advance_id = 1)`;
    sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
    })
        .then(list => {
            res.send(list);
        })
}

exports.saveSalaryAdvance = (req, res) => {
    var advance = JSON.parse(req.body.advance);
    SalaryAdvance.create(advance)
        .then(one => {
            res.status(200).send(lan.successful);
        })
        .catch(error => {
            res.status(404).send(lan.fail);
        })
}

exports.editSalaryAdvance = (req, res) => {
    var advance = JSON.parse(req.body.advance);
    // console.log(advance);
    SalaryAdvance.update(advance, { where: { salary_advance_id: req.params.advance_id } })
        .then(one => {
            res.status(200).send(lan.successful);
        })
        .catch(error => {
            res.status(404).send(lan.fail);
        })

}

exports.deleteSalaryAdvance = (req, res) => {
    SalaryAdvance.delete({ where: { salary_advance_id: req.params.advance_id } })
        .then(one => {
            res.status(200).send(lan.successful);
        })
        .catch(error => {
            res.status(404).send(lan.fail);
        })
}