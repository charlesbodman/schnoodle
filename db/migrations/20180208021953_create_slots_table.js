
exports.up = function(knex, Promise) {
  // migrate forward - Creates slots_table
  return knex.schema.createTable('slots', function (table) {
    table.increments('id');
    table.date('date');
    table.time('start_time');
    table.time('end_time');
    table.integer('event_id').unsigned();
    table.foreign('event_id').references('events.id');
  });

};

exports.down = function(knex, Promise) {
  // migrate backward - Remove the slots_table
  return knex.schema.dropTable('slots');
};
