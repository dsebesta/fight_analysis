// import all models and create relationships

const config = require('./../config');
const Sequelize = require('sequelize');

// initialize database connection
const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, config.db.options);

// load models
const models = [
    'Event',
    'Fighter',
    'EventFighters'
];
models.forEach(function(model) {
    module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// describe relationships
(function(m) {
    // m.Event.hasMany(m.Fighter);
    m.Fighter.belongsToMany(m.Event, {through: m.EventFighters, foreignKey: 'fighter_id', otherKey: 'event_id'});
    console.log('m', m)
    // m.Venue.belongsToMany(m.Event, {through: 'EventsVenues'})
})(module.exports);

// export connection
module.exports.sequelize = sequelize;
