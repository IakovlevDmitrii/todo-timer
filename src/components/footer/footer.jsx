import React from 'react';
import PropTypes from 'prop-types';
import TasksFilter from '../tasks-filter';

const Footer = ({ toDo, onFilterChange, onDeleted, filter }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{toDo} items left</span>
      <TasksFilter onFilterChange={onFilterChange} filter={filter} />
      <button className="clear-completed" onClick={onDeleted} type="button">
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  toDo: PropTypes.number.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default Footer;
