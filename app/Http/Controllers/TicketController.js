'use strict';

const Ticket = use('App/Model/Ticket');
const attributes = ['quantity'];

class TicketController {

  * index(request, response) {
    const tickets = yield Ticket.with('user', 'event').fetch();

    response.jsonApi('Ticket', tickets);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      user_id: this.currentUser.id,
      event_id: request.jsonApi.getRelationId('event'),
    };
    const ticket = yield Ticket.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Ticket', ticket);
  }

  * show(request, response) {
    const id = request.param('id');
    const ticket = yield Ticket.with('user', 'event').where({ id }).firstOrFail();

    response.jsonApi('Ticket', ticket);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      event_id: request.jsonApi.getRelationId('event'),
    };

    const ticket = yield Ticket.with('user', 'event').where({ id }).firstOrFail();
    ticket.fill(Object.assign({}, input, foreignKeys));
    yield ticket.save();

    response.jsonApi('Ticket', ticket);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const ticket = yield Ticket.query().where({ id }).firstOrFail();
    yield ticket.delete();

    response.status(204).send();
  }

}

module.exports = TicketController;
