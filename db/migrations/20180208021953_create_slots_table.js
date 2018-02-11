
exports.up = function(knex, Promise) {
  // migrate forward - Creates slots_table
  return knex.schema.createTable('slots', function (table) {
    table.increments('id');
    table.string('date');
    table.string('start_time');
    table.string('end_time');
    table.integer('event_id').unsigned();
    table.foreign('event_id').references('events.id');
  });

};

exports.down = function(knex, Promise) {
  // migrate backward - Remove the slots_table
  return knex.schema.dropTable('slots');
};
