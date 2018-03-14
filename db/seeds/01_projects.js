
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {name: 'TEST1'},
        {name: 'TEST2'},
        {name: 'TEST3'},
        {name: 'TEST4'},
        {name: 'TEST5'},
      ]);
    });
};
