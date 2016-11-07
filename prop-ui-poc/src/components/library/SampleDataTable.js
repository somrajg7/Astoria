import React, {Component} from 'react'
import DataTable from '../DataTable';

//importing svgs
var checkSvg = require('babel!svg-react!../../assets/images/check.svg?name=list');
var EditSvg = require('babel!svg-react!../../assets/images/edit.svg?name=list');
var PlusSvg = require('babel!svg-react!../../assets/images/plus.svg?name=list');
var TrashSvg = require('babel!svg-react!../../assets/images/trash.svg?name=list');

class SampleDataTable extends Component {
  constructor(props) {
    super(props);
    this._rows = [];
    for (var i = 1; i < 10; i++) {
      this._rows.push({
        code: i,
        description: ['24 hours conference guest', 'Anti allergenic', 'Accessable Rm if AVl @ Chk-In', 'Adjacent Rm if AVl @ Chk-In'][Math.floor((Math.random() * 2) + 2)],
        type: ['disablility', 'turndown', 'none'][Math.floor((Math.random() * 2) + 1)],
        usedOnLocation: ['true', 'false'][Math.floor((Math.random() * 2))],
        roomFeet: ['true', 'false'][Math.floor((Math.random() * 2))],
        houseKeepingReq: ['true', 'false'][Math.floor((Math.random() * 2))]
      });
    }

    this._columns = [
      {
        key: 'code',
        name: 'code',
        resizable: true,
        sortable: true,
        filterable: true,
        width: 80
      }, {
        key: 'description',
        name: 'description',
        resizable: true,
        sortable: true,
        filterable: true,
        width: 300
      }, {
        key: 'type',
        name: 'type',
        resizable: true,
        sortable: true,
        filterable: true,
        width: 200
      }, {
        key: 'usedOnLocation',
        name: 'used on location',
        resizable: true,
        sortable: true,
        filterable: true,
        width: 160
      }, {
        key: 'roomFeet',
        name: 'room feet',
        resizable: true,
        sortable: true,
        filterable: true,
        width: 160
      }, {
        key: 'houseKeepingReq',
        name: 'house keeping req',
        resizable: true,
        sortable: true,
        filterable: true,
        width: 160
      }
    ]
  }

  render() {
    return (
      <div className='grid-container'>
        <div className='grid-header'>
          <div className='grid-left-header'>request code settings
            <div className='bottom-line'></div>
          </div>
          <div className='grid-right-header'><i className='glyphicon glyphicon-lock'/>finance permission required</div>
        </div>
        <div className='grid-area'>
          <DataTable columns={this._columns} rows={this._rows}/>
        </div>
        <div className='grid-footer'>
          <div className='grid-footer-indicators'>
            <PlusSvg/>
            <EditSvg/>
            <TrashSvg/>
          </div>
        </div>
      </div>
    );
  }
}
export default SampleDataTable;
