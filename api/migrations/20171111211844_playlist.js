exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('playlist', function(table) {
    table.increments();
    table.string('url').notNullable();
    table.integer('hipchat_user_id').notNullable();
    table.string('hipchat_user_name');
    table.date('date');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {

};
