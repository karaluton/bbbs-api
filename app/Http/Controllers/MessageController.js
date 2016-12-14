'use strict';

const Message = use('App/Model/Message');
const attributes = ['message'];

class MessageController {

  * index(request, response) {
    const messages = yield Message.with('user').fetch();

    response.jsonApi('Message', messages);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      user_id: request.currentUser.id,
    };
    const message = yield Message.create(Object.assign({}, input, foreignKeys));

    yield message.related('user').load();

    response.jsonApi('Message', message);
  }

  * show(request, response) {
    const id = request.param('id');
    const message = yield Message.with('user').where({ id }).firstOrFail();

    response.jsonApi('Message', message);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      user_id: request.currentUser.id,
    };

    const message = yield Message.with('user').where({ id }).firstOrFail();
    message.fill(Object.assign({}, input, foreignKeys));
    yield message.save();

    response.jsonApi('Message', message);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const message = yield Message.query().where({ id }).firstOrFail();
    yield message.delete();

    response.status(204).send();
  }

}

module.exports = MessageController;
