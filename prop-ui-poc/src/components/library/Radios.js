import React from 'react';
import {FormGroup, Panel, Radio} from 'react-bootstrap';
import {translate} from 'react-i18next';
import {RadioInput} from '@prop-ui/common';

class Radios extends React.Component {

  render() {
    const {t} = this.props;

    return (
      <div>
        <Panel header='Radios' bsStyle='success'>
          <div>What is your property ownership ?</div>

          <FormGroup>
            <RadioInput name='testradio'>
              Yes
            </RadioInput>
            <RadioInput name='testradio' defaultChecked>
              No
            </RadioInput>
          </FormGroup>
        </Panel>
      </div>
    );
  }
}

export default translate()(Radios);
