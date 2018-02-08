
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('events')
        .insert({title:'midterm demo party' , description: 'Party goes on after demo. Everyone deserve it.', location: 'Lighthouse Labs', organizer_name: 'Shaun', organizer_email: 'shaunmacp@gmail.com'})
      ]);
    });
};
