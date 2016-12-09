'use strict';

const Ticket = use('App/Model/Ticket');
const attributes = ['quantity'];

class TicketController {

  convertEvent(event) {
    let ticketClaimedSum = 0;

    if (event.claimedTickets) {
      ticketClaimedSum = event.claimedTickets.reduce((sum, val) => sum + val.quantity, 0);
    }

    return Object.assign({
      remaining_tickets: event.tickets - ticketClaimedSum,
    }, event);
  }

  * index(request, response) {
    const tickets = yield Ticket.with('user', 'event.claimedTickets').fetch();

    response.jsonApi('Ticket', tickets);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      user_id: request.currentUser.id,
      event_id: request.jsonApi.getRelationId('event'),
    };
    const ticket = yield Ticket.create(Object.assign({}, input, foreignKeys));

    yield ticket.related('event.claimedTickets', 'user').load();

    const ticketComputed = ticket.toJSON();

    ticketComputed.event = this.convertEvent(ticketComputed.event);

    response.jsonApi('Ticket', ticketComputed);
  }

  * show(request, response) {
    const id = request.param('id');
    const ticket = yield Ticket.with('user', 'event.claimedTickets').where({ id }).firstOrFail();

    const ticketComputed = ticket.toJSON();

    ticketComputed.event = this.convertEvent(ticketComputed.event);

    response.jsonApi('Ticket', ticketComputed);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      event_id: request.jsonApi.getRelationId('event'),
    };

    const ticket = yield Ticket.with('user', 'event.claimedTickets').where({ id }).firstOrFail();
    ticket.fill(Object.assign({}, input, foreignKeys));
    yield ticket.save();

    const ticketComputed = ticket.toJSON();

    ticketComputed.event = this.convertEvent(ticketComputed.event);

    response.jsonApi('Ticket', ticketComputed);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const ticket = yield Ticket.query().where({ id }).firstOrFail();
    yield ticket.delete();

    response.status(204).send();
  }

}

module.exports = TicketController;
