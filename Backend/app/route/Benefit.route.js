module.exports = function (app) {

    const benefit = require('../controller/benefit');
    const upload = require('../config/multer_config');

    app.get("/benefit/getEmployeeList", benefit.getEmployeeList);
}