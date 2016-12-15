'use strict';

const Event = use('App/Model/Event');
const moment = require('moment');
const attributes = [
  'name',
  'date',
  'location',
  'start-time',
  'end-time',
  'tickets',
  'users',
  'message',
];

function setTimestamps(inputs) {
  return Object.assign({}, inputs, {
    start_time: moment(`${inputs.date} ${inputs.start_time}`),
    end_time: moment(`${inputs.date} ${inputs.end_time}`),
  });
}

class EventController {

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
    const events = yield Event.with('claimedTickets').fetch();
    const showEvents = events.toJSON().map(this.convertEvent);

    response.jsonApi('Event', showEvents);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };

    const attrs = setTimestamps(input);

    const event = yield Event.create(Object.assign({}, attrs, foreignKeys));

    response.jsonApi('Event', this.convertEvent(event.toJSON()));
  }

  * show(request, response) {
    const id = request.param('id');
    const event = yield Event.with().where({ id }).firstOrFail();

    response.jsonApi('Event', this.convertEvent(event.toJSON()));
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };

    const attrs = setTimestamps(input);

    const event = yield Event.with().where({ id }).firstOrFail();
    event.fill(Object.assign({}, attrs, foreignKeys));
    yield event.save();

    response.jsonApi('Event', this.convertEvent(event.toJSON()));
  }

  * destroy(request, response) {
    const id = request.param('id');

    const event = yield Event.query().where({ id }).firstOrFail();
    yield event.delete();

    response.status(204).send();
  }

}

module.exports = EventController;
