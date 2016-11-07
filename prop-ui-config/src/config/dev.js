'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dev',
  propConfigApi: 'http://localhost:9000/props/config',
  propsApi: 'http://localhost:9000/props',
  propsConfigApi: 'http://localhost:9000/props/:propCode/config'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
