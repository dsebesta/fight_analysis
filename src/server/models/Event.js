const config = require('./../config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, {
    logging: console.log,
    define: {
        timestamps: false
    }
});

const Event = sequelize.define('events', {
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
    },
    fighter_id: {
        type: Sequelize.INTEGER
    }
});


const Fighter = sequelize.define('fighters', {
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    height: {
        type: Sequelize.INTEGER
    }
});

sequelize.sync({force: true}).then(function() {
    Fighter.create({
        name: 'Conor2',
        height: 100
    }).catch(function(err) {
        console.log(err);
    });

    Event.create({
        title: 'UFC 200'
    }).catch(function(err) {
        console.log(err);
    });

}).catch(function(err) {
    console.log(err)
});