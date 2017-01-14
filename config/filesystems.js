'use strict';

const Env = use('Env');
const Helpers = use('Helpers');

module.exports = {

  default: Env.get('FILE_DRIVER', 'public'),

  public: {
    driver: 'local',
    root: Helpers.publicPath('uploads'),
    options: {
      encoding: 'utf8',
    },
  },

  protected: {
    driver: 'local',
    root: Helpers.storagePath('app'),
    options: {
      encoding: 'utf8',
    },
  },

  s3: {
    driver: 'pkgcloud',
    container: Env.get('S3_BUCKET'),
    options: {
      provider: 'amazon',
      keyId: Env.get('S3_KEY'), // access key id
      key: Env.get('S3_SECRET'), // secret key
      region: Env.get('S3_REGION'), // region
    },
  },

};
