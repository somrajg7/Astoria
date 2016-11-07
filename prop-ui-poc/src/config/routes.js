import {RouterUtils} from '@prop-ui/common';

const routes = {
  path: '/props/:propCode/poc',
  component: require('../containers/App').default,
  childRoutes: [
    {
      path: 'main',
      key: 'Main',
      component: require('../components/Main').default
    }, {
      path: 'about',
      key: 'About',
      component: require('../components/About').default
    }, {
      path: 'library',
      key: 'UI Library',
      childRoutes: [
        {
          path: 'datatable',
          key: 'SampleDataTable',
          component: require('../components/library/SampleDataTable').default
        }, 
        {
          path: 'alerts',
          key: 'Alerts',
          component: require('../components/library/Alerts').default
        }, {
          path: 'buttons',
          key: 'Buttons',
          component: require('../components/library/Buttons').default
        }, {
          path: 'checkboxes',
          key: 'Checkboxes',
          component: require('../components/library/Checkboxes').default
        }, {
          path: 'modals',
          key: 'Modals',
          component: require('../components/library/Modals').default
        }, {
          path: 'panels',
          key: 'Panels',
          component: require('../components/library/Panels').default
        }, {
          path: 'radios',
          key: 'Radios',
          component: require('../components/library/Radios').default
        }, {
          path: 'selects',
          key: 'Selects',
          component: require('../components/library/Selects').default
        }, {
          path: 'tables',
          key: 'Tables',
          component: require('../components/library/Tables').default
        }, {
          path: 'text-inputs',
          key: 'Text Inputs',
          component: require('../components/library/TextInputs').default
        }
      ]
    }
  ]
};

export default RouterUtils.prepareRoutes(routes, null);
