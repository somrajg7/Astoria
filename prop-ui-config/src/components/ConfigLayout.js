import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {Nav, Navbar, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {translate} from 'react-i18next';
import {AutoAffix} from 'react-overlays';
import Waypoint from 'react-waypoint';
import routes from '../routes/routes';
import {RouterUtils, ScrollingProgressBar} from '@prop-ui/lib-common';

// Import SVG files
var DatabaseSvg = require('babel!svg-react!../assets/images/database.svg?name=database');
var SaveSvg = require('babel!svg-react!../assets/images/save-18.svg?name=save');
var CheckSvg = require('babel!svg-react!../assets/images/check.svg?name=check');
var CloseSvg = require('babel!svg-react!../assets/images/close.svg?name=close');
var ListSvg = require('babel!svg-react!../assets/images/list.svg?name=list');

class ConfigLayout extends Component {

  constructor(props) {
    super(props);

    // Bind functions
    this.handleAffixed = this.handleAffixed.bind(this);
    this.handleAffixedTop = this.handleAffixedTop.bind(this);
    this.handleNavClick = this.handleNavClick.bind(this);
    this.createNavId = this.createNavId.bind(this);
    this.handleSectionSelect = this.handleSectionSelect.bind(this);
    this.renderNav = this.renderNav.bind(this);
    this.renderSubNav = this.renderSubNav.bind(this);
    this.renderSectionNav = this.renderSectionNav.bind(this);
    this.renderSectionTitle = this.renderSectionTitle.bind(this);
    this.renderTopLeftNav = this.renderTopLeftNav.bind(this);
    this.renderTopRightNav = this.renderTopRightNav.bind(this);

    // Set initial state
    this.state = {
      navIndex: 0,
      subNavIndex: 0,
      sectionIndex: 0,
      affixed: false
    };
  }

  // Updates the affix state to true when the nav is no longer affixed
  handleAffixed() {
    this.setState({affixed: true});
  }

  // Updates the affix state to false when the nav is affixed
  handleAffixedTop() {
    this.setState({affixed: false});
  }

  // Handles the nav click event when the view is changed to update state view indexes
  handleNavClick(navIndex, subNavIndex) {
    this.setState({navIndex: navIndex, subNavIndex: subNavIndex, sectionIndex: 0});

    // If the nav if affixed, then scroll the window back to the top of the data area
    if (this.state.affixed && ConfigLayout.getDocument()) {
      let element = document.getElementById('body-content');
      if (element) {
        element.scrollIntoView();
      }
    }
  }

  // Updates the sectionIndex state when the section is clicked within the navigation
  // or when the section is scrolled to
  handleSectionSelect(sectionIndex) {
    this.setState({sectionIndex: sectionIndex});
  }

  // Generates the nav id
  createNavId(navIndex, subNavIndex, sectionIndex) {
    return 'nav-' + navIndex + '-' + subNavIndex + '-' + sectionIndex;
  }

  // Renders the title/svgs which are placed towards left in the top header
  renderTopLeftNav() {
    const {t} = this.props;
    return (
      <Navbar.Brand>
        <CheckSvg className='check-icon'/>
        <DatabaseSvg className='database-icon'/>
        <span className='header'>{t('hotelConfiguration')}</span>
      </Navbar.Brand>
    )
  }

  // Renders the title/svgs which are placed towards right in the top header
  renderTopRightNav() {
    const {t} = this.props;
    return (
      <Navbar.Brand className='pull-right'>
        <CloseSvg className='close-icon'/>
        <span className='right-header'>{t('save')}</span>
        <SaveSvg className='save-icon'/>
      </Navbar.Brand>
    )
  }

  // Renders the primary and secondary navs in the top header
  renderNav() {
    const {t} = this.props;
    return (
      <Navbar inverse>
        <Navbar.Header>
          {this.renderTopLeftNav()}
          {this.renderTopRightNav()}
        </Navbar.Header>
        <AutoAffix affixClassName='affixed' onAffixed={this.handleAffixed} onAffixedTop={this.handleAffixedTop}>
          <div>
            <Navbar.Header>
              {this.renderTopLeftNav()}
              <Navbar.Toggle className='tButton'>
                <ListSvg className='svg'/>
                <span className='center-header'>{t(routes.childRoutes[this.state.navIndex].key)}</span>
              </Navbar.Toggle>
              {this.renderTopRightNav()}
            </Navbar.Header>
            <Navbar.Collapse className={this.state.affixed
              ? ''
              : 'in'}>
              <Nav activeKey={this.createNavId(this.state.navIndex, 0, 0)}>
                {routes.childRoutes.map((nav, navIndex) => {
                  return (
                    <LinkContainer key={this.createNavId(navIndex, 0, 0)} eventKey={this.createNavId(navIndex, 0, 0)} to={RouterUtils.formatURL(nav.url, this.props.routeParams)}>
                      <NavItem onClick={() => {
                        this.handleNavClick(navIndex, 0)
                      }} className='nav-view'>{t(nav.key)}</NavItem>
                    </LinkContainer>
                  );
                })}
              </Nav>
            </Navbar.Collapse>
            <ScrollingProgressBar scrollId='main-content'/>
          </div>
        </AutoAffix>
      </Navbar>
    );
  }

  // Renders the sub/side nav
  renderSubNav() {
    const {t} = this.props;
    return (
      <Nav bsStyle='pills' stacked>
        {routes.childRoutes[this.state.navIndex].childRoutes.map((subNav, subNavIndex) => {
          return (
            <div className='sub-nav-wrapper' key={this.createNavId(this.state.navIndex, subNavIndex, 0)}>
              <LinkContainer eventKey={this.createNavId(this.state.navIndex, subNavIndex, 0)} to={RouterUtils.formatURL(subNav.url, this.props.routeParams)} active={this.state.subNavIndex === subNavIndex}>
                <NavItem className='sub-nav-view text-right' onClick={() => {
                  this.handleNavClick(this.state.navIndex, subNavIndex)
                }}>{t(subNav.key)}
                </NavItem>
              </LinkContainer>
              {this.renderSectionNav(subNav, subNavIndex)}
            </div>
          );
        })}
      </Nav>
    );
  }

  // Renders the sections within the sub/side nav
  renderSectionNav(subNav, subNavIndex) {
    const {t} = this.props;
    if (this.state.subNavIndex === subNavIndex && subNav.sections) {
      return (
        <Nav bsStyle='pills' stacked className={'sub-side-menu'}>
          {subNav.sections.map((section, sectionIndex) => {
            return (
              <LinkContainer key={this.createNavId(this.state.navIndex, subNavIndex, sectionIndex)} eventKey={this.createNavId(this.state.navIndex, subNavIndex, sectionIndex)} to={{
                pathname: RouterUtils.formatURL(subNav.url, this.props.routeParams),
                hash: '#' + this.createNavId(this.state.navIndex, subNavIndex, sectionIndex)
              }} active={this.state.sectionIndex === sectionIndex}>
                <NavItem className='text-right sub-section-view' onClick={() => {
                  this.handleSectionSelect(sectionIndex)
                }}>{t(section)}
                  &ndash;
                </NavItem>
              </LinkContainer>
            );
          })}
        </Nav>
      );
    }
  }

  // Renders the title and waypoint breakpoint for the sub menu section
  renderSectionTitle(sectionIndex) {
    const {t} = this.props;
    return (
      <h5 id={this.createNavId(this.state.navIndex, this.state.subNavIndex, sectionIndex)}>
        {t(routes.childRoutes[this.state.navIndex].childRoutes[this.state.subNavIndex].sections[sectionIndex].key)}
        <Waypoint onEnter={() => {
          this.handleSectionSelect(sectionIndex);
        }}/>
      </h5>
    );
  }

  // render the config layout
  render() {
    // Add functions to the child props
    var childProps = {
      renderSectionTitle: this.renderSectionTitle,
      handleSectionSelect: this.handleSectionSelect
    }

    // Clone child elements and add in additional child props
    var childNodes = React.Children.map(this.props.children, (child) => React.cloneElement(child, childProps));

    return (
      <Grid className='config'>
        <Row>
          {this.renderNav()}
        </Row>
        <Row id='body-content' className={this.state.affixed
          ? 'affixed'
          : ''}>
          <Col xs={3} md={3} lg={3} id='side-menu'>
            {this.renderSubNav()}
          </Col>
          <Col xs={9} md={9} lg={9} id='main-content'>
            {childNodes}
          </Col>
        </Row>
      </Grid>
    )
  }
}

ConfigLayout.getDocument = () => {
  if (typeof document !== 'undefined') {
    return document;
  }
};

export default translate()(ConfigLayout);
