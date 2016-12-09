const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Event extends JsonApiView {
  get attributes() {
    return [
      'name',
      'date',
      'location',
      'start_time',
      'end_time',
      'tickets',
      'users',
      'message',
      'remaining_tickets',
    ];
  }
}

module.exports = Event;
