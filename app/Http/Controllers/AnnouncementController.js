'use strict';

const Announcement = use('App/Model/Announcement');
const attributes = ['subject', 'message'];

class AnnouncementController {

  * index(request, response) {
    const announcements = yield Announcement.with('user').fetch();

    response.jsonApi('Announcement', announcements);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      user_id: request.currentUser.id,
    };
    const announcement = yield Announcement.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Announcement', announcement);
  }

  * show(request, response) {
    const id = request.param('id');
    const announcement = yield Announcement.with('user').where({ id }).firstOrFail();

    response.jsonApi('Announcement', announcement);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      user_id: request.currentUser.id,
    };

    const announcement = yield Announcement.with('user').where({ id }).firstOrFail();
    announcement.fill(Object.assign({}, input, foreignKeys));
    yield announcement.save();

    response.jsonApi('Announcement', announcement);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const announcement = yield Announcement.query().where({ id }).firstOrFail();
    yield announcement.delete();

    response.status(204).send();
  }

}

module.exports = AnnouncementController;
