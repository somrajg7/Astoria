import React from 'react';
import {Component} from 'react';
import classNames from 'classnames';
import {Button} from 'react-bootstrap';

class BorisIconButton extends Component {

  constructor(props) {
    super(props);

    // Bind functions
    this.handleClick = this.handleClick.bind(this);
    this.handleAnimationEnd = this.handleAnimationEnd.bind(this);

    // Set initial state
    this.state = {
      animate: false
    };
  }

  // Sets the animated state to true when the button icon is clicked
  handleClick() {
    this.setState({animate: true});
  }

  // Sets the animated state to false after the animation effect completes
  handleAnimationEnd() {
    this.setState({animate: false});
  }

  render() {
    let buttonClassName = classNames({'cbutton--effect-boris': true, 'cbutton--click': this.state.animate, 'icon-btn': true});
    return (
      <Button {...this.props} className={buttonClassName} onAnimationEnd={this.handleAnimationEnd} onClick={this.handleClick}>
        {this.props.children}
      </Button>
    )
  }

}

export default BorisIconButton;
