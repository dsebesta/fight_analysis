const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(bodyParser());

app.get('/', function (req, res) {
    res.send('hello world');
});





app.listen(3000, function() {
    console.log('listening on port 3000');
});


