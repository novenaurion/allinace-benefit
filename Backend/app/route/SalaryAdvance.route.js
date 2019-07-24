module.exports = function (app) {

    const salary_advance = require('../controller/salary_advance');

    app.get('/salary_advance/getSalaryAdvanceList/user_id=:user_id', salary_advance.getSalaryAdvanceList);
    app.get('/salary_advance/getOneSalaryAdvance/advance_id=:advance_id', salary_advance.getOneSalaryAdvance);
    app.post('/salary_advance/saveSalaryAdvance', salary_advance.saveSalaryAdvance);
    app.post('/salary_advance/editSalaryAdvance/advance_id=:advance_id', salary_advance.editSalaryAdvance);
    app.delete('/salary_advance/deleteSalaryAdvance', salary_advance.deleteSalaryAdvance);
}