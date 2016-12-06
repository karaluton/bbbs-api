'use strict';

const Schema = use('Schema');

class EventSchema extends Schema {

  up() {
    this.create('events', (table) => {
      table.increments();
      table.string('name');
      table.date('date');
      table.string('location');
      table.integer('startTime');
      table.integer('endTime');
      table.integer('tickets');

      table.timestamps();
    });
  }

  down() {
    this.drop('events');
  }

}

module.exports = EventSchema;
