const request = require("request");
const cheerio = require("cheerio");

module.exports.getFighterData = (url) => {
    return new Promise((resolve, reject) => {
        request(url, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
                const fighter_stats = {
                    wins: null,
                    wins_kos: null,
                    wins_sub: null,
                    wins_dec: null,
                    losses: null,
                    losses_ko: null,
                    losses_sub: null,
                    losses_dec: null,
                    no_contest: null,
                    height: null,
                    weight_class: null
                };
                console.log($('.bio_graph'));
                fighter_stats.wins = $('.bio_graph').find('span[class="counter"]').text();

                resolve(fighter_stats);
            }
            else {
                reject('no bueno')
            }
        })
    });
};








