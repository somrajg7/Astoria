'use strict';

import i18n from 'i18next';
import Cache from 'i18next-localstorage-cache';

// Add function to initialize i18n with the default messages JSON
i18n.initialize = initialize;
// Add function to transform the messages JSON to an i18n resources object format
i18n.transformMessagesJSON = transformMessagesJSON;
// TODO: Implement
// Add function to change locale
// i18n.changeLocale = changeLocale
// TODO: Implement
// Add function to load new locale resources
// i18n.loadLocaleResources = loadLocaleResources

function initialize(messagesJSON) {
  this.use(Cache).init({
    // The default language
    lng: messagesJSON.locale,

    // Define the fall back language if an in-language message can't be found
    fallbackLng: messagesJSON.locale,

    // Have a common namespace used around the full app
    ns: [messagesJSON.itemId],
    defaultNS: messagesJSON.itemId,

    // Populate the default resources
    resources: this.transformMessagesJSON(messagesJSON),

    debug: true,

    interpolation: {
      escapeValue: false // not needed for react!!
    }
  });
}

function transformMessagesJSON(messagesJSON) {
  let resources = {};
  resources[messagesJSON.locale] = {};
  resources[messagesJSON.locale][messagesJSON.itemId] = messagesJSON.messages;
  return resources;
}

// TODO: Implement
// function changeLocale(appName, locale) {
// }

// TODO: Implement
// function loadLocaleResources(appName, locale) {
// }

export default i18n;
