module.exports = function (app) {

    
    const child_benefit = require('../controller/child_benefit.controller');
    const upload = require('../config/child_benefit_multer_config');

    app.post("/child_benefit/saveChildBenefit", upload.array('uploadfile', 5), child_benefit.saveChildBenefit);
}