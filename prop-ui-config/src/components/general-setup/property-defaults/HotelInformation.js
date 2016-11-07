import React, {Component, PropTypes} from 'react';
import {Panel, Table} from 'react-bootstrap';
import {translate} from 'react-i18next';
import lodash from 'lodash';

// Define list of hotel fields to display in the hotel information table
const hotelFields = [
  'name',
  'propCode',
  'address.addressLine1',
  'address.addressLine2',
  'address.country',
  'address.state',
  'address.city',
  'address.postalCode',
  'contactinfo.phoneNumber',
  'contactinfo.faxNumber',
  'contactinfo.emailAddress1'
];

class HotelInformation extends Component {

  constructor(props) {
    super(props);

    // Bind functions
    this.renderHotelInfoHeader = this.renderHotelInfoHeader.bind(this);
    this.renderHotelInfoTable = this.renderHotelInfoTable.bind(this);
  }

  // Renders the hotel information panel header
  renderHotelInfoHeader() {
    const {t} = this.props;

    return (
      <span>
        {t('def_hotelInformation')}
        <span className='subtitle-right'>{t('def_login')}</span>
      </span>
    );
  }

  // Renders the hotel information table
  renderHotelInfoTable() {
    const {t, prop} = this.props;

    // Render table if the data has been loaded
    if (!prop.loading || prop.sync) {
      var hotel = prop.data;
      return (
        <Table bsClass='table-borderless table'>
          <tbody>
            {hotelFields.map((hotelField) => {
              return (
                <tr>
                  <td>{t(`def_${hotelField.replace(/\./g, '_')}`)}</td>
                  <td className='text-right'>{lodash.get(hotel, hotelField)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      );
    }
  }

  render() {
    const {t, prop} = this.props;
    var hotel = prop.data;

    return (
      <Panel header={this.renderHotelInfoHeader()}>
        {this.renderHotelInfoTable()}
      </Panel>
    );
  }
}

HotelInformation.propTypes = {
  prop: PropTypes.object.isRequired
}

export default translate()(HotelInformation);
