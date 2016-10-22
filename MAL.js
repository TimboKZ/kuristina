/**
 * @file File responsible for all interactions with MyAnimeList website.
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license MIT
 * @version 0.0.2
 */

const request = require('request');

/**
 * @class Class used to fetch anime list contents for different users.
 * @since 0.0.1
 */
class MAL {
    /**
     * Get anime list as XML using `malappinfo.php`.
     * @param {string} list
     * @param {string} username
     * @param callback
     * @since 0.0.1
     */
    static getListXml(list, username, callback) {
        let url = 'http://myanimelist.net/malappinfo.php?u=' + username + '&status=all&type=' + list;
        console.log('Fetching ' + url);
        request(url, function(error, response, content) {
            callback(error, content);
        });
    }
    /**
     * Get anime list as XML using `malappinfo.php`.
     * @param {string} list
     * @param {string} username
     * @param callback
     */
    static getListJson(list, username, callback) {
        this.getListXml(list, username, function(error, content) {
            if(error) {
                return callback(error);
            }
            const parseString = require('xml2js').parseString;
            parseString(content, { explicitArray: false }, function(error, json) {
                if(error) {
                    return callback(error);
                }
                callback(error, JSON.stringify(json));
            });
        });
    }

    /**
     * Get anime list as JSON from the `data-items` attribute on `table.list-table` on the page of the anime list.
     * This list contains some additional information not available through `getListJson()`, but it is also missing
     * some vital information like account info.
     * @param {string} list
     * @param {string} username
     * @param callback
     * @since 0.0.2 Renamed from `getListJson` to `getScrapedListJson`
     * @since 0.0.1
     */
    static getScrapedListJson(list, username, callback) {
        let url = 'https://myanimelist.net/' + list + 'list/' + username;
        console.log('Fetching ' + url);
        request(url, function(error, response, html) {
            if(error) {
                return callback(error);
            }
            const cheerio = require('cheerio');
            let $ = cheerio.load(html);
            let content = $('table.list-table').first().attr('data-items');
            if(!content || content.length < 1) {
                return callback('Could not fetch data from the page. Most likely username is invalid.');
            }
            callback(error, content);
        });
    }
}

module.exports = MAL;
