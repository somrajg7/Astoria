/* eslint space-before-function-paren: 0 */
/* eslint-env es6 */

// Replaces path param placholders in the URL. For example for URL "/props/:propCode/poc"
// and path params {propCode: 'DALMS'}, it would be formatted as "/props/DALMA/poc"
function formatURL(url, pathParams) {
  if (pathParams) {
    Object.keys(pathParams).forEach(function(name) {
      url = url.replace(`:${name}`, pathParams[name]);
    });
  }
  return url;
}

// Prepares routes by populating any missing url and index route attributes
function prepareRoutes(route, baseUrl) {
  if (!route.url) {
    route.url = route.path;
    if (baseUrl) {
      route.url = baseUrl.concat('/', route.path);
    }
  }

  if (route.childRoutes) {
    for (var i = 0; i < route.childRoutes.length; i++) {
      route.childRoutes[i] = prepareRoutes(route.childRoutes[i], route.url);
    }
    if (!route.indexRoute) {
      route.indexRoute = {
        onEnter: (nextState, replace) => {
          replace(formatURL(route.childRoutes[0].url, nextState.params));
        }
      };
    }
  }
  return route;
}

// This is a solution to React Router's issue of not scrolling to #hash-links when use using the <Link> component to navigate.
// It uses a Router onUpdate hook and calls element.scrollIntoView() if a #hash is present in the url.
// Since it's defined on the Router component, the scroll functionality will work with every route, and it works when linking
// to a #hash on the current route, or when linking to a #hash while navigating to a different route.
// Github: https://github.com/rafrex/react-router-hash-link-scroll
function hashLinkScroll() {
  if (window && document) {
    let {hash} = window.location;
    if (hash !== '') {
      // Push onto callback queue so it runs after the DOM is updated,
      // this is required when navigating from a different page so that
      // the element is rendered on the page before trying to getElementById.
      setTimeout(() => {
        let id = hash.replace('#', '');
        let element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 0);
    }
  }
}

const RouterUtils = {
  formatURL: formatURL,
  hashLinkScroll: hashLinkScroll,
  prepareRoutes: prepareRoutes
};

export default RouterUtils;
