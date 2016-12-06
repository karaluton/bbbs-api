const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Event extends JsonApiView {
  get attributes() {
    return ['name', 'date', 'location', 'startTime', 'endTime', 'tickets', 'users'];
  }

}

module.exports = Event;
