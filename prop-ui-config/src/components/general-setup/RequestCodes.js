import React, {Component} from 'react';

class RequestCodes extends Component {

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
        <h5 id='sm5' role='navigation'>REQUEST CODES</h5>
      </div>
    )
  }
}

export default RequestCodes;
