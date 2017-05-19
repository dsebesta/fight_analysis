const request = require("request");
const cheerio = require("cheerio");

module.exports.getUpcomingEvents = function(callback) {
    request('http://www.sherdog.com/organizations/Ultimate-Fighting-Championship-2', function (error, response, html) {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            const upcomingEvents = [];

            $('#upcoming_tab tr:not(.table_head)').each(function () {
                const el = $(this);

                const event = {
                    title: '',
                    venue: '',
                    event_date: '',
                    sherdog_url: '',
                    event_id: null
                };

                event.title = el.find("span[itemprop='name']").text();
                event.venue = el.find("td[itemprop='location']").text().substring(1);
                const month = el.find("span.month").text();
                const day = el.find("span.day").text();
                const year = el.find("span.year").text();
                event.event_date = month + '/' + day + '/' + year;
                event.sherdog_url = 'http://www.sherdog.com/' + el.find("a[itemprop='url']").attr('href');
                const lastHyphen = event.sherdog_url.lastIndexOf('-');
                event.event_id = event.sherdog_url.substring(lastHyphen+1);
                upcomingEvents.push(event);
            });

            callback(upcomingEvents);
        }
    })
};



