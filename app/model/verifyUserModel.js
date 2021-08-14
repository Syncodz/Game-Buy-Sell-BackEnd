var sql = require('./db.js');

var VerifyUser = function (tempUser) {
    this.email = tempUser.email;
    this.validation_code = (tempUser.validation_code);
};

VerifyUser.findByEmail = (tempUser, result) => {
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

module.exports =VerifyUser;