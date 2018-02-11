// slots (1 FK – events.id)
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('slots').del()
    .then(function () {
      return Promise.all([
        // // Inserts seed entries in slots table
        knex('slots').insert([
          {
            date: '2018-02-07', 
            start_time: '04:00 PM', 
            end_time: '06:00 PM', 
            event_id: 1
          },
          {
            date: '2018-02-08', 
            start_time: '05:00 PM', 
            end_time: '07:00 PM', 
            event_id: 1
          }
        ]),
      ]);
    });
 };