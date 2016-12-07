'use strict';

const Event = use('App/Model/Event');
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

class EventController {

  * index(request, response) {
    const events = yield Event.with().fetch();

    response.jsonApi('Event', events);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };
    const event = yield Event.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Event', event);
  }

  * show(request, response) {
    const id = request.param('id');
    const event = yield Event.with().where({ id }).firstOrFail();

    response.jsonApi('Event', event);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };

    const event = yield Event.with().where({ id }).firstOrFail();
    event.fill(Object.assign({}, input, foreignKeys));
    yield event.save();

    response.jsonApi('Event', event);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const event = yield Event.query().where({ id }).firstOrFail();
    yield event.delete();

    response.status(204).send();
  }

}

module.exports = EventController;
