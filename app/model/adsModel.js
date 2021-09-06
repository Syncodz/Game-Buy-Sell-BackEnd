var sql = require('./db.js');

var Ads = function (uId, categoryId, title, description, price, contactNumber, email, image1,
    image2, image3, image4, image5) {
    this.uId = uId,
        this.categoryId = categoryId,
        this.title = title,
        this.description = description,
        this.price = price,
        this.contactNumber = contactNumber,
        this.email = email,
        this.image1 = image1,
        this.image2 = image2,
        this.image3 = image3,
        this.image4 = image4,
        this.image5 = image5
};

Ads.findById = (id, result) => {
    sql.query("SELECT * FROM `ads` WHERE `id`=?", id, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });

}

Ads.createAd = async (newAd, result) => {
    sql.query("INSERT INTO `ads` (`u_id`, `category_id`,`title`,`description`,`price`,`contact_number`,`email`,`image1`,"
        + "`image2`,`image3`,`image4`,`image5`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?); ",
        [newAd.uId, newAd.categoryId, newAd.title, newAd.description, newAd.price, newAd.contactNumber, newAd.email, newAd.image1,
        newAd.image2, newAd.image3, newAd.image4, newAd.image5], (err, res) => {

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


module.exports = Ads;