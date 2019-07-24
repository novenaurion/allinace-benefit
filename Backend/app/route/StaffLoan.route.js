module.exports = function (app) {

    const staff_loan = require('../controller/staff_loan');
    const upload = require('../config/multer_config');

    app.get("/staff_loan/getEmployeeList", staff_loan.getEmployeeList);
    app.get("/staff_loan/getStaffLoanList/user_id=:user_id", staff_loan.getStaffLoanList);
    app.post("/staff_loan/saveStaffLoan", upload.array('uploadfile', 5), staff_loan.saveStaffLoan);
    app.get("/staff_loan/getOneLoanInfo/:loan_id", staff_loan.getOneLoanInfo);

    //repayment schedule
    app.get("/staff_loan/getScheduleList", staff_loan.getScheduleList);
    app.post("/staff_loan/saveSchedule", staff_loan.saveSchedule);
    app.post("/staff_loan/editSchedule/:schedule_id", staff_loan.editSchedule);
    app.post("/staff_loan/deleteSchedule", staff_loan.deleteSchedule);

    //settlement sheet
    app.get("/staff_loan/getSettlementList", staff_loan.getSettlementList);
    app.post("/staff_loan/saveSettlementSheet", staff_loan.saveSettlementSheet);
    app.post("/staff_loan/editSettlementSheet/:sheet_id", staff_loan.editSettlementSheet);
    app.post("/staff_loan/deleteSettlementSheet", staff_loan.deleteSettlementSheet);
}