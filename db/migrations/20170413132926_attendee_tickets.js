
exports.up = function(knex) {
  return knex.schema.createTable('attendee_tickets', (table) => {
    table.increments('id')
    table.integer('ticket_id').notNullable()
    table.integer('attendee_id').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('attendee_tickets')
};
