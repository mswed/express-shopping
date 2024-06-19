const express = require('express');
const routes = require('./routes');
const {ExpressError} = require('./utils')

app = express();
app.use(express.json());
app.use('/items', routes);

app.use(function(req, res, next) {
    next(new ExpressError("Not Found", 404))
});

app.use((err, req, res, next) => {
    let status = err.status || 500;
    let msg = err.msg;

    res.status(status).json({
        error: {msg, status}
    })
})

module.exports = app;