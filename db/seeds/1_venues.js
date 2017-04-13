
exports.seed = function(knex, Promise) {
  return knex('venues').del()
    .then(function () {
      return knex('venues').insert([
        {
          id: 1,
          name: 'TOWER OF DOOM',
          capacity: 1000,
          line_1: '123 FAKER Street',
          line_2: 'APARTMENT 69',
          city: 'New York',
          state: 'New York',
          zip: 10001
        },
        {
          id: 2,
          name: 'Mount Rushmore',
          capacity: 10000,
          line_1: 'Black Hills National Forest',
          line_2: '13000 SD-244',
          city: 'Keystone',
          state: 'South Dakota',
          zip: 57751
        },
      ]);
    });
};
