import React, {Component} from 'react';

class GuestReceiptMessages extends Component {

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
        <h5 id='sm4' role='navigation'>GUEST RECEIPT MESSAGES</h5>
      </div>
    )
  }
}

export default GuestReceiptMessages;
