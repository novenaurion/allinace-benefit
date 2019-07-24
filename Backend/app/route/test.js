module.exports = function (app) {
    const test = require('../controller/test');

    app.get('/test/getList', test.getList);
}