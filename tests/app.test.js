// jest test --runInBand --detectOpenHandles

// Update with your config settings.
require('dotenv').config();

const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD
    }
});

const app = require('../app');
const request = require('supertest');


describe('Routes', () => {

    beforeEach(async () => {
        await knex.migrate.rollback([{directory: '../migrations'}])
        await knex.migrate.latest([{directory: '../migrations'}])
        await knex.seed.run([{directory: '../seeds'}])
    })

    test('It should respond with JSON information with GET method at /links request', async (done) => {
        const res = await request(app)
            .get('/links')
            .catch((err) => {
                if (err) throw err;
                done();
            });

        expect(res.statusCode).toEqual(200)
        expect(res.text).toEqual(JSON.stringify([
            {"id":1,"name":"Facebook","url":"https://facebook.com","tags":[{"name":"Social"},{"name":"News"},{"name":"Messaging"}]},
            {"id":2,"name":"Google","url":"https://google.com","tags":[{"name":"Search"}]},
            {"id":3,"name":"BBC","url":"https://bbc.com","tags":[{"name":"News"}]}
        ]))

        done();
    });


    test('It should respond with JSON information with POST method at /links request', async (done) => {
        const res = await request(app)
            .post('/links')
            .send({ 
                name: "Test", 
                url: "https://test.com", 
                tags: [{ "name": "Social" }, { "name": "Professional" }] 
            })
            .catch((err) => {
                if (err) throw err;
                done();
            });

        expect(res.statusCode).toEqual(200)
        expect(res.text).toEqual(JSON.stringify([{"id":4,"name":"Test","url":"https://test.com","tags":[{"name":"Social"}]}]))

        done();
    });
});