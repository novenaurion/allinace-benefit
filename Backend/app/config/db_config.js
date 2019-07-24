const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,
    pool: {
        max: env.pool.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tbl_advance_travel_allowance = require('../model/TravelAdvanceAllowance.model')(sequelize, Sequelize);
db.tbl_claim_travel_allowance = require('../model/TravelClaimAllowance.model')(sequelize, Sequelize);
db.tbl_claim_travel_detail = require('../model/TravelClaimDetail.model')(sequelize, Sequelize);

db.tbl_staff_loan = require('../model/StaffLoan')(sequelize, Sequelize);
db.tbl_staff_loan_document = require('../model/StaffLoanDocument')(sequelize, Sequelize);
db.tbl_repayment_schedule = require('../model/RepaymentSchedule')(sequelize, Sequelize);
db.tbl_settlement_sheet = require('../model/SettlementSheet')(sequelize, Sequelize);

//salary advance
db.tbl_salary_advance = require('../model/SalaryAdvance')(sequelize, Sequelize);


//wedding benefit
db.tbl_wedding_benefit= require('../model/WeedingBenefit')(sequelize,Sequelize);
db.tbl_wedding_attachement=require('../model/WeddingAttachment')(sequelize,Sequelize);

//funeral benefit
db.tbl_funeral_benefit=require('../model/FuenralBenefit')(sequelize,Sequelize)
db.tbl_funeral_attachment=require('../model/FuneralAtachment')(sequelize,Sequelize)

//child benefit
db.tbl_child_benefit=require('../model/Childbenfit')(sequelize,Sequelize)
db.tbl_child_attachment=require('../model/ChildBenefitAttachment')(sequelize,Sequelize);
module.exports = db;