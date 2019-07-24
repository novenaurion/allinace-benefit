var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

//app.use('/',testing);

require('./app/route/Allowance.route')(app);
require('./app/route/StaffLoan.route')(app);
require('./app/route/SalaryAdvance.route')(app);
require('./app/route/Benefit.route')(app);
require('./app/route/WeddingBenefit.route')(app);
require('./app/route/FuneralBenefit.route')(app);
require('./app/route/ChildBenefit.route')(app);
require('./app/route/main')(app);


// Create a Server
var server = app.listen(8082, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("App listening at http://%s:%s", host, port)
})