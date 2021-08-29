'use strict';

var user = require('../model/userModel');

exports.create_user = function (req, res) {
    var newUser = new user(req.body);
    user.createUser(newUser, function (err, task) {
        console.log('user controller')
        if (err){
            res.status(500);
            res.send(err);
        }
        console.log('res', task);
        res.status(200);
        res.send(task);
    });
};

exports.login = function (req, res) {
    var userDetails = new user(req.body);
    user.login(userDetails, function (err, task) {
        console.log('user controller')
        if (err) {
            res.status(500);
            res.send(err);
        } else {
            if (task.length == 0) {
                res.send('401');
            } else {
                console.log('res', task);
                res.status(200);
                res.send(task);
            }
        }
    });
};