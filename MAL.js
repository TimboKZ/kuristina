/**
 * @file File responsible for all interactions with MyAnimeList website.
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license MIT
 * @version 0.0.1
 */

const request = require('request');
const cheerio = require('cheerio');

/**
 * @class Class used to fetch anime list contents for different users.
 * @since 0.0.1
 */
class MAL {
    /**
     * Get anime list as JSON from the `data-items` attribute on `table.list-table` on the page of the anime list.
     * @param {string} list
     * @param {string} username
     * @param callback
     */
    static getListJson(list, username, callback) {
        let url = 'https://myanimelist.net/' + list + 'list/' + username;
        console.log('Fetching ' + url);
        request(url, function(error, response, html) {
            if(error) {
                return callback(error);
            }
            let $ = cheerio.load(html);
            let content = $('table.list-table').first().attr('data-items');
            callback(error, content);
        });
    }

    /**
     * Get anime list as XML using `malappinfo.php`.
     * @param {string}list
     * @param {string} username
     * @param callback
     */
    static getListXml(list, username, callback) {
        let url = 'http://myanimelist.net/malappinfo.php?u=' + username + '&status=all&type=' + list;
        console.log('Fetching ' + url);
        request(url, function(error, response, content) {
            callback(error, content);
        });
    }
}

module.exports = MAL;
