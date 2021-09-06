'use strict';
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { secret, jwtExpiration } =require("../../config.json")

var user = require('../model/userModel');

exports.create_user = async function (req, res) {
    var newUser = new user(req.body);

    user.createUser(newUser, function (err, task) {
        console.log('user controller')
        if (err) {
            res.status(500);
            res.send(err);
        } else {
            user.findByEmail(newUser,async function (err1, task1) {
                if (err1) {
                    res.status(500);
                    res.send(err1);
                }else{
                    const token = await jwt.sign(
                        { user_id: task1[0].id, user_email: task1[0].email }, secret,
                        process.env.TOKEN_KEY,
                        {
                            expiresIn: jwtExpiration,
                        }
                    );
                    user.loginSession([newUser.email, token], function (err2, task2) {
                        if (err2) {
                            res.status(500).send('Somethig went wrong')
                        } else {
                            res.status(200).send({email:task1[0].email, auth: true, token: token })
                        }
                    })
                }
            })
        }
        // res.send({userId:task[0].id, email:task[0].email, auth: true, token:task[0].token});
    });
};

exports.login = async function (req, res) {
    var userDetails = new user(req.body);
    user.login(userDetails, async function (err, task) {
        console.log('user controller')
        if (err) {
            res.status(500);
            res.send(err);
        } else {
            if (task.length == 0) {
                res.status(401).send('401');
            } else {
                if (bcrypt.compare(userDetails.password, task[0].password)) {

                    const token = await jwt.sign(
                        { user_id: task[0].id, user_email: task[0].email }, secret,
                        process.env.TOKEN_KEY,
                        {
                            expiresIn: jwtExpiration,
                        }
                    );
                    user.loginSession([userDetails.email, token], function (err1, task1) {
                        if (err1) {
                            res.status(500).send('Somethig went wrong')
                        } else {
                            res.status(201).send({ auth: true, token: token })
                        }
                    })
                } else {
                    res.send('401');
                }

            }
        }
    });
};