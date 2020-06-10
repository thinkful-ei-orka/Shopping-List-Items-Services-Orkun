const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')

describe('Shopping List object', function () {
    let db;

    let testItems = [
        {
            id: 1,
            name: 'First test item!',
            date_added: new Date('2029-01-22T16:28:32.615Z'),
            price: '12.00',
            category: 'Main',
            checked: false
          },
          {
            id: 2,
            name: 'Second test item!',
            date_added: new Date('2100-05-22T16:28:32.615Z'),
            price: '21.00',
            category: 'Snack',
            checked: false
          },
          {
            id: 3,
            name: 'Third test item!',
            date_added: new Date('1919-12-22T16:28:32.615Z'),
            price: '3.00',
            category: 'Lunch',
            checked: false
            
          },
          {
            id: 4,
            name: 'Third test item!',
            date_added: new Date('1919-12-22T16:28:32.615Z'),
            price: '0.99',
            category: 'Breakfast',
            checked: false
          },
    ]

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
    })

    before(() => db('shopping_list').truncate());
    afterEach(() => db('shopping_list').truncate());

    after(() => db.destroy())

    context(`Given 'shopping_list' has data`, () => {
        beforeEach(() => {
            return db
                .into('shopping_list')
                .insert(testItems)
        })
        it(`getAllItems() resolves all articles from 'blogful_articles table`, () => {
            return ShoppingListService.getAllItems(db)
                .then(actual => {
                    expect(actual).to.eql(testItems)
                })
        })

        it(`updateItem() updates an item from the 'shopping_list'`, () => {
            const idOfItemToUpdate = 2;
            const newItemData = {
                name: 'New Item Name',
                price: '2.25',
                date_added: new Date(),
                checked: false,
                category: 'Snack'
            };
            return ShoppingListService.updateItem(db, idOfItemToUpdate, newItemData)
                .then(() => ShoppingListService.getById(db, idOfItemToUpdate))
                .then(item => {
                    console.log(item)
                    expect(item).to.eql({
                        id: idOfItemToUpdate,
                        ...newItemData
                    })
                })
        })

        it(`getById() resolves an item by id from 'shopping_list' table`, () => {
            const secondId = 2;
            const secondTestItem = testItems[secondId - 1];
            return ShoppingListService.getById(db, secondId)
                .then(actual => {
                    expect(actual).to.eql({
                        id: secondId,
                        name: secondTestItem.name,
                        price: secondTestItem.price,
                        checked: secondTestItem.checked,
                        category: secondTestItem.category,
                        date_added: secondTestItem.date_added
                    })
                })
        })

        it(`deleteItem() removes an item from 'shopping_list' table`, () => {
            const itemId = 2;
            return ShoppingListService.deleteItem(db, itemId)
                .then(() => ShoppingListService.getAllItems(db))
                .then(allItems => {
                    const expected = testItems.filter(item => item.id !== itemId)
                    expect(allItems).to.eql(expected)
                })
        })
    })

    context(`Given 'shopping_list' has no data`, () => {
        it(`getAllItems() resolves an empty array`, () => {
            return ShoppingListService.getAllItems(db)
                .then(actual => {
                    expect(actual).to.eql([])
                })
        })

        it(`insertItem() inserts a new item and resolves the new article with an 'id'`, () => {
            const newItem = {
                name: 'New Item Name',
                price: '12.75',
                date_added: new Date('2020-01-01T00:00:00.000Z'),
                checked: false,
                category: 'Lunch'
            };
            return ShoppingListService.insertItem(db, newItem)
                .then(actual => {
                    expect(actual).to.eql({
                        id: 1,
                        name: newItem.name,
                        price: newItem.price,
                        checked: newItem.checked,
                        category: newItem.category,
                        date_added: newItem.date_added
                    })
                })
        })
    })
})