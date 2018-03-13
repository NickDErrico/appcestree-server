exports.up = function(knex, Promise) {
  return knex.schema.createTable('parent_child_component', (table) => {
    table.increments();
    table.integer('parent_id').references('id').inTable('components');
    table.integer('child_id').references('id').inTable('components');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('parent_child_component');
};
