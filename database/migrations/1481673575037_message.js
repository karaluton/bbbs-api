'use strict';

const Schema = use('Schema');

class MessageSchema extends Schema {

  up() {
    this.create('messages', (table) => {
      table.increments();
      table.text('message');
      table.integer('user_id').references('users.id');
      table.timestamps();
    });
  }

  down() {
    this.drop('messages');
  }

}

module.exports = MessageSchema;
