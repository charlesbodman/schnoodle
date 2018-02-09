
// events
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('events')
        .insert({
          title:'midterm demo party', 
          description: 'Party goes on after demo. Everyone deserve it.', 
          location: 'Lighthouse Labs', 
          organizer_name: 'Shaun', 
          organizer_email: 'shaunmacp@gmail.com', 
          url: '/events/abcde'})
      ]);
    });
};

// attendees
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('attendees').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('attendees').insert({
          name: 'Prerana', 
          email: 'prerana.sh@gmail.com'}),
        knex('attendees').insert({
          name: 'Sudip', 
          email: 'sudip.sh@gmail.com'}),
        knex('attendees').insert({
          name: 'Dercilio', 
          email: 'dercilioafontes@gmail.com'}),
        knex('attendees').insert({
          name: 'Shay', 
          email: 'shaytopazehair@gmail.com'}),
      ]);
    });
};

// slots (1 FK – events.id)
exports.seed = function(knex, Promise) {
 // Deletes ALL existing entries
 return knex('slots').del()
   .then(function () {
     return Promise.all([
       // // Inserts seed entries in slots table
       knex('slots').insert({
         date: '2018-02-07', 
         start_time: '17:00:00', 
         end_time: '20:00:00', 
         event_id: (knex.select('id').from('events').where('title', 'midterm demo party'))}),
     ]);
   });
};

// attendees_slots (2 FK - attendees.id, slots.id)
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('attendees_slots').del()
    .then(function () {
      return Promise.all([
        knex('attendees_slots')
        .insert({
          attendee_id: (knex.select('id').from('attendees').where('name', 'Prerana')), 
          slot_id: (knex.select('id').from('slots').where('date', '2018-02-07')) })
      ]);
    });
};