const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    app = express(),
    http = require('http'),
    epilogue = require('epilogue'),
    server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// using require('./models') may create additional connections to the database
// this can be avoided by attaching the module to the application
app.set('models', require('./models'));


const models = app.get('models');
const database = models.sequelize;
const Fighter = models.Fighter;
const Event = models.Event;

// Initialize epilogue
epilogue.initialize({
    app: app,
    sequelize: database
});

// Create REST resource
const fighterResource = epilogue.resource({
    model: Fighter,
    endpoints: ['/api/fighter', '/api/fighter/:id']
});

database
    .sync({force: true})
    .then(function() {
        server.listen(3000, function() {
            console.log('listening at port 3000');
        })
    });

