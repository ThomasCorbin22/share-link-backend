
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('link_tags').del()
        .then(function () {
            // Inserts seed entries
            return knex('link_tags').insert([
                { link_id: 1, tag_id: 1 },
                { link_id: 1, tag_id: 2 },
                { link_id: 1, tag_id: 3 },
                { link_id: 2, tag_id: 4 },
                { link_id: 3, tag_id: 2 }
            ]);
        });
};
