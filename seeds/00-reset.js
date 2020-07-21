
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('link_tags').del()
    .then(function () {
      return knex.raw('ALTER SEQUENCE link_tags_id_seq RESTART WITH 1')
    })
    .then(function () {
      return knex('links').del()
    })
    .then(function () {
      return knex.raw('ALTER SEQUENCE links_id_seq RESTART WITH 1')
    })
    .then(function () {
      return knex('tags').del()
    })
    .then(function () {
      return knex.raw('ALTER SEQUENCE tags_id_seq RESTART WITH 1')
    })
};
