'use strict';
module.exports = function (app) {
    var tempUser = require('../controller/tempUserController');
    var user = require('../controller/userController');

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

};