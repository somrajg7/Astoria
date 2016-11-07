'use strict';

import baseConfig from './base';

let config = {
  appEnv: '{{ENVIRONMENT}}',
  propConfigApi: '{{API_HOST}}/props/config',
  propsApi: '{{API_HOST}}/props',
  propsConfigApi: '{{API_HOST}}/props/:propCode/config',
  oAuthId: '{{OAUTH_ID}}',
  oAuthSecret: '{{OAUTH_SECRET}}'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
