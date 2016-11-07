import React from 'react';
import {Panel} from 'react-bootstrap';
import {translate} from 'react-i18next';
import {SelectFormGroup} from '@prop-ui/common';

class Selects extends React.Component {

  render() {
    const {t} = this.props;

    return (
      <div>
        <Panel header='Sizes' bsSize='success'>
          <SelectFormGroup formGroupBsSize='large' placeHolderText='Choose Something'>
            <option>This is option1</option>
            <option>This is option2</option>
            <option>This is option3</option>
            <option>This is option4</option>
          </SelectFormGroup>
          <hr/>
          <SelectFormGroup formGroupBsSize='small' controlLabelText='Label' placeHolderText='Choose Something'>
            <option>This is option1</option>
            <option>This is option2</option>
            <option>This is option3</option>
            <option>This is option4</option>
          </SelectFormGroup>
          <hr/>
          <SelectFormGroup formGroupBsSize='xsmall' placeHolderText='Choose Something'>
            <option>This is option1</option>
            <option>This is option2</option>
            <option>This is option3</option>
            <option>This is option4</option>
          </SelectFormGroup>
        </Panel>
      </div>
    );
  }
}

export default translate()(Selects);
