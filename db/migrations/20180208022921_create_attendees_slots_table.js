
exports.up = function(knex, Promise) {
  // migrate forward - Creates attendees_slots_table
  return knex.schema.createTable('attendees_slots', function (table) {
    table.increments('id');
    table.integer('attendee_id').unsigned();
    table.foreign('attendee_id').references('attendees.id');
    table.integer('slot_id').unsigned();
    table.foreign('slot_id').references('slots.id');
  });
  
};

exports.down = function(knex, Promise) {
  // migrate backward - Remove the attendees_slots_table
  return knex.schema.dropTable('attendees_slots');
};
