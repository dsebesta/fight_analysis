// import all models and create relationships

const config = require('./../config');
const Sequelize = require('sequelize');

// initialize database connection
const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, config.db.options);

// load models
const models = [
    'Event',
    'Fighter'
];
models.forEach(function(model) {
    module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// describe relationships
(function(m) {
    m.Fighter.belongsToMany(m.Event, {through: 'EventsFighters', foreignKey: 'fighter_id'});
    m.Event.belongsToMany(m.Fighter, {through: 'EventsFighters', foreignKey: 'event_id'});
    // m.Venue.belongsToMany(m.Event, {through: 'EventsVenues'})
})(module.exports);

// export connection
module.exports.sequelize = sequelize;
