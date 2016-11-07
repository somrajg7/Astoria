import React from 'react';
import {FormGroup, Panel} from 'react-bootstrap';
import {translate} from 'react-i18next';
import {CheckboxInput} from '@prop-ui/common';

class Checkboxes extends React.Component {

  render() {
    const {t} = this.props;

    return (
      <div>
        <Panel header='Checkboxes' bsStyle='success'>
          <div>Would you like to require any of the following at guest check in ?</div>

          <FormGroup>
            <CheckboxInput defaultChecked>
              Yes
            </CheckboxInput>
            <CheckboxInput defaultChecked>
              Yes
            </CheckboxInput>
            <CheckboxInput defaultChecked>
              Yes
            </CheckboxInput>
            <CheckboxInput defaultChecked>
              Yes
            </CheckboxInput>
          </FormGroup>
        </Panel>
      </div>
    );
  }
}

export default translate()(Checkboxes);
