import React from 'react';
import {Checkbox} from 'react-bootstrap';

var CheckSvgIcon = require('babel!svg-react!../assets/images/check.svg?name=Check');

class CheckboxInput extends React.Component {

  render() {
    return (
      <Checkbox {...this.props}>
        <span className='cr'>
          <CheckSvgIcon className='cr-icon'/>
        </span>
        {this.props.children}
      </Checkbox>
    );
  }
}

export default CheckboxInput;
