'use strict'

const Lucid = use('Lucid')

class Ticket extends Lucid {


  user() {
    return this.belongsTo('App/Model/User', 'id', 'user_id');
  }
  event() {
    return this.belongsTo('App/Model/Event', 'id', 'event_id');
  }
}

module.exports = Ticket
