const request = require("request");
const cheerio = require("cheerio");

module.exports.getFighterData = (url) => {
    return new Promise((resolve, reject) => {
        request(url, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
                const fighter_stats = {
                    wins: null,
                    wins_ko: null,
                    wins_sub: null,
                    wins_dec: null,
                    wins_other: null,
                    losses: null,
                    losses_ko: null,
                    losses_sub: null,
                    losses_dec: null,
                    losses_other: null,
                    no_contest: null,
                    height: null,
                    weight: null,
                    weight_class: null,
                    age: null,
                    birthday: null,
                    locality: null,
                    nationality: null,
                    association: null,

                };


                $('.record .count_history').filter(function() {
                    const el = $(this);
                    const wins = el.find('.left_side .bio_graph').first();
                    const winsByKnockout = wins.find('.graph_tag:nth-child(3)');
                    const winsBySubmission = wins.find('.graph_tag:nth-child(5)');
                    const winsByDecision = wins.find('.graph_tag:nth-child(7)');
                    const winsByOther = wins.find('.graph_tag:nth-child(9)');
                    const losses = el.find('.left_side .bio_graph.loser');
                    const lossesByKnockout = losses.find('.graph_tag:nth-child(3)');
                    const lossesBySubmission = losses.find('.graph_tag:nth-child(5)');
                    const lossesByDecision = losses.find('.graph_tag:nth-child(7)');
                    const lossesByOther = losses.find('.graph_tag:nth-child(9)');
                    const noContests = el.find('span:contains("N/C")').next();
                    const draw = el.find('span:contains("Draws")').next();
                    const getTotal = function(el) { return parseInt(el.text().split(' ')[0] || 0); };

                    const wins_total = parseInt(wins.find('.card .counter').text());
                    const losses_total = parseInt(losses.find('.counter').text());
                    fighter_stats.wins = wins_total;
                    fighter_stats.losses = losses_total;
                    fighter_stats.no_contest = getTotal(noContests);
                    fighter_stats.draw = getTotal(draw);
                    fighter_stats.wins_ko = getTotal(winsByKnockout);
                    fighter_stats.wins_sub = getTotal(winsBySubmission);
                    fighter_stats.wins_dec = getTotal(winsByDecision);
                    fighter_stats.wins_other = getTotal(winsByOther);
                    fighter_stats.losses_ko = getTotal(lossesByKnockout);
                    fighter_stats.losses_sub = getTotal(lossesBySubmission);
                    fighter_stats.losses_dec = getTotal(lossesByDecision);
                    fighter_stats.losses_other = getTotal(lossesByOther);
                });

                $('.bio').filter(function() {
                    var el = $(this);
                    const age = el.find('.item.birthday strong').text();
                    const birthday = el.find('span[itemprop="birthDate"]').text();
                    const locality = el.find('span[itemprop="addressLocality"]').text();
                    const nationality = el.find('strong[itemprop="nationality"]').text();
                    const association = el.find('.item.association span[itemprop="name"]').text();
                    const height = el.find('.item.height strong').text();
                    const weight = el.find('.item.weight strong').text();
                    const weight_class = el.find('.item.wclass strong').text();


                    fighter_stats.age = age.slice(5) || 0;
                    fighter_stats.birthday = birthday;
                    fighter_stats.locality = locality;
                    fighter_stats.nationality = nationality;
                    fighter_stats.association = association;
                    fighter_stats.height = height;
                    fighter_stats.weight = weight;
                    fighter_stats.weight_class = weight_class;
                });


                resolve(fighter_stats);
            }
            else {
                reject('no bueno')
            }
        })
    });
};








