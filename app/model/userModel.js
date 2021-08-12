var sql = require('./db.js');

var User = function(user) {
    this.email = user.email;
    this.full_name = user.full_name;
    this.mobile_number = user.mobile_number;
    this.country = user.country;
    this.password= user.password;
};

User.findByEmail = (user, result) =>{
    sql.query("SELECT * FROM `user` WHERE `email`=?",user.email, (err, res)=> {

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

module.exports = User;