import 'isomorphic-fetch';
import reduxApi from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';

// Import env specific configurations
const config = require('config').default;

const rest = reduxApi({
  prop: {
    url: `${config.propsApi}/:propCode`,
    options: function() {
      return {
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'en-US'
        }
      };
    }
  },
  linkedprops: {
    url: `${config.propsConfigApi}/linkedprops`,
    options: function() {
      return {
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'en-US'
        }
      };
    },
    postfetch: [function({data, actions, dispatch, getState, request}) {
        //dispatch(actions.user.reset());
        console.log('postfetch', data);
      }
    ]
  }
});

// Define the rest adapter to user
rest.use('fetch', adapterFetch(fetch));

export default rest;
