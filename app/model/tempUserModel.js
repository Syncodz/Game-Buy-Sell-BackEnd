const nodemailer = require("nodemailer");
const { getMaxListeners } = require("./db.js");
var sql = require('./db.js');

//let testAccount = await nodemailer.createTestAccount();

var TempUser = function(tempUser) {
    this.email = tempUser.email;
    this.validation_code =Math.floor(1000 + Math.random() * 9000);
};
TempUser.createTempUser = (newTempUser, result)=> {
    
    sql.query("INSERT INTO `temporary_user` (`email`, `validation_code`) VALUES (?,?); ",[newTempUser.email,newTempUser.validation_code], (err, res)=> {

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

TempUser.findByEmail = (tempUser, result) =>{
    sql.query("SELECT * FROM `temporary_user` WHERE `email`=?",tempUser.email, (err, res)=> {

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

TempUser.updateByEmail = (tempUser, result) =>{
    sql.query("UPDATE `temporary_user` SET validation_code=? WHERE `email`=?",[tempUser.validation_code,tempUser.email], (err, res)=> {

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

TempUser.deleteByEmail = (tempUser, result) =>{
    sql.query("DELETE FROM `temporary_user` WHERE `email`=?",tempUser.email, (err, res)=> {

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

    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });
      let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: tempUser.email, // list of receivers
        subject: "Game to Game Confirmation", // Subject line
        text: "Your Confirmation Code is "+tempUser.validation_code, // plain text body
        // html: "<b>Hello world?</b>", // html body
      });
    
      console.log("Message sent: %s", info.messageId);

      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }



// Sms.getSchedule = (port, result) => {
//     sql.query("SELECT ID, APP_ID FROM questions_schedule WHERE PORT=? && STATUS ='ACTIVE'", port, (err,res)=>{
//         if(err){
//             console.log("error: ", "Data not insert to the mo_answers");
//             result(err, null);
//         }
//         else {
//             result(null,res);
//         }

//     })
// }



module.exports = TempUser;