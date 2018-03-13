exports.up = function(knex, Promise) {
  return knex.schema.createTable('components', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('parents');
    table.string('children');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('components');
};
