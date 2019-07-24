module.exports = function (app) {
    const travelAllowance = require('../controller/TravelAllowance.controller');

    app.post('/allowance/addAdvancedTravelRequestAllowance', travelAllowance.addAdvancedTravelRequestAllowance);
    app.get('/allowance/getAdvancedTravelRequestAllowance', travelAllowance.getAdvancedTravelRequestAllowance);
    app.put('/allowance/editAdvancedTravelRequestAllowance/:travelAdvancedId', travelAllowance.editAdvancedTravelRequestAllowance);
    app.get('/allowance/getUnclaimAdvancedNo', travelAllowance.getUnclaimAdvancedNo);
    app.get('/allowance/getDataByAdvancedNo/:advanceNo', travelAllowance.getDataByAdvancedNo);
    app.post('/allowance/addClaimTravelRequestAllowance', travelAllowance.addClaimTravelRequestAllowance);
    app.get('/allowance/getClaimTravelRequestAllowance', travelAllowance.getClaimTravelRequestAllowance);
    app.get('/allowance/getClaimViewData/:claimId/:advancedId', travelAllowance.testing);
    app.get('/allowance/editClaimTravelRequestAllowance/:claimId', travelAllowance.editClaimTravelRequestAllowance);
}