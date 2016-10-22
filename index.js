/**
 * @file Main Kuristina script responsible for running the server and routing all requests.
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license MIT
 * @version 0.0.3
 */

const express = require('express');
const path = require('path');
let MAL = require('./MAL');

/**
 * Port the server will be listening in. Unless specified by an environment variable (e.g. on a Heroku server),
 * 3000 is used.
 * @since 0.0.1
 */
const PORT = process.env.PORT || 3000;

/**
 * List types supported by MyAnimeList.
 * Since 0.0.2
 */
const LIST_TYPES = ['anime', 'manga'];

/**
 * Response formats supported by Kuristina.
 * Since 0.0.2
 */
const RESPONSE_FORMATS = ['xml', 'json'];

/**
 * Create an instance of Express and enable CORS
 * @since 0.0.3 Enabled CORS
 * @since 0.0.1
 */
let app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

/**
 * Show a nice welcome message to all request without the username specified, and point them at the GitHub page.
 * @since 0.0.2 Now uses an absolute path
 * @since 0.0.1
 */
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

/**
 * Extract the list type (anime/manga), the username and the password and verify that all of them are valid.
 * If not, send 403 error, otherwise call an appropriate method from MAL class.
 * @since 0.0.2
 */
app.get('/:list/:username.:format', function (req, res) {

    let list = req.params.list.toLowerCase();
    let username = req.params.username.toLowerCase();
    let format = req.params.format.toLowerCase();

    if(LIST_TYPES.indexOf(list) === -1) {
        return res.send(400, 'Invalid list type specified! Supported list types: ' + LIST_TYPES.toString());
    }
    if(!/^[A-Za-z0-9-_]+$/.test(username)) {
        return res.send(400,'Invalid username specified! Usernames must only contain letters, nubmer, dashes and underscores.');
    }
    if(RESPONSE_FORMATS.indexOf(format) === -1) {
        return res.send(400, format + 'Invalid format specified! Supported formats: ' + RESPONSE_FORMATS.toString());
    }

    let generateResponse = function generateResponse(error, content) {
        if(error) {
            if(error === 'User not found') {
                return res.send(404, 'No user corresponding to the specified username was found.');
            }
            return res.send(500, 'An error occurred while accessing MAL: ' + error);
        }
        res.header('Content-Type', 'application/' + format);
        return res.send(content);
    };

    if(format === 'xml') {
        return MAL.getListXml(list, req.params.username, generateResponse);
    }
    if(format === 'json') {
        return MAL.getListJson(list, req.params.username, generateResponse);
    }

});

app.listen(PORT, function () {
    console.log('Kuristina is listening on port ' + PORT + '!');
});