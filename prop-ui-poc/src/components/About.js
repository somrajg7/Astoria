import React from 'react';
import {translate} from 'react-i18next';

class About extends React.Component {

  render() {
    const {t} = this.props;

    return (
      <div>
        <h3>{t('aboutTitle')}</h3>
      </div>
    );
  }
}

export default translate()(About);
