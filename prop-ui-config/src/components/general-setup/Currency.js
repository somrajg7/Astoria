import React, {Component} from 'react';

class Currency extends Component {

  constructor(props) {
    super(props);
  }

  // Reset the sectionIndex after the component is rendered
  componentDidMount() {
    this.props.handleSectionSelect(0);
  }

  render() {
    return (
      <div>
        <h5 id='sm6' role='navigation'>CURRENCY</h5>
      </div>
    )
  }
}

export default Currency;
