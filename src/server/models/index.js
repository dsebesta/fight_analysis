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
    m.Fighter.hasMany(m.Event);
})(module.exports);

// export connection
module.exports.sequelize = sequelize;

