const express = require('express');
const router = new express.Router();
const items = require('./fakeDb');
const {getItem, ExpressError} = require('./utils');


// Get all items
router.get('/', (req, res) => {
    res.json(items)
})

// Create a new item
router.post('/', (req, res, next) => {
    try {
        const newItem = req.body;
        if (items.find( i => i.name === newItem.name)) throw new ExpressError('Item already in list', 400);
        items.push(newItem);

        return res.json({added: newItem})
    } catch (e) {
        console.log(e)
        return next(e)
    }

})

// Get item by name
router.get('/:name', getItem, (req, res) => {
    res.json(res.locals.item);
})

// Modify an item
router.patch('/:name', getItem, (req, res) => {
    res.locals.item.name = req.body.name;
    res.locals.item.price = req.body.price;

    res.json({updated: res.locals.item})
})

// Delete an item
router.delete('/:name', getItem, (req, res) => {
    items.splice(res.locals.item, 1);

    res.json({message: 'deleted'})




})
module.exports = router;