var request = require("request");
var cheerio = require("cheerio");


request('http://www.sherdog.com/organizations/Ultimate-Fighting-Championship-2', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        $("span[itemprop='name']").each(function(index, element) {
            console.log(element.children[0].data);
        })
    }
});