import React from 'react';
import PropTypes from 'prop-types';
import Task from '../task';

const TaskList = ({ tasks, onItemDeleted, onItemEdited, onToggleCompleted }) => {
  const tasksList = tasks.map((task) => {
    const { id } = task;

    return (
      <Task
        key={id}
        task={task}
        onItemDeleted={() => onItemDeleted(id)}
        onItemEdited={onItemEdited}
        onToggleCompleted={() => onToggleCompleted(id)}
      />
    );
  });

  return <ul className="todo-list">{tasksList}</ul>;
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      startTime: PropTypes.instanceOf(Date).isRequired,
      isCompleted: PropTypes.bool.isRequired,
    }).isRequired
  ).isRequired,
  onItemDeleted: PropTypes.func.isRequired,
  onItemEdited: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
};

export default TaskList;
