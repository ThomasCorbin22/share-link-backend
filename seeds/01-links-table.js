
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('links').del()
    .then(function () {
      // Inserts seed entries
      return knex('links').insert([
        { name: 'Facebook', url: 'https://facebook.com' },
        { name: 'Google', url: 'https://google.com' },
        { name: 'BBC', url: 'https://bbc.com' }
      ]);
    });
};
