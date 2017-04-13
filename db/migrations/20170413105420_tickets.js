
exports.up = function(knex) {
  return knex.schema.createTable('tickets', (table) => {
    table.increments('id')
    table.foreign('events_id').unsigned().references('id').inTable('events')
    table.string('name').notNullable()
    table.decimal('price').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tickets')
};
