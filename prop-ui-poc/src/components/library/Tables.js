import React from 'react';
import {Checkbox, Panel, Table} from 'react-bootstrap';
import {translate} from 'react-i18next';
import {BorisButtonIcon} from '@prop-ui/common';

var CheckSvgIcon = require('babel!svg-react!../../assets/images/check.svg?name=Check');
var EditSvgIcon = require('babel!svg-react!../../assets/images/edit.svg?name=Edit');
var PlusSvgIcon = require('babel!svg-react!../../assets/images/plus.svg?name=plus');
var TrashSvgIcon = require('babel!svg-react!../../assets/images/trash.svg?name=trash');

class Tables extends React.Component {

  render() {
    const {t} = this.props;

    return (
      <div>
        <Panel header='Sample Table 1' bsStyle='success'>
          <Table responsive striped condensed>
            <thead>
              <tr>
                <th>Code</th>
                <th>Description</th>
                <th>Type</th>
                <th className='checkBoxTableColumn tdCenter'>Used On Location</th>
                <th className='checkBoxTableColumn tdCenter'>Room Feat</th>
                <th className='checkBoxTableColumn tdCenter'>Housekeeping Req</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>24</td>
                <td>24 hours conference Guests</td>
                <td>Disability</td>
                <td className='checkBoxTableColumn tdCenter'>
                  <Checkbox defaultChecked>
                    <span className='cr'>
                      <CheckSvgIcon className='cr-icon'/>
                    </span>
                  </Checkbox>
                </td>
                <td className='checkBoxTableColumn tdCenter'>
                  <Checkbox defaultChecked>
                    <span className='cr'>
                      <CheckSvgIcon className='cr-icon'/>
                    </span>
                  </Checkbox>
                </td>
                <td className='checkBoxTableColumn tdCenter'>
                  <Checkbox defaultChecked>
                    <span className='cr'>
                      <CheckSvgIcon className='cr-icon'/>
                    </span>
                  </Checkbox>
                </td>
              </tr>
              <tr>
                <td>CR</td>
                <td>Accessable rooms @ check in</td>
                <td>None</td>
                <td className='checkBoxTableColumn tdCenter'>
                  <Checkbox defaultChecked>
                    <span className='cr'>
                      <CheckSvgIcon className='cr-icon'/>
                    </span>
                  </Checkbox>
                </td>
                <td className='checkBoxTableColumn tdCenter'>
                  <Checkbox defaultChecked>
                    <span className='cr'>
                      <CheckSvgIcon className='cr-icon'/>
                    </span>
                  </Checkbox>
                </td>
                <td className='checkBoxTableColumn tdCenter'>
                  <Checkbox defaultChecked>
                    <span className='cr'>
                      <CheckSvgIcon className='cr-icon'/>
                    </span>
                  </Checkbox>
                </td>
              </tr>
              <tr>
                <td>RJ</td>
                <td>Adjacent room @ check in</td>
                <td>None</td>
                <td className='checkBoxTableColumn tdCenter'>
                  <Checkbox defaultChecked>
                    <span className='cr'>
                      <CheckSvgIcon className='cr-icon'/>
                    </span>
                  </Checkbox>
                </td>
                <td className='checkBoxTableColumn tdCenter'>
                  <Checkbox defaultChecked>
                    <span className='cr'>
                      <CheckSvgIcon className='cr-icon'/>
                    </span>
                  </Checkbox>
                </td>
                <td className='checkBoxTableColumn tdCenter'>
                  <Checkbox defaultChecked>
                    <span className='cr'>
                      <CheckSvgIcon className='cr-icon'/>
                    </span>
                  </Checkbox>
                </td>
              </tr>
            </tbody>
          </Table>
          <div className='panel-footer'>
            <div className='panel-footer-icons pull-right'>
              <BorisButtonIcon disabled>
                <TrashSvgIcon/>
              </BorisButtonIcon>
            </div>
            <div className='panel-footer-icons pull-right'>
              <BorisButtonIcon disabled>
                <EditSvgIcon/>
              </BorisButtonIcon>
            </div>
            <div className='panel-footer-icons pull-right'>
              <BorisButtonIcon>
                <PlusSvgIcon/>
              </BorisButtonIcon>
            </div>
          </div>
        </Panel>

        <Panel header='Sample Table 2' bsStyle='success'>
          <Table responsive striped condensed hover>
            <thead>
              <tr>
                <th>CODE</th>
                <th>DESCRIPTION</th>
                <th>TYPE</th>
                <th className='checkBoxTableColumn tdCenter'>USED ON LOCATION</th>
                <th className='checkBoxTableColumn tdCenter'>ROOM FEAT</th>
                <th className='checkBoxTableColumn tdCenter'>HOUSEKEEPING REQ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>24</td>
                <td>24 hours conference Guests</td>
                <td>Disability</td>
                <td className='checkBoxTableColumn tdCenter'>
                  <CheckSvgIcon className='checksvg'/>
                </td>
                <td className='checkBoxTableColumn tdCenter'>
                  <CheckSvgIcon className='checksvg'/>
                </td>
                <td className='checkBoxTableColumn tdCenter'>
                  <CheckSvgIcon className='checksvg'/>
                </td>
              </tr>
              <tr>
                <td>CR</td>
                <td>Accessable rooms @ check in</td>
                <td>None</td>
                <td className='checkBoxTableColumn tdCenter'>
                  <CheckSvgIcon className='checksvg'/>
                </td>
                <td className='checkBoxTableColumn tdCenter'>
                  <CheckSvgIcon className='checksvg'/>
                </td>
                <td className='checkBoxTableColumn tdCenter'>
                  <CheckSvgIcon className='checksvg'/>
                </td>
              </tr>
              <tr>
                <td>RJ</td>
                <td>Adjacent room @ check in</td>
                <td>None</td>
                <td className='checkBoxTableColumn tdCenter'>
                  <CheckSvgIcon className='checksvg'/>
                </td>
                <td className='checkBoxTableColumn tdCenter'>
                  <CheckSvgIcon className='checksvg'/>
                </td>
                <td className='checkBoxTableColumn tdCenter'>
                  <CheckSvgIcon className='checksvg'/>
                </td>
              </tr>
            </tbody>
          </Table>
          <div className='panel-footer'>
            <div className='panel-footer-icons pull-right'>
              <BorisButtonIcon disabled>
                <TrashSvgIcon/>
              </BorisButtonIcon>
            </div>
            <div className='panel-footer-icons pull-right'>
              <BorisButtonIcon disabled>
                <EditSvgIcon/>
              </BorisButtonIcon>
            </div>
            <div className='panel-footer-icons pull-right'>
              <BorisButtonIcon>
                <PlusSvgIcon/>
              </BorisButtonIcon>
            </div>
          </div>
        </Panel>
      </div>
    );
  }
}

export default translate()(Tables);
