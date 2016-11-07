import React from 'react';
import {Panel} from 'react-bootstrap';
import {translate} from 'react-i18next';
import {HoshiTextInput} from '@prop-ui/common';

class TextInputs extends React.Component {

  render() {
    const {t} = this.props;

    return (
      <div>
        <Panel header='Text Input' bsStyle='success'>
          <HoshiTextInput label='Hotel Name'/>
          <hr/>
          <HoshiTextInput label='Hotel Name' disabled/>
        </Panel>
      </div>
    );
  }
}

export default translate()(TextInputs);
