const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    app = express(),
    http = require('http'),
    server = http.createServer(app);

const routes = require('./routes');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routes);

// using require('./models') may create additional connections to the database
// this can be avoided by attaching the module to the application
app.set('models', require('./models'));

const models = app.get('models');
const database = models.sequelize;


database.query('SET FOREIGN_KEY_CHECKS = 0').then(function() {
    database.sync({force: false}).then(function() {
        database.query('SET FOREIGN_KEY_CHECKS = 1').then(function() {
            server.listen(3000, function () {
                console.log('listening at port 3000');
            })
        })
    })
});


