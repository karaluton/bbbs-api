'use strict';

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route');

Route.post('/api/users', 'UserController.store');

Route.resource('/api/users', 'UserController')
  .only(['index', 'show', 'update', 'destroy'])
  .middleware('auth');

Route.resource('/api/events', 'EventController')
  .except(['create', 'edit']);

Route.resource('/api/announcements', 'AnnouncementController').except(['create', 'edit']);
Route.resource('/api/tickets', 'TicketController').except(['create', 'edit']);

Route.resource('/api/messages', 'MessageController').except(['create', 'edit']);

Route.post('/api/token-auth', 'SessionController.store');

const File = use('File');
const Env = use('Env');

Route.get('/uploads/*', function* (request, response) {
  const type = Env.get('FILE_DRIVER');

  if (type === 's3') {
    return response.redirect(`https://s3.amazonaws.com/${Env.get('S3_BUCKET')}/${request.param(0)}`);
  }

  const stream = File.getStream(request.param(0));

  stream.pipe(response.response);
});
