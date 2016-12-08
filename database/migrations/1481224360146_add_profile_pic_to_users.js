'use strict';

const Schema = use('Schema');

class AddProfilePicToUsersTableSchema extends Schema {

  up() {
    this.table('users', (table) => {
      table.string('profile_pic_url');
      table.string('profile_pic_extension');
    });
  }

  down() {
    this.table('users', (table) => {
      table.dropColumn('profile_pic_url');
      table.dropColumn('profile_pic_extension');
    });
  }

}

module.exports = AddProfilePicToUsersTableSchema;
