import React, {Component} from 'react'
import ReactDataGrid from 'react-data-grid';
import {Toolbar, Data} from 'react-data-grid/addons';
require('react-data-grid/themes/react-data-grid.css')

class Grid extends Component {

  constructor(props) {
    super(props);

    this.getRows = this.getRows.bind(this);
    this.getSize = this.getSize.bind(this);
    this.rowGetter = this.rowGetter.bind(this);
    this.handleAllColumnFilterChange = this.handleAllColumnFilterChange.bind(this);
    this.handleColumnFilterChange = this.handleColumnFilterChange.bind(this);
    this.doColumnFilterChange = this.doColumnFilterChange.bind(this);
    this.handleClearColumnFilter = this.handleClearColumnFilter.bind(this);
    this.renderFilterToolbar = this.renderFilterToolbar.bind(this);

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

    // Set initial state
    this.state = {
      rows: this._rows,
      filters: {},
      allColumnFilterTerm: null
    };

    this.columns = [
      {
        key: 'code',
        name: 'code',
        resizable: true,
        filterable: true,
        width: 80
      }, {
        key: 'description',
        name: 'description',
        resizable: true,
        filterable: true,
        width: 300
      }, {
        key: 'type',
        name: 'type',
        resizable: true,
        filterable: true,
        width: 200
      }, {
        key: 'usedOnLocation',
        name: 'used on location',
        resizable: true,
        filterable: true,
        width: 160
      }, {
        key: 'roomFeet',
        name: 'room feet',
        resizable: true,
        filterable: true,
        width: 160
      }, {
        key: 'houseKeepingReq',
        name: 'house keeping req',
        resizable: true,
        filterable: true,
        width: 160
      }
    ]
  }

  handleAllColumnFilterChange(event) {
    this.doColumnFilterChange(null, event.target.value);
  }

  handleColumnFilterChange(colFilter) {
    this.doColumnFilterChange(colFilter, this.state.allColumnFilterTerm);
  }

  // Generates the filter configurations and updates the state
  doColumnFilterChange(colFilter, allColumnFilterTerm) {
    let self = this;
    let newFilters = Object.assign({}, this.state.filters);
    let allColumnFilterValues = null;

    // Update filters if a column filter term is provided
    if (colFilter) {
      newFilters[colFilter.column.key] = colFilter;
    }

    // If an all column filter term is provided, define a filterValues function that checks all
    // the column values in the row for a match on the filter term
    if (allColumnFilterTerm && allColumnFilterTerm.trim().length > 0) {
      allColumnFilterValues = function(row, colFilter, columnKey) {
        for (let column of self.columns) {
          if (column.filterable) {
            let rowValue = row[column.key];
            if (rowValue && rowValue.toString().toLowerCase().indexOf(allColumnFilterTerm.toLowerCase()) >= 0) {
              return true;
            }
          }
        }
        return false;
      };
    }

    for (let column of this.columns) {
      let newColFilter = newFilters[column.key];

      // Create the column filter if it does not already exist
      if (!newColFilter) {
        newColFilter = {
          column: column
        };
      }

      // If an all column filter term is provided and the column filter doesn't contain a filter term,
      // then set the filterValues function value
      if (allColumnFilterValues && !newColFilter.filterTerm) {
        newColFilter.filterValues = allColumnFilterValues;
      }

      // Add the column filter from the new list of column filters if it either has a filter term or a filterValues function,
      // otherwise remove the column filter.
      if (column.filterable && (newColFilter.filterTerm || newColFilter.filterValues)) {
        newFilters[column.key] = newColFilter;
      } else {
        delete newFilters[column.key];
      }
    }

    this.setState({filters: newFilters, allColumnFilterTerm: allColumnFilterTerm});
  }

  handleClearColumnFilter() {
    //all filters removed
    this.setState({filters: {}});
  }

  getRows() {
    return Data.Selectors.getRows(this.state);
  }

  getSize() {
    return this.getRows().length;
  }

  rowGetter(i) {
    var rows = this.getRows();
    return rows[i];
  }

  renderFilterToolbar() {
    return (<Toolbar enableFilter={true}/>);
  }

  render() {
    return (
      <div className='grid-container'>
        <div className='grid-header'>
          <div className='grid-left-header'>request code settings
            <div className='bottom-line'></div>
          </div>
          <div className='grid-right-header'><i className='glyphicon glyphicon-lock'/>finance permission required</div>
          <div>
            <input type="text" onChange={this.handleAllColumnFilterChange}/>
          </div>
        </div>
        <div className='grid-area'>
          <ReactDataGrid columns={this.columns} rowGetter={this.rowGetter} rowsCount={this.getSize()} minHeight={320} rowRenderer={RowRenderer} onAddFilter={this.handleColumnFilterChange} onClearFilters={this.handleClearColumnFilter} toolbar={this.renderFilterToolbar()}/>
        </div>
        <div className='grid-footer'>
          <div className='grid-footer-indicators'>
            <i className='glyphicon glyphicon-plus'/>
            <i className='glyphicon glyphicon-pencil'/>
            <i className='glyphicon glyphicon-trash'/>
          </div>
        </div>
      </div>
    );
  }
}

class RowRenderer extends Component {
  constructor(props) {
    super(props);
    this.getRowClass = this.getRowClass.bind(this);
  }

  getRowClass() {
    return this.props.idx % 2
      ? 'alternate-row'
      : ''
  }

  render() {
    return (
      <div className={this.getRowClass()}><ReactDataGrid.Row ref="row" {...this.props}/></div>
    )
  }
}

export default Grid;
