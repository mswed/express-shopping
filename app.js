const express = require('express');
const routes = require('./routes');

app = express();
app.use(express.json());
app.use('/items', routes);



module.exports = app;