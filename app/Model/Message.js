'use strict'

const Lucid = use('Lucid')

class Message extends Lucid {


  user() {
    return this.belongsTo('App/Model/User', 'id', 'user_id');
  }
}

module.exports = Message
