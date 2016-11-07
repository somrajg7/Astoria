import React from 'react';
import {Panel} from 'react-bootstrap';
import {translate} from 'react-i18next';

class Panels extends React.Component {

  render() {
    const {t} = this.props;

    return (
      <div>
        <Panel header='Requesting code settings'>
          Panel content(table yet to be implemented)
        </Panel>
      </div>
    );
  }
}

export default translate()(Panels);
