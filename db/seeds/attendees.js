
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('attendees').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('attendees').insert({name: 'Prerana', email: 'prerana.sh@gmail.com'}),
        knex('attendees').insert({name: 'Sudip', email: 'sudip.sh@gmail.com'}),
        knex('attendees').insert({name: 'Dercilio', email: 'dercilioafontes@gmail.com'}),
        knex('attendees').insert({name: 'Shay', email: 'shaytopazehair@gmail.com'}),
      ]);
    });
};
