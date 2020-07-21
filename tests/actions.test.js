import { store } from '../../share-link-frontend/src/redux/store'
import { postLink, loadLinks } from '../../share-link-frontend/src/redux/actions/linkActions'

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

let linkStore
let links = [{ "id": 1, "name": "Facebook", "url": "https://facebook.com", "tags": [{ "name": "Social" }, { "name": "News" }, { "name": "Messaging" }] },
{ "id": 2, "name": "Google", "url": "https://google.com", "tags": [{ "name": "Search" }] },
{ "id": 3, "name": "BBC", "url": "https://bbc.com", "tags": [{ "name": "News" }] }]

let new_link = { "id": 4, "name": "LinkedIn", "url": "https://linkedIn.com", "tags": [{ "name": "Professional" }] }

describe('Actions', () => {
    beforeEach(async () => { // Runs before each test in the suite
        linkStore = store()

        await knex.migrate.rollback([{ directory: '../migrations' }])
        await knex.migrate.latest([{ directory: '../migrations' }])
        await knex.seed.run([{ directory: '../seeds' }])
    });

    it('Dispatches loadLinks successfully', async () => {
        await linkStore.dispatch(loadLinks())
        expect(linkStore.getState().linkReducer.linkStore.links.length).toBe({
            linkReducer: {
                linkStore: links
            }
        })
    })

    it('Dispatches postLink successfully', async () => {
        await linkStore.dispatch(loadLinks())

        expect(linkStore.getState().linkReducer.linkStore.links.length).toBe({
            linkReducer: {
                linkStore: links
            }
        })

        await linkStore.dispatch(postLink(new_link))

        expect(linkStore.getState().linkReducer.linkStore.links.length).toBe({
            linkReducer: {
                linkStore: links.concat(new_link)
            }
        })
    })
})