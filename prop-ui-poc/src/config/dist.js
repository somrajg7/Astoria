'use strict';

import baseConfig from './base';

let config = {
  appEnv: '{{ENVIRONMENT}}',
  apiHost: '{{API_HOST}}',
  oAuthId: '{{OAUTH_ID}}',
  oAuthSecret: '{{OAUTH_SECRET}}'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
