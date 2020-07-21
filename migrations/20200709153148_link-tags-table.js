exports.up = function (knex, Promise) {
    return knex.schema.createTable('link_tags', (table) => {
        table.increments();
        table.integer('tag_id').unsigned();
        table.foreign('tag_id').references('tags.id');
        table.integer('link_id').unsigned();
        table.foreign('link_id').references('links.id');
    });
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('link_tags');
}