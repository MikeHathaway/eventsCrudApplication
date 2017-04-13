
exports.seed = function(knex, Promise) {
  return knex('events').del()
    .then(function () {
      return knex('events').insert([
        {id: 1, venues_id: 1, title: 'rowValue1'},

      ]);
    });
};
