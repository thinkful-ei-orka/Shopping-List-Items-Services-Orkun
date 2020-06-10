const ArticlesService = require('../src/articles-service')
const knex = require('knex');

describe('Articles service object', function () {
    let db;

    let testArticles = [
        {
            title: 'First test post!',
            content: 'Lorem ipsum',
        },
        {
            title: 'Second test post!',
            content: 'Lorem ipsum',
        },
        {
            title: 'Third test post!',
            content: 'Lorem ipsum',
        },
    ]
    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
    })

    describe('getAllArticles()', () => {
        it(`resolves all articles from 'blogful_articles' table`, () => {
            // test that ARticlesService.getAllArticles get data from table
        })
    })
})