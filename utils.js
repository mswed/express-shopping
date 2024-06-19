const items = require("./fakeDb");

function getItem(req, res, next) {
    const itemName = req.params.name;
    res.locals.item = items.find(i => itemName === i.name);

    next();
}

module.exports = {getItem}