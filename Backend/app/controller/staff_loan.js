const db = require('../config/db_config');
const lan = require('../config/languages');
const sequelize = db.sequelize;
const StaffLoan = db.tbl_staff_loan;
const StaffLoanDocument = db.tbl_staff_loan_document;
const RepaymentSchedule = db.tbl_repayment_schedule;
const SettlementSheet = db.tbl_settlement_sheet;
const main = require('./main');

exports.getEmployeeList = (req, res) => {
    let query = `SELECT user_id as value, fullname as label,father_name, nrc, employment_id FROM tbl_account_details WHERE 1`;
    sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
    })
        .then(list => {
            res.send(list)
        })
}

exports.getStaffLoanList = (req, res) => {
    let user_id = req.params.user_id;
    let where = "";
    if (user_id > 0) {
        where += `applicant_id=${user_id}`;
    }
    let query = `SELECT s.*, a.fullname as applicant_name, a1.fullname as recommended_user_name,
    a2.fullname as guarantor_name FROM tbl_staff_loan as s
    inner join tbl_account_details as a on s.applicant_id = a.user_id
    inner join tbl_account_details as a1 on s.recommended_by = a1.user_id
    inner join tbl_account_details as a2 on s.guarantor_id = a2.user_id
    WHERE 1 ${where}`;
    sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
    })
        .then(list => {
            res.send(list);
        })
}

async function checkGurantorRepayment(id) {
    let query = `select * from tbl_settlement_sheet where user_id=${id} and 
    (principle_repaid + interest_repaid) >= released_amount/2`;
    var repayment = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
    })
    if (repayment.length > 0) return true;
    else return false;
}

async function checkGuarantorForAnotherStaff(id) {
    let query = `select * from tbl_settlement_sheet where user_id=${id} and 
    (principle_repaid + interest_repaid) >= released_amount/2`;
    var is_guarantor = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
    })
    if (is_guarantor.length > 0) return false;
    else return true;
}

async function checkAdvanceLoan(id) {
    let query = `select * from tbl_settlement_sheet where user_id=${id} and 
    (principle_repaid + interest_repaid) >= released_amount/2`;
    var has_advance = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
    })
    if (has_advance.length > 0) return false;
    else return true;
}

exports.saveStaffLoan = async (req, res) => {
    var loan = JSON.parse(req.body.staff_loan);
    console.log(loan);
    var check_employ_date = await main.checkEmployee(loan.applicant_id);
    //check employee has more than six months service at alliance
    if (check_employ_date) {
        //check guarantor's repayment amount
        var check_guarantor_repayment = await checkGurantorRepayment(loan.guarantor_id);
        if (check_guarantor_repayment) {
            //check applicant is a guarantor of another staff loan
            var check_guarantor_for_another = await checkGuarantorForAnotherStaff(loan.applicant_id);
            if (check_guarantor_for_another) {
                //check applicant's advance salary 
                var check_advance_loan = await checkAdvanceLoan(loan.applicant_id);
                if (check_advance_loan) {
                    var attachment = req.files;
                    /*StaffLoan.create(loan)
                        .then(list => {
                            for (let i = 0; i < attachment.length; i++) {
                                StaffLoanDocument.create({
                                    staff_loan_id: list.dataValues.staff_loan_id,
                                    mime_type: attachment[i].mimetype,
                                    file_name: attachment[i].filename
                                })
                            }
                            res.status(200).send(lan.success);
                        })*/
                }
                else res.status(404).send(lan.already_exist_advance);
            }
            else res.status(404).send(lan.reject_loan);
        }
        else res.status(404).send(lan.reject_loan);
    }
    else res.status(404).send(lan.not_complete);
}

exports.getOneLoanInfo = (req, res) => {
    let query = `select a.fullname as guarantor_name, a.nrc,
    a.joining_date, a.phone, a.date_of_birth,
    a.thapyay_account,a.additional_jd,
    a1.fullname as recommened_user_name,
    b.branch_name, d.deptname, s.*
    from tbl_staff_loan as s 
    inner join tbl_account_details as a on s.guarantor_id = a.user_id
    inner join tbl_account_details as a1 on s.recommended_by = a1.user_id
    inner join tbl_users as u on u.user_id = a.user_id
    inner join tbl_branch as b on b.branch_id = a.branch_name
    inner join tbl_departments as d on d.departments_id = u.departments_id
    where s.staff_loan_id=${req.params.loan_id}`;
    sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
    })
        .then(list => {
            res.send(list)
        })
}

//repayment schedule
exports.getScheduleList = (req, res) => {
    let query = `select r.*, a.fullname as employee_name, a.employment_id from tbl_repayment_schedule as r 
                inner join tbl_account_details as a on r.user_id = a.user_id`;
    sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
    })
        .then(list => {
            res.send(list)
        })
}

exports.saveSchedule = (req, res) => {
    let data = JSON.parse(req.body.schedule);
    RepaymentSchedule.create(data)
        .then(list => {
            res.status(200).send(lan.successful)
        })
        .catch(error =>
            res.status(404).send(lan.fail)
        )
}

exports.editSchedule = (req, res) => {
    let data = JSON.parse(req.body.schedule);
    RepaymentSchedule.update(data, { where: { schedule_id: req.params.schedule_id } })
        .then(list => {
            res.status(200).send(lan.successful)
        })
        .catch(error =>
            res.status(404).send(lan.fail)
        )
}

exports.deleteSchedule = (req, res) => {
    let query = `delete from tbl_repayment_schedule where schedule_id=${req.body.id}`;
    sequelize.query(query, {
        type: sequelize.QueryTypes.DELETE
    })
        .then(list => {
            res.status(200).send(lan.delete_success)
        })
        .catch(error =>
            res.status(404).send(lan.delete_fail)
        )
}

//settlement sheet
exports.getSettlementList = (req, res) => {
    let query = `select a.fullname, a.father_name, a.employment_id, s.* from tbl_settlement_sheet as s 
    inner join tbl_account_details as a on a.user_id = s.user_id`;
    sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
    })
        .then(list => {
            res.send(list);
        })
}

exports.saveSettlementSheet = async (req, res) => {
    let data = JSON.parse(req.body.sheet);
    let where = `collection_date = ${data.collection_date}`
    var is_exist_sheet = await main.getData('tbl_settlement_sheet', where)
    if (is_exist_sheet) {
        res.status(404).send(lan.already_exist_sheet);
    }
    else {
        SettlementSheet.create(data)
            .then(one => {
                res.status(200).send(lan.successful);
            })
            .catch(error => {
                res.status(404).send(lan.fail);
            })
    }
}

exports.editSettlementSheet = (req, res) => {
    let data = JSON.parse(req.body.sheet);
    SettlementSheet.update(data, { where: { sheet_id: req.params.sheet_id } })
        .then(one => {
            res.status(200).send(lan.successful);
        })
        .catch(error => {
            res.status(404).send(lan.fail);
        })
}

exports.deleteSettlementSheet = (req, res) => {
    let query = `delete from tbl_settlement_sheet where sheet_id=0`;
    sequelize.query(query, {
        type: sequelize.QueryTypes.DELETE
    })
        .then(one => {
            res.status(200).send(lan.delete_success);
        })
        .catch(error => {
            res.status(404).send(lan.delete_fail);
        })
}