'use strict';
module.exports = function (app) {
    var tempUser = require('../controller/tempUserController');

    // sms Routes
    app.route('/api/tempuser')
        .post(tempUser.create_temp_user);

    app.route('/api/updatecode')
        .put(tempUser.find_temp_user);
    app.route('/api/changemail')
        .post(tempUser.change_email);
    app.route('/api/verifycode')
        .post(tempUser.verify_code);

};