import React, { Component } from 'react';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

const filterItems = (items, filter) => {
  switch (filter) {
    case 'all':
      return items;

    case 'active':
      return items.filter((item) => !item.isCompleted);

    case 'completed':
      return items.filter((item) => item.isCompleted);

    default:
      return items;
  }
};

export default class App extends Component {
  maxTaskDataId = 0;

  state = {
    taskData: [this.createTaskDataItem('First'), this.createTaskDataItem('Second'), this.createTaskDataItem('Third')],
    filter: 'all',
  };

  deleteTaskDataItem = (id) => {
    this.setState(({ taskData }) => {
      const index = taskData.findIndex((el) => el.id === id);

      const newTaskData = [...taskData.slice(0, index), ...taskData.slice(index + 1)];

      return {
        taskData: newTaskData,
      };
    });
  };

  deleteAllCompletedItems = () => {
    this.setState(({ taskData }) => {
      const newTaskData = taskData.filter((item) => !item.isCompleted);

      return {
        taskData: newTaskData,
      };
    });
  };

  addTaskDataItem = (text) => {
    const newTaskDataItem = this.createTaskDataItem(text);

    this.setState(({ taskData }) => {
      const newTaskData = [...taskData, newTaskDataItem];

      return {
        taskData: newTaskData,
      };
    });
  };

  editTaskDataItem = (id, text) => {
    this.setState(({ taskData }) => {
      const taskIndex = taskData.findIndex((task) => task.id === id);

      const oldItem = taskData[taskIndex];
      const newItem = { ...oldItem, text };

      const newTaskData = [...taskData.slice(0, taskIndex), newItem, ...taskData.slice(taskIndex + 1)];

      return {
        taskData: newTaskData,
      };
    });
  };

  onToggleCompleted = (id) => {
    this.setState(({ taskData }) => {
      const taskIndex = taskData.findIndex((task) => task.id === id);

      const oldItem = taskData[taskIndex];
      const newItem = { ...oldItem, isCompleted: !oldItem.isCompleted };

      const newTaskData = [...taskData.slice(0, taskIndex), newItem, ...taskData.slice(taskIndex + 1)];

      return {
        taskData: newTaskData,
      };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  createTaskDataItem(text) {
    const id = this.maxTaskDataId;
    this.maxTaskDataId += 1;

    return {
      id,
      text,
      startTime: new Date(),
      isCompleted: false,
    };
  }

  render() {
    const { taskData, filter } = this.state;

    const visibleTasks = filterItems(taskData, filter);

    const todoCount = taskData.filter((task) => !task.isCompleted).length;

    return (
      <section className="todoapp">
        <NewTaskForm onItemAdded={this.addTaskDataItem} />
        <section className="main">
          <TaskList
            tasks={visibleTasks}
            onItemEdited={this.editTaskDataItem}
            onItemDeleted={this.deleteTaskDataItem}
            onToggleCompleted={this.onToggleCompleted}
          />
          <Footer
            toDo={todoCount}
            onDeleted={this.deleteAllCompletedItems}
            onFilterChange={this.onFilterChange}
            filter={filter}
          />
        </section>
      </section>
    );
  }
}
