import React from 'react';
import {Button, Panel} from 'react-bootstrap';
import {translate} from 'react-i18next';

var CheckSvgIcon = require('babel!svg-react!../../assets/images/check.svg?name=Check');

class Alerts extends React.Component {

  constructor(props) {
    super(props);

    // Bind functions
    this.handleToggleAlert = this.handleToggleAlert.bind(this);

    // Set initial state
    this.state = {
      showAlert: false
    };
  }

  handleToggleAlert() {
    this.setState({
      showAlert: !this.state.showAlert
    });
  }

  render() {
    const {t} = this.props;

    return (
      <div>
        <Panel header='States' bsStyle='success'>
          <Button bsStyle='primary' bsSize='large' onClick={this.handleToggleAlert}>
            Alert
          </Button>

          <div className={(this.state.showAlert
            ? ''
            : 'hidden ') + 'alert alert-save'} role='alert'>
            <div className='vertical-center'>
              <div className='vertical-center-inner'>
                <CheckSvgIcon className='alert-heading'/>
                <div className='message'>
                  <span>
                    Updates Saved!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </div>
    );
  }
}

export default translate()(Alerts);
