
exports.seed = function(knex) {
  return knex('events').del()
    .then(function () {
      return knex('events').insert([
        {id: 1, venues_id: 1, title: 'Functional Programming Conference', description: 'Annual conference to discuss the latest and greatest news in the Functional Programming community.', over_21: false, start_datetime: new Date('2017-06-26 14:26:16 UTC'), end_datetime: new Date('2016-06-28 14:26:16 UTC')},
        {id: 2, venues_id: 1, title: 'Clown Convention', description: 'Get down to clown', over_21: true, start_datetime: new Date('2017-06-01 14:26:16 UTC'), end_datetime: new Date('2016-06-05 14:26:16 UTC')},
        {id: 3, venues_id: 2, title: 'Creativity Conference 2017', description: 'Cautiously converse catchprashes concerning creativity!', over_21: false, start_datetime: new Date('2017-07-20 14:26:16 UTC'), end_datetime: new Date('2017-07-28 14:26:16 UTC')}
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('events_id_seq', (SELECT MAX(id) FROM events));"
      )
    })
};
