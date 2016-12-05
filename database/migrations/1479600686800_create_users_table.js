'use strict';

const Schema = use('Schema');

class UsersTableSchema extends Schema {

  up() {
    this.create('users', (table) => {
      table.increments();
      // table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique();
      table.string('password', 60).notNullable();
      table.boolean('is_admin').default(false);
      table.boolean('is_approved').default(false);

      table.string('employer');
      table.string('phone');
      table.string('first_name');
      table.string('last_name');
      table.string('little');
      table.timestamps();
    });
  }

  down() {
    this.drop('users');
  }

}

module.exports = UsersTableSchema;
