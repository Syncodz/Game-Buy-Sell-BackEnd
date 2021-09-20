'use strict';
const jwt = require("jsonwebtoken");

const ad = require('../model/adsModel');
const { secret } = require("../../config.json")
const { TokenExpiredError } = jwt;

exports.create_ad = async function (req, res) {
    // let token = req.headers["x-access-token"];
    const bearerHeader = req.headers['authorization'];
    var token = "";
    if (!bearerHeader) {
        return res.status(403).send({ message: "No token provided!" });
    } else {
        const bearer = bearerHeader.split(' ');
        token = bearer[1];
    }

    if (token == "") {
        return res.status(403).send({ message: "No token provided!" });
    }
    const catchError = (err, res) => {
        if (err instanceof TokenExpiredError) {
            return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
        }

        return res.sendStatus(401).send({ message: "Unauthorized!" });
    }

    var uId = 0;
    var categoryId = 0;
    var email = "";
    var arr = req.body.images;
    var image1 = "";
    var image2 = "";
    var image3 = "";
    var image4 = "";
    var image5 = "";
    if (arr[0] !== null) {
        image1 = arr[0];
    }
    if (arr[1] !== null) {
        image2 = arr[1];
    }
    if (arr[2] !== null) {
        image3 = arr[2];
    }
    if (arr[3] !== null) {
        image4 = arr[3];
    }
    if (arr[4] !== null) {
        image5 = arr[4];
    }
    if (req.body.category == 'Pubg') {
        categoryId = 1;
    } else if (req.body.category == 'Call of Duty') {
        categoryId = 2;
    } else if (req.body.category == 'Free Fire') {
        categoryId = 3;
    } else if (req.body.category == 'Clash of Clans') {
        categoryId = 4;
    } else if (req.body.category == 'Valorant') {
        categoryId = 5;
    } else if (req.body.category == 'Dota') {
        categoryId = 6;
    }
    else {
        categoryId = 7;
    }

    await jwt.verify(token, secret, (err1, decoded) => {
        if (err1) {
            return catchError(err1, res);
        }
        uId = decoded.user_id;
        email = decoded.user_email;
    });

    var newAd = new ad(uId, categoryId, req.body.title, req.body.description, req.body.price, req.body.contactNumber, email, image1,
        image2, image3, image4, image5);

    ad.createAd(newAd, function (err, task) {
        if (err) {
            res.status(500);
            res.send(err);
        } else {
            res.status(200).send(task);
        }
    });
};

exports.view_ad = function (req, res) {
    ad.findById(req.params.id, function (err, task) {
        if (err) {
            res.status(500);
            res.send(err);
        } else {
            res.status(200).send(task);
        }
    })
}