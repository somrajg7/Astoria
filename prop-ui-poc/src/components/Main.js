import React from 'react';
import {translate} from 'react-i18next';
import {Hello} from '@prop-ui/common';

class Main extends React.Component {

  render() {
    const {t} = this.props;

    return (
      <div>
        <h3>{t('mainTitle')}</h3>
        <p>
          <Hello/>
        </p>
      </div>
    );
  }
}

export default translate()(Main);
