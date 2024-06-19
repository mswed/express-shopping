const express = require('express');
const router = new express.Router();
const items = require('./fakeDb');


// Get all items
router.get('/', (req, res) => {
    res.json(items)
})

// Create a new item
router.post('/', (req, res) => {
    const newItem = req.body;
    items.push(newItem);

    res.json({added: newItem})

})

// Get item by name
router.get('/:name', (req, res) => {
    const itemName = req.params.name;
    const item = items.find(i => itemName === i.name)

    res.json(item);
})

// Modify an item
router.patch('/:name', (req, res) => {
    const itemName = req.params.name;
    let item = items.find(i => itemName === i.name);
    item.name = req.body.name;
    item.price = req.body.price;

    res.json({updated: item})
})

// Delete an item
router.delete('/:name', (req, res) => {
    const itemName = req.params.name;
    const item = items.find(i => itemName === i.name);
    items.splice(item, 1);

    res.json({message: 'deleted'})




})
module.exports = router;