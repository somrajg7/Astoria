import React, {Component} from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import classNames from 'classnames';

class HoshiTextInput extends Component {

  constructor(props) {
    super(props);

    // Bind functions
    this.handleChange = this.handleChange.bind(this);

    // Set initial state
    this.state = {
      isTextEntered: false
    };
  }

  // Set isTextEntered = true if text has been entered
  handleChange(event) {
    this.setState({
      isTextEntered: event.target.value.length > 0
    });
  }

  render() {
    let props = this.props;
    let formClassNames = classNames({'input--hoshi': true, 'disabled': this.props.disabled, 'filled': this.state.isTextEntered});

    return (
      <FormGroup className={formClassNames}>
        <FormControl type="text" {...props} onChange={this.handleChange}/>
        <ControlLabel>
          <span>{props.label}</span>
        </ControlLabel>
      </FormGroup>
    );
  }
}

HoshiTextInput.propTypes = {
  label: React.PropTypes.string
}

export default HoshiTextInput;
