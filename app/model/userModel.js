var sql = require('./db.js');
const bcrypt = require('bcrypt');

var User = function (user) {
    this.email = user.email;
    this.full_name = user.full_name;
    this.mobile_number = user.mobile_number;
    this.country = user.country;
    this.password = user.password;
    this.token = user.token;
};

User.findByEmail = (user, result) => {
    sql.query("SELECT * FROM `user` WHERE `email`=?", user.email, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });

}

User.createUser = async (newUser, result) => {
    var encryptedPassword = await bcrypt.hash(newUser.password, 10);

    sql.query("INSERT INTO `user` (`email`, `full_name`,`mobile_number`,`country`,`password`,`createdAt`) VALUES (?,?,?,?,?,CURRENT_TIMESTAMP()); ",
        [newUser.email, newUser.full_name, newUser.mobile_number, newUser.country, encryptedPassword], (err, res) => {

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

User.login = (userDetails, result) => {

    sql.query("SELECT * FROM `user` WHERE `email`=?",
        userDetails.email, (err, res) => {

            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, res);
            }
        });

};

User.loginSession = ([userEmail, token], result) => {
    sql.query("UPDATE `user` SET `token`=?, `updatedAt`=CURRENT_TIMESTAMP() WHERE `email`=?", [token, userEmail], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    })
}

module.exports = User;