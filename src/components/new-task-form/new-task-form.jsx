import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  static propTypes = {
    onItemAdded: PropTypes.func.isRequired,
  };

  state = {
    text: '',
  };

  onLabelChange = (event) => {
    this.setState({
      text: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const { text } = this.state;
    const { onItemAdded } = this.props;

    if (text) {
      onItemAdded(text);

      this.setState({
        text: '',
      });
    }
  };

  render() {
    const { text } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input className="new-todo" placeholder="What needs to be done?" onChange={this.onLabelChange} value={text} />
        </form>
      </header>
    );
  }
}
