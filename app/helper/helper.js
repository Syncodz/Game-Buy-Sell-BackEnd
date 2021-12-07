'use strict';

exports.log = function (type, message) {

    var d = new Date();
    const timeStamp = d.getUTCFullYear() + '-' + d.getUTCMonth() + '-' + d.getUTCDate() + ' ' + d.getUTCHours() + ':' + d.getUTCMinutes() + ':' + d.getUTCSeconds() + ':' + d.getUTCMilliseconds();
    console.log(timeStamp + '|' + type + '|' + message);
};