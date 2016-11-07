import React from 'react';
import {Button, Panel} from 'react-bootstrap';
import {translate} from 'react-i18next';
import {BorisButtonIcon} from '@prop-ui/common';

var EditSvgIcon = require('babel!svg-react!../../assets/images/edit.svg?name=Edit');
var SigninSvgIcon = require('babel!svg-react!../../assets/images/login.svg?name=Signin');

class Buttons extends React.Component {

  render() {
    const {t} = this.props;

    return (
      <div>
        <Panel header='States' bsStyle='success'>
          <Button bsStyle='success' bsSize='small'>
            Save
          </Button>
          <hr/>
          <Button bsStyle='primary' bsSize='small'>
            Add
          </Button>
          <hr/>
          <Button bsStyle='primary' bsSize='small'>
            <SigninSvgIcon/>
            Add
          </Button>
          <hr/>
          <Button bsStyle='option' bsSize='small'>
            Cancel
          </Button>
        </Panel>

        <Panel header='Sizes' bsStyle='success'>
          <Button bsStyle='primary' bsSize='large'>
            <SigninSvgIcon/>
            SIGN IN
          </Button>
          <hr/>
          <Button bsStyle='primary' bsSize='small'>
            Add
          </Button>
          <hr/>
          <Button bsStyle='primary' bsSize='xsmall'>
            Update
          </Button>
        </Panel>

        <Panel header='Icons' bsStyle='success'>
          <BorisButtonIcon>
            <EditSvgIcon/>
          </BorisButtonIcon>
          <hr/>
          <BorisButtonIcon bsStyle='secondary' bsSize='small'>
            <EditSvgIcon/>
            Edit
          </BorisButtonIcon>
          <hr/>
          <BorisButtonIcon disabled bsStyle='secondary' bsSize='small'>
            <EditSvgIcon/>
            Edit
          </BorisButtonIcon>
        </Panel>
      </div>
    );
  }
}

export default translate()(Buttons);
