
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('components').del()
    .then(function () {
      // Inserts seed entries
      return knex('components').insert([
        {name: 'App', is_stateful:false, is_route:true, project_id: 1},
        {name: 'Auth', is_stateful:true, is_route:true, project_id: 1},
        {name: 'UserDash', is_stateful:true, is_route:true, project_id: 1},
        {name: 'Login', is_stateful:false, is_route:true, project_id: 1},
        {name: 'Signup', is_stateful:false, is_route:false, project_id: 1},
      ]);
    });
};
