var connection = require('./config');
var Sequelize = require('sequelize');


var Event = connection.credentials.define('events', {
    title: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    venue: {
        type: Sequelize.STRING
    },
    event_date: {
        type: Sequelize.STRING
    },
    sherdog_url: {
        type: Sequelize.STRING
    }

});


connection.credentials.sync().then(function() {
    Event.create({
        title: 'UFC 211',
        venue: 'Honda Center',
        event_date: 'date of event'
    }).catch(function(err) {
        console.log(err.message)
    });
}).catch(function(err) {
    console.log('error:', err)
});

console.log('started...');