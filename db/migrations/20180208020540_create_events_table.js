exports.up = function(knex, Promise) {
  // migrate forward - Creates events_table
  return knex.schema.createTable('events', function (table) {
    table.increments('id');
    table.string('title');
    table.string('description');
    table.string('location');
    table.string('organizer_name');
    table.string('organizer_email');
    table.string('url');
  });

};

exports.down = function(knex, Promise) {
  // migrate backward - Remove the events_table
  return knex.schema.dropTable('events');
};
