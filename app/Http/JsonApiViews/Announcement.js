const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Announcement extends JsonApiView {
  get attributes() {
    return ['subject', 'message'];
  }

  user() {
    return this.belongsTo('App/Http/JsonApiViews/User', {
      included: true,
      excludeRelation: 'announcements'
    });
  }

}

module.exports = Announcement;
