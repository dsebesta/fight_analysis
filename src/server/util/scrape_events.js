const request = require("request");
const cheerio = require("cheerio");

module.exports.getUpcomingEvents = new Promise((resolve, reject) => {
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
                let month;
                switch(el.find("span.month").text()) {
                    case 'Jan':
                        month = '01';
                        break;
                    case 'Feb':
                        month = '02';
                        break;
                    case 'Mar':
                        month = '03';
                        break;
                    case 'Apr':
                        month = '04';
                        break;
                    case 'May':
                        month = '05';
                        break;
                    case 'Jun':
                        month = '06';
                        break;
                    case 'Jul':
                        month = '07';
                        break;
                    case 'Aug':
                        month = '08';
                        break;
                    case 'Sep':
                        month = '09';
                        break;
                    case 'Oct':
                        month = '10';
                        break;
                    case 'Nov':
                        month = '11';
                        break;
                    case 'Dec':
                        month = '12';
                        break;
                }
                const day = el.find("span.day").text();
                const year = el.find("span.year").text();
                event.event_date = year + '-' + month + '-' + day;
                event.sherdog_url = 'http://www.sherdog.com/' + el.find("a[itemprop='url']").attr('href');
                const lastHyphen = event.sherdog_url.lastIndexOf('-');
                event.event_id = event.sherdog_url.substring(lastHyphen+1);
                upcomingEvents.push(event);
            });

            resolve(upcomingEvents);

        }
        else {
            reject('no bueno')
        }
    })
});





