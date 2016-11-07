/* CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {MenuItem, Nav, Navbar, NavDropdown, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import routes from '../config/routes';
import {RouterUtils} from '@prop-ui/common';

/* Populated by react-webpack-redux:reducer */
class App extends Component {

  constructor(props) {
    super(props);

    // Bind functions
    this.renderNavItem = this.renderNavItem.bind(this);
  }

  renderNavItem(route, index) {
    if (route.childRoutes) {
      return (
        <NavDropdown eventKey={index} title={route.key}>
          {route.childRoutes.map((childRoute, childIndex) => {
            return (
              <LinkContainer to={RouterUtils.formatURL(childRoute.url, this.props.routeParams)}>
                <MenuItem eventKey={index + '.' + childIndex}>{childRoute.key}</MenuItem>
              </LinkContainer>
            );
          })}
        </NavDropdown>
      );
    } else {
      return (
        <LinkContainer to={RouterUtils.formatURL(route.url, this.props.routeParams)}>
          <NavItem eventKey={index}>{route.key}</NavItem>
        </LinkContainer>
      );
    }
  }

  render() {
    return (
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              Poc
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              {routes.childRoutes.map(this.renderNavItem)}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        {this.props.children}
      </div>
    )
  }
}

/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */
App.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = {};
  return props;
}

function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = {};
  const actionMap = {
    actions: bindActionCreators(actions, dispatch)
  };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
