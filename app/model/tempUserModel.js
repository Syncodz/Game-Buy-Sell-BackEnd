const nodemailer = require("nodemailer");
const { getMaxListeners } = require("./db.js");
const { google } = require("googleapis");
var sql = require('./db.js');

//let testAccount = await nodemailer.createTestAccount();

const CLIENT_ID = '1039702550244-nkqup027vihav8ommu464kird5ttmbac.apps.googleusercontent.com'
const CLIENT_SECRET = 'Nr9MK6YRvZsBGqwc5PBX6ldM'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04AE6wUndZ1KoCgYIARAAGAQSNwF-L9IrY9rtjMV9qDNCsVSiiBXsW50m8dlFKlmnnyJXYUuisdWJGum5kIdFcONdO2YZxhJh8ws'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

var TempUser = function (tempUser) {
    this.email = tempUser.email;
    this.validation_code = Math.floor(1000 + Math.random() * 9000);
};
TempUser.createTempUser = (newTempUser, result) => {

    sql.query("INSERT INTO `temporary_user` (`email`, `validation_code`) VALUES (?,?); ", [newTempUser.email, newTempUser.validation_code], (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {

            sendEmail(newTempUser).catch(console.error);

            console.log(res);
            result(null, res);
        }
    });

};

TempUser.findByEmail = (tempUser, result) => {
    sql.query("SELECT * FROM `temporary_user` WHERE `email`=?", tempUser.email, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {

            console.log(res);
            result(null, res);
        }
    });

}

TempUser.updateByEmail = (tempUser, result) => {
    sql.query("UPDATE `temporary_user` SET validation_code=? WHERE `email`=?", [tempUser.validation_code, tempUser.email], (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {

            sendEmail(tempUser).catch(console.error);

            console.log(res);
            result(null, res);
        }
    });

}

TempUser.deleteByEmail = (tempUser, result) => {
    sql.query("DELETE FROM `temporary_user` WHERE `email`=?", tempUser.email, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res);
            result(null, res);
        }
    });

}

async function sendEmail(tempUser) {
    try {
        const accessToken = await oAuth2Client.getAccessToken()

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            auth: {
                type: 'OAuth2',
                user: 'hello.syncodz@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        let info = await transporter.sendMail({
            from: 'SynCODZ <hello.syncodz@gmail.com>',
            to: tempUser.email,
            subject: 'Game to Game Confirmation',
            text: 'Your Confirmation Code is ' + tempUser.validation_code,

        });

        console.log("Message sent: %s", info.messageId);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (errMail) {
        console.log(errMail);
    }
}



module.exports = TempUser;