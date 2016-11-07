import React, {Component, PropTypes} from 'react';
import {Panel, Table} from 'react-bootstrap';
import {translate} from 'react-i18next';
import {connect} from 'react-redux';
import rest from 'actions/rest';
import HotelInformation from './HotelInformation';
import LinkedProperties from './LinkedProperties';

class Index extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {dispatch, params} = this.props;
    // fetch property info
    dispatch(rest.actions.prop(params));
    dispatch(rest.actions.linkedprops(params));
    // Reset the sectionIndex after the component is rendered
    this.props.handleSectionSelect(0);
  }

  render() {
    let sectionIndex = 0;
    let props = this.props;
    console.log('INDEX-PROPS:', this.props);
    return (
      <div>
        <HotelInformation prop={props.prop}/>
        <LinkedProperties linkedprops={props.linkedprops}/>
      </div>
    )
  }
}

Index.propTypes = {
  prop: PropTypes.object.isRequired,
  linkedprops: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {prop: state.prop, linkedprops: state.linkedprops};
}

export default connect(mapStateToProps)(translate()(Index));
