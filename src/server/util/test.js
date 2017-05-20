var scrape_event = require('./scrape_fighters_from_event');


const url = 'http://www.sherdog.com/events/UFC-Fight-Night-109-Gustafsson-vs-Teixeira-58405';
let pullData = scrape_event.getEventData(url);
pullData.then((data) => {
    console.log(data)
});