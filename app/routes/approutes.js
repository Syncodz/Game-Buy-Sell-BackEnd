'use strict';
module.exports = function (app) {
    var tempUser = require('../controller/tempUserController');

    // sms Routes
    app.route('/tempuser')
        .post(tempUser.create_temp_user);

};