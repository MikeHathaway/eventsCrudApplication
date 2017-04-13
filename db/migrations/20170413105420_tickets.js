
exports.up = function(knex) {
  return knex.schema.createTable('tickets', (table) => {
    table.increments('id')
    table.integer('events_id').notNullable()
    table.string('name').notNullable()
    table.integer('price').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tickets')
};
