
exports.up = function(knex) {
  return knex.schema.createTable('attendees', (table) => {
    table.increments('id')
    table.string('preferred_name',255).notNullable()
    table.string('last_name',255).notNullable()
    table.date('birthday').notNullable()
    table.string('email',255).notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('attendees')
};
