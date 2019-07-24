const db = require('../config/db_config');
const async = require('async');
const sequelize = db.sequelize;
const AdvancedAllowance = db.tbl_advance_travel_allowance;
const ClaimAllowance = db.tbl_claim_travel_allowance;
const ClaimAllowanceDetail = db.tbl_claim_travel_detail;
const moment = require('moment');

exports.addAdvancedTravelRequestAllowance = (req, res) => {
    let data = JSON.parse(req.body.info)
    AdvancedAllowance.create({
        purpose: data.purpose,
        isAdvanced: data.isAdvanced,
        start_location: data.startLoc,
        destination: data.destination,
        start_date: new Date(data.startDate),
        end_date: data.endDate,
        noOfDays: data.noOfDays,
        noOfNights: data.noOfNights,
        meals: data.meals,
        lodging: data.lodging,
        transport: data.transport,
        total_amount: data.amount,
        form_no: data.form_no

    }).then(allowance => {
        res.send("success");
    });

};

exports.editAdvancedTravelRequestAllowance = (req, res) => {

    let data = JSON.parse(req.body.info)
    AdvancedAllowance.update({
        purpose: data.purpose,
        isAdvanced: data.isAdvanced,
        start_location: data.startLoc,
        destination: data.destination,
        start_date: data.startDate,
        end_date: data.endDate,
        noOfDays: data.noOfDays,
        noOfNights: data.noOfNights,
        meals: data.meals,
        lodging: data.lodging,
        transport: data.transport,
        total_amount: data.amount,
    },
        { where: { advance_travel_allowance_id: req.params.travelAdvancedId } }
    ).then(() => {
        res.status(200).send("success");
    });
};

exports.getAdvancedTravelRequestAllowance = (req, res) => {
    var query = "SELECT * FROM tbl_advance_travel_allowance";
    sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
    }).then(allowance => {
        res.send(allowance);
    })

};
exports.testing = async (req, res) => {

    let claimDataQuery = "Select * from tbl_claim_travel_allowance where claim_travel_allowance_id =" + req.params.claimId;
    let claimData = await sequelize.query(claimDataQuery, {
        type: sequelize.QueryTypes.SELECT
    });

    let advancedDataQuery = "Select * from tbl_advance_travel_allowance where advance_travel_allowance_id =" + req.params.advancedId
    let advancedData = await sequelize.query(advancedDataQuery, {
        type: sequelize.QueryTypes.SELECT
    });
    let claimDetailQuery = "Select * from tbl_claim_travel_detail where travel_claim_id =" + req.params.claimId
    let claimDetail = await sequelize.query(claimDetailQuery, {
        type: sequelize.QueryTypes.SELECT
    });

    let claimViewData = {
        claimData: claimData,
        advancedData: advancedData,
        claimDetail: claimDetail

    }
    res.send(claimViewData)
}

exports.getClaimTravelRequestAllowance = (req, res) => {
    var query = "SELECT * FROM tbl_claim_travel_allowance";
    sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
    }).then(allowance => {
        res.send(allowance);
    })

};

exports.getUnclaimAdvancedNo = (req, res) => {
    var query = "SELECT advance_travel_allowance_id as value , form_no as label FROM `tbl_advance_travel_allowance` where isClaim = 0  ";
    sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
    }).then(allowance => {
        res.send(allowance);
    })

};

exports.getDataByAdvancedNo = (req, res) => {
    AdvancedAllowance.findOne({
        where: { form_no: req.params.advanceNo }
    }).then(allowance => {
        res.send(allowance);
    });
};

exports.addClaimTravelRequestAllowance = (req, res) => {

    let info = JSON.parse(req.body.info)
    let claimData = info.info
    let claimDetail = info.array
    console.log(claimData)
    ClaimAllowance.create({
        advancedForm_no: claimData.advancedNo,
        purpose: claimData.purpose,
        advanced_travel_id: claimData.advancedId,
        advanced_amount: claimData.advanced_amount,
        actual_amount: claimData.actual_amount,
        settle_amount: claimData.settle_amount,
        is_Claim: 1,


    }).then(allowance => {

        for (var i = 0; i < claimDetail.length; i++) {

            ClaimAllowanceDetail.create({

                travel_claim_id: allowance.claim_travel_allowance_id,
                actual_date: moment(claimDetail[i].actualDate).format('YYYY-MM-DD'),
                start_location: claimDetail[i].startLoc,
                destination: claimDetail[i].destination,
                start_time: claimDetail[i].startTime,
                end_time: claimDetail[i].endTime,
                noOfDays: claimDetail[i].noOfDays,
                noOfNights: claimDetail[i].noOfNights,
                meals: claimDetail[i].meals,
                lodging: claimDetail[i].lodging,
                transport: claimDetail[i].transport,
                amount: claimDetail[i].amount

            }
            ).then(allowance => {
                res.send("success");
            });
        }
    });

};



exports.editClaimTravelRequestAllowance = (req, res) => {
    console.log(req.body.info)



};






