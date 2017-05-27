const request = require("request");
const cheerio = require("cheerio");

module.exports.getFighterData = (url) => {
    return new Promise((resolve, reject) => {
        request(url, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
                const fighter_stats = {}
                fighter_stats.info = {
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
                fighter_stats.fights = [];


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
                    fighter_stats.info.wins = wins_total;
                    fighter_stats.info.losses = losses_total;
                    fighter_stats.info.no_contest = getTotal(noContests);
                    fighter_stats.info.draw = getTotal(draw);
                    fighter_stats.info.wins_ko = getTotal(winsByKnockout);
                    fighter_stats.info.wins_sub = getTotal(winsBySubmission);
                    fighter_stats.info.wins_dec = getTotal(winsByDecision);
                    fighter_stats.info.wins_other = getTotal(winsByOther);
                    fighter_stats.info.losses_ko = getTotal(lossesByKnockout);
                    fighter_stats.info.losses_sub = getTotal(lossesBySubmission);
                    fighter_stats.info.losses_dec = getTotal(lossesByDecision);
                    fighter_stats.info.losses_other = getTotal(lossesByOther);
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

                    fighter_stats.info.age = age.slice(5) || 0;
                    fighter_stats.info.birthday = birthday;
                    fighter_stats.info.locality = locality;
                    fighter_stats.info.nationality = nationality;
                    fighter_stats.info.association = association;
                    fighter_stats.info.height = height;
                    fighter_stats.info.weight = weight;
                    fighter_stats.info.weight_class = weight_class;
                });

                // Fighter Fight History
                $('.module.fight_history tr:not(.table_head)').each(function() {
                    const el = $(this);
                    const result = el.find('td:nth-child(1) .final_result').text();
                    const opponent_name = el.find('td:nth-child(2) a').text();
                    const opponent_url = el.find('td:nth-child(2) a').attr('href');
                    const event_name = el.find('td:nth-child(3) a').text();
                    const event_url = el.find('td:nth-child(3) a').attr('href');
                    const event_date = el.find('td:nth-child(3) .sub_line').text();
                    const method = el.find('td:nth-child(4)').text().split(/\)(.*)/)[0] + ")";
                    const referee = el.find('td:nth-child(4) .sub_line').text();
                    const round = el.find('td:nth-child(5)').text();
                    const time = el.find('td:nth-child(6)').text();
                    //----------------------------------+
                    //  JSON object for Fight
                    //----------------------------------+
                    const fight = {
                        name: event_name,
                        date: event_date,
                        url: event_url,
                        result: result,
                        method: method,
                        referee: referee,
                        round: round,
                        time: time,
                        opponent: opponent_name,
                        opponent_url: opponent_url
                    };

                    if (result !== "") {
                        fighter_stats.fights.push(fight);
                    }
                });


                resolve(fighter_stats);
            }
            else {
                reject('no bueno')
            }
        })
    });
};








