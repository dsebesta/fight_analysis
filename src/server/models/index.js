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
    m.EventFighters.belongsTo(m.Event);
    m.EventFighters.belongsTo(m.Fighter);
    m.Fighter.hasMany(m.EventFighters);
    m.Event.hasMany(m.EventFighters);
})(module.exports);

// export connection
module.exports.sequelize = sequelize;
