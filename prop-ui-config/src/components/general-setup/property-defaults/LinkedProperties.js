import React, {Component, PropTypes} from 'react';
import {Panel, Table} from 'react-bootstrap';
import {translate} from 'react-i18next';
var classNames = require('classnames');

class LinkedProperties extends Component {

  constructor(props) {
    super(props);

    // Bind functions
    this.renderHeader = this.renderHeader.bind(this);
    this.renderLinkedProperties = this.renderLinkedProperties.bind(this);
  }

  renderHeader() {
    const {t} = this.props;

    return (
      <span>
        {t('linkedProperties')}
      </span>
    );
  }

  renderLinkedProperties() {
    console.log('PROPS:', this.props);
    const {t, linkedprops} = this.props;
    if (!linkedprops.loading || linkedprops.sync) {
      console.log('inside if:', this.props);
      // return ( < Table striped bordered condensed hover > <thead>
      //   <tr>
      //     <th>{t('active')}</th>
      //     <th>{t('def_propCode')}</th>
      //     <th>{t('linkedProperties_propertyName')}</th>
      //   </tr>
      // </thead> < tbody > {
      //   linkedprops.data.linkedprops.map((linkedprop) => {
      //     return (
      //       <tr>
      //         <td>{(function(active) {
      //             if (active) {
      //               return (
      //                 <div>True</div>
      //               );
      //             } else {
      //               return (
      //                 <div>False</div>
      //               );
      //             }
      //           })(linkedprop.activeFlag)}</td>
      //         <td className='text-right'>{linkedprop.propCode}</td>
      //         <td className='text-right'>{linkedprop.propCode}{(function(mainFlag) {
      //             if (mainFlag) {
      //               return (
      //                 <span>&nbsp;(Primary Property)</span>
      //               );
      //             }
      //           })(linkedprop.mainFlag)}</td>
      //       </tr>
      //     );
      //   })
      // } < /tbody>
      // </Table >)
    }
  }
  render() {
    const {t, linkedprops} = this.props;

    return (
      <Panel header={this.renderHeader()}>
        {this.renderLinkedProperties()}
      </Panel>
    );
  }
}

LinkedProperties.propTypes = {
  prop: PropTypes.object.isRequired,
  linkedprops: PropTypes.object.isRequired,
  showHeaderLine: PropTypes.bool
}

export default translate()(LinkedProperties);
