
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('components').del()
    .then(function () {
      // Inserts seed entries
      return knex('components').insert([
        {name: 'App', is_stateful:false, is_route:true},
        {name: 'Auth', is_stateful:true, is_route:true},
        {name: 'UserDash', is_stateful:true, is_route:true},
        {name: 'Login', is_stateful:false, is_route:true},
        {name: 'Signup', is_stateful:false, is_route:false},
      ]);
    });
};
