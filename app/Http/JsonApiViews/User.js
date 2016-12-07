const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class User extends JsonApiView {
  get attributes() {
    return [
      'email',
      'employer',
      'phone',
      'first_name',
      'last_name',
      'little',
    ];
  }

}

module.exports = User;
