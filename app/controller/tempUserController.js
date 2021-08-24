'use strict';

var tUser = require('../model/tempUserModel');
var user = require('../model/userModel');
var vUser = require('../model/verifyUserModel');

exports.create_temp_user = function (req, res) {
    var newTempUser = new tUser(req.body);
    user.findByEmail(newTempUser, function (err, task) {
        if (err) {
            res.send(err);
        } else {
            if (task.length == 0) {
                tUser.findByEmail(newTempUser, function (err1, task1) {
                    if (err1) {
                        res.send(err1);
                    } else {
                        if (task1.length == 0) {
                            tUser.createTempUser(newTempUser, function (err2, task2) {

                                console.log('controller')
                                if (err2)
                                    res.send(err2);
                                console.log('res', task2);
                                res.send(task2);
                            });
                        } else {
                            tUser.updateByEmail(newTempUser, function (err2, task2) {

                                console.log('controller')
                                if (err2)
                                    res.send(err2);
                                console.log('res', task2);
                                res.send(task2);
                            });
                        }
                    }
                });
            } else {
                res.send('Email is already in use')
            }
        }
    });
};

exports.find_temp_user = function (req, res) {
    var tempUser = new tUser(req.body);
    tUser.findByEmail(tempUser, function (err, task) {

        console.log('controller')
        if (err) {
            res.send(err);
        } else {
            // console.log(task)
            if (task.length == 0) {
                res.send('No data found')
            } else {
                tUser.updateByEmail(tempUser, function (err1, task1) {

                    console.log('controller')
                    if (err1)
                        res.send(err1);
                    console.log('res', task1);
                    res.send(task1);
                });
            }
        }
    });
};

exports.change_email = function (req, res) {
    var oldTempUser = new tUser(req.body);
    tUser.deleteByEmail(oldTempUser, function (err, task) {

        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', task);
        res.send(task);
    });
};

exports.verify_code = function (req, res) {
    var details = new vUser(req.body);
    vUser.findByEmail(details, function (err, task) {

        console.log('controller')
        if (err) {
            res.send(err);
        } else {
            if (task[0].validation_code===details.validation_code) {
                res.status(200);
                res.send('Email Verified');
            } else {
                res.status(201);
                res.send('Invalid Code');
            }
        }
    });
};