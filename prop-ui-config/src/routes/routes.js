import {RouterUtils} from '@prop-ui/lib-common';

const routes = {
  path: '/props/:propCode/config',
  component: require('../containers/App').default,
  childRoutes: [
    {
      path: 'general-setup',
      key: 'generalSetup',
      childRoutes: [
        {
          path: 'property-defaults',
          key: 'def_propertyDefault',
          component: require('../components/general-setup/property-defaults/Index').default,
          sections: ['preferences', 'localInfo', 'frontDesk', 'frontDesk_frontDeskNotifications']
        }, {
          path: 'reservations',
          key: 'reservations',
          component: require('../components/general-setup/Reservations').default,
          sections: ['ratePlanGroup', 'groupReservation_groupSettings']
        }, {
          path: 'receipt-setup',
          key: 'receiptSetup',
          component: require('../components/general-setup/ReceiptSetup').default,
          sections: ['receiptSetup_printingOptions', 'officalReports', 'receiptSetup_informationBills', 'receiptSetup_duplicates', 'receiptSetup_printerSettings']
        }, {
          path: 'guest-receipt-messages',
          key: 'guestReceiptMessages',
          component: require('../components/general-setup/GuestReceiptMessages').default
        }, {
          path: 'request-codes',
          key: 'requestCodes',
          component: require('../components/general-setup/RequestCodes').default
        }, {
          path: 'currency',
          key: 'currency',
          component: require('../components/general-setup/Currency').default
        }
      ]
    }, {
      path: 'rooms',
      key: 'rooms',
      childRoutes: [
        {
          path: 'lounge',
          key: 'lounge',
          component: require('../components/rooms/Lounge').default,
          sections: ['billDesk']
        }
      ]
    }, {
      path: 'housekeeping',
      key: 'housekeeping',
      childRoutes: [
        {
          path: 'maintenance',
          key: 'maintenance',
          component: require('../components/housekeeping/Maintenance').default,
          sections: ['serviceTeam']
        }
      ]
    }, {
      path: 'posting',
      key: 'posting',
      childRoutes: [
        {
          path: 'management',
          key: 'management',
          component: require('../components/posting/Management').default,
          sections: ['levels']
        }
      ]
    }, {
      path: 'accounts-receivable',
      key: 'accountsReceivable',
      childRoutes: [
        {
          path: 'accounts',
          key: 'accounts',
          component: require('../components/accounts-receivable/Accounts').default,
          sections: ['typeOfAccounts']
        }
      ]
    }, {
      path: 'reports',
      key: 'reports',
      childRoutes: [
        {
          path: 'reports',
          key: 'reports',
          component: require('../components/reports/Reports').default,
          sections: ['typeOfReports']
        }
      ]
    }, {
      path: 'user-setup',
      key: 'userSetup',
      childRoutes: [
        {
          path: 'users',
          key: 'users',
          component: require('../components/user-setup/Users').default,
          sections: ['typeOfUsers']
        }
      ]
    }
  ]
};

export default RouterUtils.prepareRoutes(routes, null);
