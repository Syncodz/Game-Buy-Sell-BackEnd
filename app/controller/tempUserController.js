'use strict';

var tUser = require('../model/tempUserModel.js');

exports.create_temp_user = function (req, res) {
    var newTempUser = new tUser(req.body);
    tUser.createTempUser(newTempUser, function (err, task) {

        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', task);
        res.send(task);
    });
};