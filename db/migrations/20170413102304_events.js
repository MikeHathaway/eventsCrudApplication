
exports.up = function(knex) {
  return knex.schema.createTable('events', (table) => {
    table.increments('id')
    table.foreign('venues_id').unsigned().references('id').inTable('venues')
    table.string('title',255).notNullable()
    table.string('description',255).notNullable()
    table.boolean('over_21').notNullable()
    table.dateTime('start_datetime')
    table.dateTime('end_datetime')
    table.timestamps(true,true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('events')
};
