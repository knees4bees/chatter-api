
exports.up = function(knex) {
  return knex.schema
    .createTable('users', function(table) {
      table.increments('id').primary();
      table.string('first_name');
      table.string('last_name');
      table.timestamps(false, true);
    })
    .createTable('messages', function(table) {
      table.increments('id').primary();
      table.integer('sender_id');
      table.integer('recipient_id');
      table.text('content');
      table.timestamps(false, true);
      table.foreign('sender_id').references('users.id');
      table.foreign('recipient_id').references('users.id');
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('messages')  
    .dropTable('users')
};
