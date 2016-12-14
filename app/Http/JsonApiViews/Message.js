const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Message extends JsonApiView {
  get attributes() {
    return ['message'];
  }

  user() {
    return this.belongsTo('App/Http/JsonApiViews/User', {
      included: true,
      excludeRelation: 'messages'
    });
  }

}

module.exports = Message;
