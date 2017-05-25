const request = require("request");
const cheerio = require("cheerio");

module.exports.getEventData = (url) => {
    return new Promise((resolve, reject) => {
        request(url, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
                const event_fighters = [];

                // Scrape Main Event Fighters
                $('.left_side').filter(function() {
                    const event_fighter = {
                        fighter_name: '',
                        fighter_url: '',
                        fighter_id: '',
                        event_match_id: 99,
                        event_match_position_id: 1,
                        event_id: null
                    };
                    const el = $(this);
                    event_fighter.fighter_name = el.find("span[itemprop='name']").text();
                    event_fighter.fighter_url = 'http://www.sherdog.com' + el.find("a[itemprop='url']").attr('href');
                    const lastHyphen1 = event_fighter.fighter_url.lastIndexOf('-');
                    event_fighter.fighter_id = event_fighter.fighter_url.substring(lastHyphen1+1);
                    const lastHyphen2 = url.lastIndexOf('-');
                    event_fighter.event_id = url.substring(lastHyphen2+1);
                    event_fighters.push(event_fighter);
                });

                $('.right_side').filter(function() {
                    const event_fighter = {
                        fighter_name: '',
                        fighter_url: '',
                        fighter_id: '',
                        event_match_id: 99,
                        event_match_position_id: 2,
                        event_id: null
                    };
                    const el = $(this);
                    event_fighter.fighter_name = el.find("span[itemprop='name']").text();
                    event_fighter.fighter_url = 'http://www.sherdog.com' + el.find("a[itemprop='url']").attr('href');
                    const lastHyphen1 = event_fighter.fighter_url.lastIndexOf('-');
                    event_fighter.fighter_id = event_fighter.fighter_url.substring(lastHyphen1+1);
                    const lastHyphen2 = url.lastIndexOf('-');
                    event_fighter.event_id = url.substring(lastHyphen2+1);
                    event_fighters.push(event_fighter);
                });

                //Scrape All Other Fighters
                $('tr[itemprop="subEvent"]').filter(function() {
                    const el = $(this);

                    // Fighter on left
                    let event_fighter = {
                        fighter_name: '',
                        fighter_url: '',
                        fighter_id: '',
                        event_match_id: null,
                        event_match_position_id: 1,
                        event_id: null
                    };
                    event_fighter.event_match_id = el.find('td:nth-child(1)').text().replace(/\s+/g, '');
                    const lf = el.find('.text_right');
                    event_fighter.fighter_name = lf.find("span[itemprop='name']").text();
                    event_fighter.fighter_url = 'http://www.sherdog.com' + lf.find("a[itemprop='url']").attr('href');
                    let lastHyphen1 = event_fighter.fighter_url.lastIndexOf('-');
                    event_fighter.fighter_id = event_fighter.fighter_url.substring(lastHyphen1+1);
                    let lastHyphen2 = url.lastIndexOf('-');
                    event_fighter.event_id = url.substring(lastHyphen2+1);
                    event_fighters.push(event_fighter);

                    // Fighter on right
                    event_fighter = {
                        fighter_name: '',
                        fighter_url: '',
                        fighter_id: '',
                        event_match_id: null,
                        event_match_position_id: 2,
                        event_id: null
                    };
                    event_fighter.event_match_id = el.find('td:nth-child(1)').text().replace(/\s+/g, '');
                    const rf = el.find('.text_left');
                    event_fighter.fighter_name = rf.find("span[itemprop='name']").text();
                    event_fighter.fighter_url = 'http://www.sherdog.com' + rf.find("a[itemprop='url']").attr('href');
                    lastHyphen1 = event_fighter.fighter_url.lastIndexOf('-');
                    event_fighter.fighter_id = event_fighter.fighter_url.substring(lastHyphen1+1);
                    lastHyphen2 = url.lastIndexOf('-');
                    event_fighter.event_id = url.substring(lastHyphen2+1);
                    event_fighters.push(event_fighter);
                });

                resolve(event_fighters)
            }
            else {
                reject('no bueno')
            }
        })
    });
};








