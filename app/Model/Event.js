'use strict';

const Lucid = use('Lucid');

class Event extends Lucid {

  claimedTickets() {
    return this.hasMany('App/Model/Ticket');
  }

}

module.exports = Event;
