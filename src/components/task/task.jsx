import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Since from '../since';

export default class Task extends Component {
  static propTypes = {
    onItemEdited: PropTypes.func.isRequired,
    onItemDeleted: PropTypes.func.isRequired,
    onToggleCompleted: PropTypes.func.isRequired,
    task: PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      startTime: PropTypes.instanceOf(Date).isRequired,
      isCompleted: PropTypes.bool.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    const { text } = props.task;

    this.state = {
      isEditing: false,
      editedText: text,
    };
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
    const { onItemEdited, task } = this.props;
    const { id } = task;
    const { editedText } = this.state;

    if (editedText) {
      onItemEdited(id, editedText);
      this.setState({
        isEditing: false,
      });
    }

    event.preventDefault();
  };

  render() {
    const { isEditing, editedText } = this.state;

    const { task, onItemDeleted, onToggleCompleted } = this.props;
    const { text, startTime, isCompleted } = task;

    let taskClass = null;

    if (isEditing) {
      taskClass = 'editing';
    } else if (isCompleted) {
      taskClass = 'completed';
    }

    return (
      <li className={taskClass}>
        <div className="view">
          <input className="toggle" checked={isCompleted} type="checkbox" onChange={onToggleCompleted} />
          <label>
            <span className="description">{text}</span>
            <Since startTime={startTime} />
          </label>
          <button className="icon icon-edit" onClick={this.onEdited} type="button" aria-label="Edit button" />
          <button className="icon icon-destroy" onClick={onItemDeleted} type="button" aria-label="Destroy button" />
        </div>
        <form onSubmit={this.onSubmit}>
          <input type="text" className="edit" onChange={this.onTaskEdit} value={editedText} />
        </form>
      </li>
    );
  }
}
