'use strict';

var user = require('../model/userModel');

exports.create_user = function (req, res) {
    var newUser = new user(req.body);
    user.createUser(newUser, function (err, task) {
        console.log('user controller')
        if (err)
            res.send(err);
        console.log('res', task);
        res.send(task);
    });
};

exports.login = function (req, res) {
    var userDetails = new user(req.body);
    user.login(userDetails, function (err, task) {
        console.log('user controller')
        if (err) {
            res.send(err);
        } else {
            if (task.length == 0) {
                res.send('Invalid username or Password');
            } else {
                console.log('res', task);
                res.send(task);
            }
        }
    });
};