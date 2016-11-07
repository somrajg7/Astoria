import React from 'react';
import {Radio} from 'react-bootstrap';

class RadioInput extends React.Component {

  render() {
    return (
      <Radio {...this.props}>
        <span className='cr'>
          <div className='cr-icon'/>
        </span>
        {this.props.children}
      </Radio>
    );
  }
}

export default RadioInput;
