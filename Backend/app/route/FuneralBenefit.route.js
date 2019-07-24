module.exports = function (app) {

    
    const funeral_benefit = require('../controller/funeral_benefit.controller');
    const upload = require('../config/funeral_benefit_multer_confi');

    app.post("/funeral_benefit/saveFuneralBenefit", upload.array('uploadfile', 5), funeral_benefit.saveFuneralBenefit);
}