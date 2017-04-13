
exports.seed = function(knex) {
  return knex('attendee_tickets').del()
    .then(function () {
      return knex('attendee_tickets').insert([
        {id: 1, ticket_id: 1, attendee_id: 1},
        {id: 2, ticket_id: 2, attendee_id: 2},
        {id: 3, ticket_id: 3, attendee_id: 3},
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('attendee_tickets_id_seq', (SELECT MAX(id) FROM attendee_tickets));"
      )
    })
};
