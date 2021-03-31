import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

export default class NewTaskForm extends Component {
  static propTypes = {
    onTaskAdded: PropTypes.func.isRequired,
  };

  state = {
    taskText: '',
    minutes: '',
    seconds: '',
  };

  onSubmit = (event) => {
    const { onTaskAdded } = this.props;
    const { taskText, minutes = 0, seconds = 0 } = this.state;

    if (taskText && minutes >= 0 && seconds >= 0) {
      const timeLeft = +minutes * 60 + +seconds;

      onTaskAdded(taskText, timeLeft);

      this.setState({
        taskText: '',
        minutes: '',
        seconds: '',
      });
    }

    event.preventDefault();
  };

  addToState = (event) => {
    const name = event.target.dataset.state;
    const { value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { taskText, minutes, seconds } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            type="text"
            value={taskText}
            data-state="taskText"
            onChange={(event) => {
              this.addToState(event);
            }}
            placeholder="Task"
          />
          <input
            className="new-todo-form__timer"
            type="number"
            value={minutes}
            data-state="minutes"
            onChange={(event) => {
              this.addToState(event);
            }}
            placeholder="Min"
          />
          <input
            className="new-todo-form__timer"
            type="number"
            value={seconds}
            data-state="seconds"
            onChange={(event) => {
              this.addToState(event);
            }}
            placeholder="Sec"
          />
          <input className="task-submit" type="submit" value="" />
        </form>
      </header>
    );
  }
}
