const request = require("request");
const cheerio = require("cheerio");

module.exports.getFighterData = (url) => {
    return new Promise((resolve, reject) => {
        request(url, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
                const fighter_stats = {
                    height: null,
                    weight_class: null
                };
                const tempHeight = $('.height').text();
                const regex = /[0-9.]{6}/g;
                fighter_stats.height = tempHeight.match(regex)[0];
                fighter_stats.weight_class = $('.wclass').find('a').text();

                resolve(fighter_stats);
            }
            else {
                reject('no bueno')
            }
        })
    });
};








