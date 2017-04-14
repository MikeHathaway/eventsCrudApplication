
exports.seed = function(knex, Promise) {
  return knex('tickets').del()
    .then(function () {
      return knex('tickets').insert([
        {id: 1, events_id: 1, name: 'General Admission', price: 42},
        {id: 2, events_id: 1, name: 'General Admission', price: 42},
        {id: 3, events_id: 2, name: 'VIP', price: 1000000000},
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('tickets_id_seq', (SELECT MAX(id) FROM tickets));"
      )
    })
};
