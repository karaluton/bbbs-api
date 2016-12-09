'use strict'

const Lucid = use('Lucid')

class Announcement extends Lucid {


  user() {
    return this.belongsTo('App/Model/User', 'id', 'user_id');
  }
}

module.exports = Announcement
