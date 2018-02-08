
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('attendees_slots').del()
    .then(function () {
      return Promise.all([
        knex('attendees_slots')
        .insert({attendee_id: (knex.select('id').from('attendees').where('name', 'Prerana')), slot_id: (knex.select('id').from('slots').where('date', '2018-02-07')) })
      ]);
    });
};

