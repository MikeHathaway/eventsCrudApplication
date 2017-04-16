
exports.up = function(knex) {
  return knex.schema.createTable('venues', (table) => {
    table.increments('id')
    table.string('venue_name',255).notNullable()
    table.integer('capacity').notNullable()
    table.string('line_1',255).notNullable()
    table.string('line_2',255).notNullable()
    table.string('city',255).notNullable()
    table.string('state',20).notNullable()
    table.integer('zip').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('venues')
};
