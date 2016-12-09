'use strict';

const Schema = use('Schema');

class TicketSchema extends Schema {

  up() {
    this.create('tickets', (table) => {
      table.increments();
      table.integer('user_id').references('users.id');
      table.integer('event_id').references('events.id');
      table.integer('quantity');
      table.timestamps();
    });
  }

  down() {
    this.drop('tickets');
  }

}

module.exports = TicketSchema;
