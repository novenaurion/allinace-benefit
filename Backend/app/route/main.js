module.exports = function (app) {

    const main = require('../controller/main');

    app.post('/main/setUserInfo', main.setUserInfo);
    app.get('/main/getUserInfo', main.getUserInfo);
}