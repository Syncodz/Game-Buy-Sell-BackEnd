var sql = require('./db.js');

var User = function (user) {
    this.email = user.email;
    this.full_name = user.full_name;
    this.mobile_number = user.mobile_number;
    this.country = user.country;
    this.password = user.password;
};

User.findByEmail = (user, result) => {
    sql.query("SELECT * FROM `user` WHERE `email`=?", user.email, (err, res) => {

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

User.createUser = (newUser, result) => {

    sql.query("INSERT INTO `user` (`email`, `full_name`,`mobile_number`,`country`,`password`) VALUES (?,?,?,?,MD5(?)); ",
        [newUser.email, newUser.full_name, newUser.mobile_number, newUser.country, newUser.password], (err, res) => {

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

User.login= (userDetails, result) => {

    sql.query("SELECT * FROM `user` WHERE `email`=? && `password`=MD5(?)",
        [userDetails.email,userDetails.password], (err, res) => {

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

module.exports = User;