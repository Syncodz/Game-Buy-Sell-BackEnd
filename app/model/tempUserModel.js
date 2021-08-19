const nodemailer = require("nodemailer");
const { getMaxListeners } = require("./db.js");
const { google } = require("googleapis");
var sql = require('./db.js');

//let testAccount = await nodemailer.createTestAccount();

const CLIENT_ID = '973589340908-8mkefefvku27t4o6hjgu3eghlgirtcis.apps.googleusercontent.com'
const CLIENT_SECRET = '9m3tj2cPAnSutyBoim8tKELE'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04d-tkfDsgg04CgYIARAAGAQSNwF-L9IrysC4WQNWC3ME1MfaketCNetsnJjbP8XpQyoG4YusWEMAIKXj3_eg5I58_Tk4jvKVBMs'

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
                user: 'help.gamegamuthe@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        let info = await transporter.sendMail({
            from: 'GameGamuthe <help.gamegamuthe@gmail.com>',
            to: tempUser.email,
            subject: 'Email Verification',
            text: 'Your Confirmation Code is ' + tempUser.validation_code,

        });

        console.log("Message sent: %s", info.messageId);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (errMail) {
        console.log(errMail);
    }
}



module.exports = TempUser;