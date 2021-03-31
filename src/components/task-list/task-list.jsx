import React from 'react';
import PropTypes from 'prop-types';
import Task from '../task';

const TaskList = ({ tasks, onTimeLeftEdited, onTaskDeleted, onTaskTextEdited, onToggleCompleted }) => {
  const tasksList = tasks.map((task) => {
    const { id } = task;
    return (
      <Task
        key={id}
        task={task}
        onTimeLeftEdited={(timeLeft) => onTimeLeftEdited(id, timeLeft)}
        onTaskDeleted={() => onTaskDeleted(id)}
        onTaskTextEdited={onTaskTextEdited}
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
      isCompleted: PropTypes.bool.isRequired,
      startTime: PropTypes.instanceOf(Date).isRequired,
      taskText: PropTypes.string.isRequired,
      timeLeft: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
  onTimeLeftEdited: PropTypes.func.isRequired,
  onTaskDeleted: PropTypes.func.isRequired,
  onTaskTextEdited: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
};

export default TaskList;
