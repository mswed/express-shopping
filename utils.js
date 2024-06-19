const items = require("./fakeDb");

class ExpressError extends Error {
    constructor(msg, status) {
        super();
        this.msg = msg;
        this.status = status;
        console.log(this.stack);
    }
}

function getItem(req, res, next) {
    try {
        const itemName = req.params.name;
        res.locals.item = items.find(i => itemName === i.name);
        if (!res.locals.item) throw new ExpressError('Item not found', 404)

        next();
    } catch (e) {
        next(e)
    }

}



module.exports = {getItem, ExpressError}