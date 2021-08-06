'use strict';
module.exports = function (app) {
    var tempUser = require('../controller/tempUserController');

    // sms Routes
    app.route('/tempuser')
        .post(tempUser.create_temp_user);

    app.route('/updatecode')
        .put(tempUser.find_temp_user);
    app.route('/changemail')
        .post(tempUser.change_email);

};