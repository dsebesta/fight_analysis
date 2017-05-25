var scrape_fighter = require('./scrape_fighter_info');


const url = 'http://www.sherdog.com/fighter/Alexander-Gustafsson-26162';
let pullData = scrape_fighter.getFighterData(url);
pullData.then((data) => {
    console.log(data)
});