
'use strict';

const User = use('App/Model/User');
const snakeCaseKeys = require('snakecase-keys');
const Hash = use('Hash');
const File = use('File');
const Mail = use('Mail');
const attributes = [
  'email',
  'password',
  'employer',
  'phone',
  'first-name',
  'last-name',
  'little',
  'is-admin',
  'is-approved',
];

class UserController {

  get createRules() {
    return {
      email: 'required|email|unique:users',
      password: 'required',
    };
  }

  get createMessages() {
    return {
      'email.unique': 'That email has already been used by another account',
    };
  }

  * index(request, response) {
    if (request.input('current')) {
      const user = request.authUser;

      yield user.related('tickets.event').load();

      return response.jsonApi('User', user);
    }
    const users = yield User.with().fetch();

    response.jsonApi('User', users);
  }

  * store(request, response) {
    const profilePic = request.file('uploadFile', {
      maxSize: '10mb',
      allowedExtensions: ['jpg', 'png', 'jpeg'],
    });

    if (profilePic && profilePic.exists()) {
      const attrs = snakeCaseKeys(request.all());

      yield File.upload(profilePic.clientName(), profilePic);

      attrs.password = yield Hash.make(attrs.password);
      const foreignKeys = {
      };
      const user = yield User.create(Object.assign({}, attrs, foreignKeys));

      attrs.profile_pic_url = profilePic.clientName();
      attrs.profile_pic_extension = profilePic.extension();

      user.fill(attrs);
      yield user.save();

      return response.jsonApi('User', user);
    }

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    yield request.jsonApi.assertValid(input, this.createRules, this.createMessages);

    input.password = yield Hash.make(input.password);
    const foreignKeys = {
    };
    const user = yield User.create(Object.assign({}, input, foreignKeys));

    yield Mail.send('emails.welcome', user, (message) => {
      message.to(user.email, user.first_name);
      message.from('awesome@adonisjs.com');
      message.subject('Welcome to the Kitten\'s World');
    });

    response.jsonApi('User', user);
  }

  * show(request, response) {
    const id = request.param('id');
    const user = yield User.with().where({ id }).firstOrFail();

    response.jsonApi('User', user);
  }

  * update(request, response) {
    const profilePic = request.file('uploadFile', {
      maxSize: '10mb',
      allowedExtensions: ['jpg', 'png', 'jpeg'],
    });

    const id = request.param('id');
    const user = yield User.with().where({ id }).firstOrFail();

    if (profilePic && profilePic.exists()) {
      const attrs = snakeCaseKeys(request.all());

      yield File.upload(profilePic.clientName(), profilePic);

      attrs.profile_pic_url = profilePic.clientName();
      attrs.profile_pic_extension = profilePic.extension();

      user.fill(attrs);
      yield user.save();

      return response.jsonApi('User', user);
    }

    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };

    if (!input.password) {
      delete input.password;
    }

    user.fill(Object.assign({}, input, foreignKeys));
    yield user.save();

    response.jsonApi('User', user);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const user = yield User.query().where({ id }).firstOrFail();
    yield user.delete();

    response.status(204).send();
  }

}

module.exports = UserController;
