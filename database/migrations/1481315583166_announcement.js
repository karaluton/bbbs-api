'use strict';

const Schema = use('Schema');

class AnnouncementSchema extends Schema {

  up() {
    this.create('announcements', (table) => {
      table.increments();
      table.string('subject');
      table.text('message');
      table.integer('user_id').references('users.id');
      table.timestamps();
    });
  }

  down() {
    this.drop('announcements');
  }

}

module.exports = AnnouncementSchema;
