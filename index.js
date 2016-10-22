/**
 * @file A JavaScript file.
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license MIT
 * @version 0.0.1
 */

const PORT = process.env.PORT || 3000;

var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(PORT, function () {
    console.log('Example app listening on port 3000!');
});