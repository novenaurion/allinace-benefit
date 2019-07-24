const db = require('../config/db_config');
const lan = require('../config/languages');
const sequelize = db.sequelize;
const ChildBenefit=db.tbl_child_benefit;
const ChildAttachment=db.tbl_child_attachment;
const main=require('./main')


exports.saveChildBenefit =async (req,res) =>{
    
    var benefit=JSON.parse(req.body.child_benefit)
    console.log(JSON.stringify(benefit,2,undefined))
   
    var check_employee_date= await main.checkEmployee(benefit.user_id);

    if(check_employee_date){
        var attachment=req.files;
        
            ChildBenefit.create(benefit)
                .then(list => {
                    for (let i=0; i<attachment.length; i++){
                        ChildAttachment.create({
                            child_benefit_id:list.dataValues.child_benefit_id,
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