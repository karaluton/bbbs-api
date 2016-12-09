const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Ticket extends JsonApiView {
  get attributes() {
    return ['quantity'];
  }

  user() {
    return this.belongsTo('App/Http/JsonApiViews/User', {
      included: true,
      excludeRelation: 'tickets'
    });
  }

  event() {
    return this.belongsTo('App/Http/JsonApiViews/Event', {
      included: true,
      excludeRelation: 'tickets'
    });
  }

}

module.exports = Ticket;
