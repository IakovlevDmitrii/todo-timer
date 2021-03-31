import React, { Component } from 'react';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

import '../../style.css';

const filterTasks = (tasks, filter) => {
  switch (filter) {
    case 'all':
      return tasks;

    case 'active':
      return tasks.filter((task) => !task.isCompleted);

    case 'completed':
      return tasks.filter((task) => task.isCompleted);

    default:
      return tasks;
  }
};

export default class App extends Component {
  maxId = 1;

  state = {
    tasks: [this.createTask('First', 60), this.createTask('Second', 60), this.createTask('Third', 60)],
    filter: 'all',
  };

  deleteTask = (id) => {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex((task) => task.id === id);
      const newTasks = [...tasks.slice(0, index), ...tasks.slice(index + 1)];

      return {
        tasks: newTasks,
      };
    });
  };

  deleteAllCompleted = () => {
    this.setState(({ tasks }) => {
      const newTasks = tasks.filter((task) => !task.isCompleted);

      return {
        tasks: newTasks,
      };
    });
  };

  addTask = (taskText, timeLeft) => {
    const newTask = this.createTask(taskText, timeLeft);

    this.setState(({ tasks }) => {
      const newTasks = [...tasks, newTask];

      return {
        tasks: newTasks,
      };
    });
  };

  editTaskText = (id, taskText) => {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex((task) => task.id === id);
      const oldTask = tasks[index];
      const newTask = { ...oldTask, taskText };
      const newTasks = [...tasks.slice(0, index), newTask, ...tasks.slice(index + 1)];

      return {
        tasks: newTasks,
      };
    });
  };

  onToggleCompleted = (id) => {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex((task) => task.id === id);
      const oldTask = tasks[index];
      const newTask = { ...oldTask, isCompleted: !oldTask.isCompleted };
      const newTasks = [...tasks.slice(0, index), newTask, ...tasks.slice(index + 1)];

      return {
        tasks: newTasks,
      };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  editTimeLeft = (id, timeLeft) => {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex((task) => task.id === id);
      const oldTask = tasks[index];
      const newTask = { ...oldTask, timeLeft };
      const newTasks = [...tasks.slice(0, index), newTask, ...tasks.slice(index + 1)];

      return {
        tasks: newTasks,
      };
    });
  };

  createTask(taskText, timeLeft = 0) {
    const id = this.maxId;
    this.maxId += 1;

    return {
      id,
      isCompleted: false,
      startTime: new Date(),
      taskText,
      timeLeft,
    };
  }

  render() {
    const { tasks, filter } = this.state;
    const visibleTasks = filterTasks(tasks, filter);
    const todoCount = tasks.filter((task) => !task.isCompleted).length;

    return (
      <section className="todoapp">
        <NewTaskForm onTaskAdded={this.addTask} />
        <section className="main">
          <TaskList
            tasks={visibleTasks}
            onTimeLeftEdited={this.editTimeLeft}
            onTaskTextEdited={this.editTaskText}
            onTaskDeleted={this.deleteTask}
            onToggleCompleted={this.onToggleCompleted}
          />
          <Footer
            toDo={todoCount}
            onDeleted={this.deleteAllCompleted}
            onFilterChange={this.onFilterChange}
            filter={filter}
          />
        </section>
      </section>
    );
  }
}
