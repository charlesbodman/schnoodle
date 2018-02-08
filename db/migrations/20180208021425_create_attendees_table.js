
exports.up = function(knex, Promise) {
  // migrate forward - Creates attendees_table
  return knex.schema.createTable('attendees', function (table) {
    table.increments('id');
    table.string('name');
    table.string('email');
  });
  
};

exports.down = function(knex, Promise) {
  // migrate backward - Remove the attendees_table
  return knex.schema.dropTable('attendees');
};
