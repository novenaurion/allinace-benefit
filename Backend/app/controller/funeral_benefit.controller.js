const db = require('../config/db_config');
const lan = require('../config/languages');
const sequelize = db.sequelize;
const FuneralBenefit=db.tbl_funeral_benefit;
const FuneralBenefitAttachment=db.tbl_funeral_attachement;
const main=require('./main')


exports.saveFuneralBenefit =async (req,res) =>{
    
    var benefit=JSON.parse(req.body.funeral_benefit)
    console.log(JSON.stringify(benefit,2,undefined))
   
    var check_employee_date= await main.checkEmployee(benefit.user_id);

    if(check_employee_date){
        var attachment=req.files;
        
            FuneralBenefit.create(benefit)
                .then(list => {
                    for (let i=0; i<attachment.length; i++){
                        FuneralBenefitAttachment.create({
                            funeraling_benefit_id:list.dataValues.funeral_benefit_id,
                            file_name:attachment[i].filename,
                            mime_type:attachment[i].mimetype,
                            status:1,
                            createdAt:new Date(),
                            updatedAt:new Date()
                        })
                    }
                    res.status(200).send(lan.succeess)
                })

    }
    else res.status(404).send(lan.already_exist_advance);


}