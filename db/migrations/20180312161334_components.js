exports.up = function(knex, Promise) {
  return knex.schema.createTable('components', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.boolean('is_stateful').defaultTo(false);
    table.boolean('is_route').defaultTo(false);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('components');
};
