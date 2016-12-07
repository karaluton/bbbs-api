'use strict';

const Schema = use('Schema');

class EventSchema extends Schema {

  up() {
    this.create('events', (table) => {
      table.increments();
      table.string('name');
      table.date('date');
      table.string('location');
      table.timestamp('start_time');
      table.timestamp('end_time');
      table.integer('tickets');
      table.text('message');

      table.timestamps();
    });
  }

  down() {
    this.drop('events');
  }

}

module.exports = EventSchema;
