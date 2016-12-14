const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class User extends JsonApiView {
  get attributes() {
    return [
      'email',
      'employer',
      'phone',
      'first_name',
      'last_name',
      'is_admin',
      'is_approved',
      'little',
      'profile_pic_url',
    ];
  }

  tickets() {
    return this.hasMany('App/Http/JsonApiViews/Ticket', {
      included: true,
      excludeRelation: 'user',
    });
  }

}

module.exports = User;
