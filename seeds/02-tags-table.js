
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        { name: 'Social' },
        { name: 'News' },
        { name: 'Messaging' },
        { name: 'Search' }
      ]);
    });
};
