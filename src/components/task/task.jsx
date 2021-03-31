import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Since from '../since';
import Timer from '../timer/timer';

export default class Task extends Component {
  state = {
    editedText: '',
    isEditing: false,
  };

  componentDidMount() {
    const { task } = this.props;
    const { taskText } = task;

    this.setState({
      editedText: taskText,
    });
  }

  onEdited = () => {
    this.setState({
      isEditing: true,
    });
  };

  onTaskEdit = (event) => {
    this.setState({
      editedText: event.target.value,
    });
  };

  onSubmit = (event) => {
    const { onTaskTextEdited, task } = this.props;
    const { id } = task;
    const { editedText } = this.state;

    if (editedText) {
      onTaskTextEdited(id, editedText);

      this.setState({
        isEditing: false,
      });
    }

    event.preventDefault();
  };

  render() {
    const { editedText, isEditing } = this.state;
    const { task, onTimeLeftEdited, onTaskDeleted, onToggleCompleted } = this.props;
    const { taskText, startTime, isCompleted, timeLeft } = task;

    let taskClass = null;

    if (isEditing) {
      taskClass = 'editing';
    } else if (isCompleted) {
      taskClass = 'completed';
    }

    return (
      <li className={taskClass}>
        <div className="view">
          <input className="toggle" onChange={onToggleCompleted} checked={isCompleted} type="checkbox" />
          <label>
            <span className="title">{taskText}</span>
            <Timer timeLeft={timeLeft} onTimeLeftEdited={onTimeLeftEdited} />
            <Since startTime={startTime} />
          </label>
          <button className="icon icon-edit" onClick={this.onEdited} type="button" aria-label="Edit button" />
          <button className="icon icon-destroy" onClick={onTaskDeleted} type="button" aria-label="Destroy button" />
        </div>
        <form onSubmit={this.onSubmit}>
          <input className="edit" onChange={this.onTaskEdit} value={editedText} type="text" />
        </form>
      </li>
    );
  }
}

Task.propTypes = {
  onTimeLeftEdited: PropTypes.func.isRequired,
  onTaskTextEdited: PropTypes.func.isRequired,
  onTaskDeleted: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    startTime: PropTypes.instanceOf(Date).isRequired,
    taskText: PropTypes.string.isRequired,
    timeLeft: PropTypes.number.isRequired,
  }).isRequired,
};
