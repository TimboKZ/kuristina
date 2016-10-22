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

/**
 * Show a nice welcome message to all request without the username specified, and point them at the GitHub page.
 * @since 0.0.1
 */
app.get('/', function (req, res) {
    res.send('index.html');
});

app.get('/:username(:extension)?', function (req, res) {
    res.send(req.params);
});

app.listen(PORT, function () {
    console.log('Example app listening on port 3000!');
});