import React from 'react';
import {Button, Modal, Panel} from 'react-bootstrap';
import {translate} from 'react-i18next';

var CloseSvgIcon = require('babel!svg-react!../../assets/images/close.svg?name=close');

class Modals extends React.Component {

  constructor(props) {
    super(props);

    // Bind functions
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeFullModal = this.closeFullModal.bind(this);
    this.openFullModal = this.openFullModal.bind(this);

    // Set initial state
    this.state = {
      showModal: false,
      showFullModal: false
    };
  }

  closeModal() {
    this.setState({showModal: false});
  }

  openModal() {
    this.setState({showModal: true});
  }

  closeFullModal() {
    this.setState({showFullModal: false});
  }

  openFullModal() {
    this.setState({showFullModal: true});
  }

  render() {
    const {t} = this.props;

    return (
      <div>
        <Panel header='Modal' bsStyle='success'>
          <Button bsStyle='primary' bsSize='large' onClick={this.openModal}>
            Modal
          </Button>

          <Modal show={this.state.showModal}>
            <Modal.Header>
              <Modal.Title >Modal title</Modal.Title>
              <CloseSvgIcon className='closeIcon' onClick={this.closeModal}/>
            </Modal.Header>
            <Modal.Body>
              Body content goes here
            </Modal.Body>
            <Modal.Footer>
              <Button bsSize='xsmall' onClick={this.closeModal}>Cancel</Button>
              <Button bsStyle='primary' bsSize='xsmall'>Save changes</Button>
            </Modal.Footer>
          </Modal>
        </Panel>

        <Panel header='Fullscreen Modal' bsStyle='success'>
          <Button bsStyle='primary' bsSize='large' onClick={this.openFullModal}>
            Fullscreen Modal
          </Button>

          <Modal dialogClassName='modal-fullscreen' show={this.state.showFullModal}>
            <Modal.Header className='fullscreen'>
              <Modal.Title >Modal title</Modal.Title>
              <CloseSvgIcon className='closeIcon' onClick={this.closeFullModal}/>
            </Modal.Header>
            <Modal.Body>
              Body content goes here
            </Modal.Body>
            <Modal.Footer>
              <Button bsSize='xsmall' onClick={this.closeFullModal}>Cancel</Button>
              <Button bsStyle='primary' bsSize='xsmall'>Save changes</Button>
            </Modal.Footer>
          </Modal>
        </Panel>
      </div>
    );
  }
}

export default translate()(Modals);
