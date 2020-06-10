const ShoppingListService = {
    getAllItems(knex) {
        return knex.select('*').from('shopping_list')
    },
    updateItem(knex, id, newItem) {
        return knex('shopping_list')
            .where({ id })
            .update(newItem)
    },
    getById(knex, id) {
        return knex('shopping_list')
            .select('*')
            .where('id', id).first()
    },
    deleteItem(knex, id) {
        return knex('shopping_list')
            .where({ id })
            .delete()
    },
    insertItem(knex, newItem) {
        return knex('shopping_list')
            .insert(newItem)
            .into('shopping_list')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    }

}

module.exports = ShoppingListService