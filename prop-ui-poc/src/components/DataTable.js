import React, {Component} from 'react'
import ReactDataGrid from 'react-data-grid';
import {Toolbar, Data} from 'react-data-grid/addons';

require('react-data-grid/themes/react-data-grid.css');

class DataTable extends Component {

  constructor(props) {
    super(props);

    // Bind functions
    this.rowGetter = this.rowGetter.bind(this);
    this.handleGridSort = this.handleGridSort.bind(this);
    this.onRowsSelected = this.onRowsSelected.bind(this);
    this.onRowsDeselected = this.onRowsDeselected.bind(this);
    this.handleAllColumnFilterChange = this.handleAllColumnFilterChange.bind(this)
    this.handleColumnFilterChange = this.handleColumnFilterChange.bind(this)
    this.doColumnFilterChange = this.doColumnFilterChange.bind(this)
    this.handleClearColumnFilter = this.handleClearColumnFilter.bind(this)
    this.renderFilterToolbar = this.renderFilterToolbar.bind(this)

    // Set initial state
    this.state = {
      columns: props.columns,
      rows: props.rows,
      filters: {},
      allColumnFilterTerm: null,
      sortColumn: null,
      sortDirection: null,
      selectedIndexes: []
    }
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

  handleGridSort(sortColumn, sortDirection) {
    var state = Object.assign({}, this.state, {
      sortColumn: sortColumn,
      sortDirection: sortDirection
    });
    this.setState(state);
  }

  handleAllColumnFilterChange(event) {
    this.doColumnFilterChange(null, event.target.value)
  }

  handleColumnFilterChange(colFilter) {
    this.doColumnFilterChange(colFilter, this.state.allColumnFilterTerm)
  }

  // Generates the filter configurations and updates the state
  doColumnFilterChange(colFilter, allColumnFilterTerm) {
    let self = this
    let newFilters = Object.assign({}, this.state.filters)
    let allColumnFilterValues = null

    // Update filters if a column filter term is provided
    if (colFilter) {
      newFilters[colFilter.column.key] = colFilter
    }

    // If an all column filter term is provided, define a filterValues function that checks all
    // the column values in the row for a match on the filter term
    if (allColumnFilterTerm && allColumnFilterTerm.trim().length > 0) {
      allColumnFilterValues = function(row, colFilter, columnKey) {
        for (let column of self.props.columns) {
          if (column.filterable) {
            let rowValue = row[column.key]
            if (rowValue && rowValue.toString().toLowerCase().indexOf(allColumnFilterTerm.toLowerCase()) >= 0) {
              return true
            }
          }
        }
        return false
      }
    }

    for (let column of this.props.columns) {
      let newColFilter = newFilters[column.key]

      // Create the column filter if it does not already exist
      if (!newColFilter) {
        newColFilter = {
          column: column
        }
      }

      // If an all column filter term is provided and the column filter doesn't contain a filter term,
      // then set the filterValues function value
      if (allColumnFilterValues && !newColFilter.filterTerm) {
        newColFilter.filterValues = allColumnFilterValues
      }

      // Add the column filter from the new list of column filters if it either has a filter term or a filterValues function,
      // otherwise remove the column filter.
      if (column.filterable && (newColFilter.filterTerm || newColFilter.filterValues)) {
        newFilters[column.key] = newColFilter
      } else {
        delete newFilters[column.key]
      }
    }

    this.setState({filters: newFilters, allColumnFilterTerm: allColumnFilterTerm})
  }

  handleClearColumnFilter() {
    // all filters removed
    this.setState({filters: {}})
  }

  renderFilterToolbar() {
    return (<Toolbar enableFilter={true}/>)
  }

  onRowsSelected(rows) {
    this.setState({
      selectedIndexes: this.state.selectedIndexes.concat(rows.map(r => r.rowIdx))
    });
  }

  onRowsDeselected(rows) {
    var rowIndexes = rows.map(r => r.rowIdx);
    this.setState({
      selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1)
    });
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleAllColumnFilterChange}/>
        <ReactDataGrid onGridSort={this.handleGridSort} columns={this.state.columns} rowGetter={this.rowGetter} rowsCount={this.getSize()} minHeight={320} rowRenderer={RowRenderer} onAddFilter={this.handleColumnFilterChange} onClearFilters={this.handleClearColumnFilter} toolbar={this.renderFilterToolbar()} rowSelection={{
          showCheckbox: true,
          enableShiftSelect: true,
          onRowsSelected: this.onRowsSelected,
          onRowsDeselected: this.onRowsDeselected,
          selectBy: {
            indexes: this.state.selectedIndexes
          }
        }}/>
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

export default DataTable;
