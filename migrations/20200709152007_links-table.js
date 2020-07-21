exports.up = function (knex, Promise) {
    return knex.schema.createTable('links', (table) => {
        table.increments();
        table.string("name").notNullable();
        table.unique('name');
        table.string("url");
    });
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('links');
}