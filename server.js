const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
port = process.env.PORT || 5000;


const mysql = require('mysql');
// connection configurations
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'game2game'
});

// connect to database
mc.connect();

app.listen(port);

var logger = require('./app/helper/helper');

logger.log('INFO','API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./app/routes/approutes'); //importing route
routes(app); //register the route