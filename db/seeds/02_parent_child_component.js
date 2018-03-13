
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('parent_child_component').del()
    .then(function () {
      // Inserts seed entries
      return knex('parent_child_component').insert([
        {parent_id: null, child_id: 1},
        {parent_id: 1, child_id: 2},
        {parent_id: 1, child_id: 3},
        {parent_id: 2, child_id: 4},
        {parent_id: 2, child_id: 5},
      ]);
    });
};
