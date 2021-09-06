'use strict';
module.exports = function (app) {
    const tempUser = require('../controller/tempUserController');
    const user = require('../controller/userController');
    const ad = require('../controller/adsController');
    const authorize =require('../middleware/authorize');

    // sms Routes
    app.route('/api/tempuser')
        .post(tempUser.create_temp_user);

    app.route('/api/updatecode')
        .put(tempUser.find_temp_user);
    app.route('/api/changemail')
        .post(tempUser.change_email);
    app.route('/api/verifycode')
        .post(tempUser.verify_code);
    app.route('/api/user')
        .post(user.create_user);
    app.route('/api/login')
        .post(user.login);

    app.route('/api/adpost')
        .post(authorize, ad.create_ad);

};