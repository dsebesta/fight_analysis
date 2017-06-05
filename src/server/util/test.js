var scrape_data = require('./scrape_data');


// const url = 'http://www.sherdog.com/fighter/Alexander-Gustafsson-26162';
const url = 'http://www.sherdog.com/fighter/Tim-Elliott-49213';
let pullData = scrape_data.getFighterData(url);
pullData.then((data) => {
    console.log(data)
});