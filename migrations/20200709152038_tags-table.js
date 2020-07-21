exports.up = function (knex, Promise) {
    return knex.schema.createTable('tags', (table) => {
        table.increments();
        table.string("name").notNullable();
        table.unique('name');
    });
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('tags');
}