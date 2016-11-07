import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {I18nextProvider} from 'react-i18next';
import configureStore from './stores';
import routes from './routes/routes';
import {i18n} from '@prop-ui/lib-common';
import {RouterUtils} from '@prop-ui/lib-common';

// Initialize i18n
i18n.initialize(require('../build/cbdata/docs/en-US%3a%3amessages%3a%3aconfig.json'));

const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

render(
  <I18nextProvider i18n={i18n}>
  <Provider store={store}>
    <Router routes={routes} history={history} onUpdate={RouterUtils.hashLinkScroll}/>
  </Provider>
</I18nextProvider>, document.getElementById('app'));
