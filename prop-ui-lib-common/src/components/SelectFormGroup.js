import React from 'react';
import ReactDOM from 'react-dom';
import {ControlLabel, FormControl, FormGroup} from 'react-bootstrap';
import classNames from 'classnames';

require('bootstrap-select/js/bootstrap-select');

class SelectFormGroup extends React.Component {

  constructor(props) {
    super(props);

    // Bind functions
    this.renderPlaceHolderOption = this.renderPlaceHolderOption.bind(this);

    // Set initial state
    this.state = {
      open: false,
      placeHolderSelected: false
    };
  }

  componentDidMount() {
    var self = this;
    var node = $(ReactDOM.findDOMNode(this));

    var select = node.find('select');
    select.hide();
    $(select).selectpicker();

    // Bind event listener to update the place holder selected state when the select option is changed
    select.change(function() {
      SelectFormGroup.updatePlaceHolderSelectedState(self);
    });

    var button = node.find('button');
    button.click(function(e) {
      e.stopPropagation();
      self.setState({
        open: !self.state.open
      });
    });

    var items = node.find('ul.dropdown-menu li a');
    items.click(function() {
      if (self.props.multiple)
        return;
      self.setState({
        open: !self.state.open
      });
    });

    $('html').click(function() {
      self.setState({open: false});
    });

    // Update the place holder selected state after the component is mounted
    SelectFormGroup.updatePlaceHolderSelectedState(self);
  }

  componentDidUpdate() {
    var node = $(ReactDOM.findDOMNode(this));
    node.find('select').selectpicker('refresh');

    var select = node.find('div.bootstrap-select');
    select.toggleClass('open', this.state.open);

    // Updates the place holder selected state after the component is updated
    SelectFormGroup.updatePlaceHolderSelectedState(this);
  }

  // Unbinds the on change event listener before the component is unmounted
  componentWillUnmount() {
    var node = $(ReactDOM.findDOMNode(this));

    var select = node.find('select');
    select.off('change');

    var button = node.find('button');
    button.off('click');

    var items = node.find('ul.dropdown-menu li a');
    items.off('click');

    $('html').off('click');
  }

  // Renders the control (if provided)
  renderControlLabel() {
    if (this.props.controlLabelText !== undefined && this.props.controlLabelText !== null) {
      return (
        <ControlLabel>{this.props.controlLabelText}</ControlLabel>
      )
    }
  }

  // Renders the place holder option (if provided)
  renderPlaceHolderOption() {
    if (this.props.placeHolderText !== undefined && this.props.placeHolderText !== null) {
      return (
        <option value='' class='place-holder-option'>{this.props.placeHolderText}</option>
      )
    }
  }

  // Render the select drpdown form group
  render() {
    var selectClassNames = classNames({'place-holder-selected': this.state.placeHolderSelected, 'select-form-group': true});
    var {
      formGroupBsClass,
      formGroupBsSize,
      formGroupControlId,
      formGroupValidationState,
      controlLabelText,
      placeHolderText,
      ...formControlProps
    } = this.props;

    return (
      <FormGroup className={selectClassNames} bsClass={formGroupBsClass} bsSize={formGroupBsSize} controlId={formGroupControlId} validationState={formGroupValidationState}>
        {this.renderControlLabel()}
        <FormControl componentClass='select' {... formControlProps}>
          {this.renderPlaceHolderOption()}
          {formControlProps.children}
        </FormControl>
      </FormGroup>
    );
  }
}

SelectFormGroup.propTypes = {
  formGroupBsClass: React.PropTypes.string,
  formGroupBsSize: React.PropTypes.string,
  formGroupControlId: React.PropTypes.string,
  formGroupValidationState: React.PropTypes.string,
  controlLabelText: React.PropTypes.string,
  placeHolderText: React.PropTypes.string
}

// Static function that updates the place holder selected state
SelectFormGroup.updatePlaceHolderSelectedState = function(self) {
  var select = $(ReactDOM.findDOMNode(self)).find('select');
  var placeHolderSelected = self.props.placeHolderText !== undefined && self.props.placeHolderText !== null && select.val() === '';
  // Only update state if the value has changed
  if (self.state.placeHolderSelected !== placeHolderSelected) {
    self.setState({placeHolderSelected: placeHolderSelected});
  }
}

export default SelectFormGroup;
