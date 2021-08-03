const { getMaxListeners } = require('./db.js');
var sql = require('./db.js');

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
            console.log(res);
            result(null, res);
        }
    });
};


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