process.env.NEW_ENV = 'test';

const request = require('supertest');
const app = require('./app');
const items = require('./fakeDb');

const avocado = {name: 'Avocado', price: 5};
beforeEach(() => {
    items.push(avocado)
})

afterEach(() => {
    items.length = 0;
})

describe('GET /items', () => {
    test('Gets a  list of all items', async () => {
        const res = await request(app).get('/items');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([avocado]);
    })

});

describe('POST /items', () => {
    test('Create a new item', async () => {
        const res = await request(app).post('/items').send({name: 'Fish', price: 20});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({added: {name: 'Fish', price: 20}});
    })

    test('Will not create a duplicate item', async () => {
        const res = await request(app).post('/items').send(avocado);
        expect(res.statusCode).toBe(400);
    })

});

describe('GET /items/:name', () => {
    test('Gets an item by name', async () => {
        const res = await request(app).get(`/items/${avocado.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(avocado);
    })

    test('Will error out if item is not in list', async () => {
        const res = await request(app).get('/items/butter');
        expect(res.statusCode).toBe(404);
    })

});

describe('PATCH /items/:name', () => {
    test("Will modify an item's price and name", async () => {
        const res = await request(app).patch(`/items/${avocado.name}`).send({name: 'chicken', price: 15});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({updated: {name: 'chicken', price: 15}});
    })

    test('Will error out if item is not in list', async () => {
        const res = await request(app).patch('/items/butter').send({name: 'chicken', price: 15});
        expect(res.statusCode).toBe(404);
    })

});

describe('DELETE /items/:name', () => {
    test('Deletes an item', async () => {
        const res = await request(app).delete(`/items/${avocado.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({message: 'deleted'});
        expect(items.length).toEqual(0);
    })

    test('Will error out if item is not in list', async () => {
        const res = await request(app).delete('/items/butter');
        expect(res.statusCode).toBe(404);
    })

});

describe('Generic 404', () => {
    test('Errors out on a non existing address', async () => {
        const res = await request(app).get('/bingo');
        expect(res.statusCode).toBe(404);
    })

});