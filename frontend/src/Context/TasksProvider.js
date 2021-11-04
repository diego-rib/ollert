import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import api from '../services/api';

export const TasksContext = createContext();

export default function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(true);

  async function getAllTasks() {
    const { data } = await api.get('tasks');
    setShouldUpdate(false);
    setTasks(data.tasks);
  }

  async function sendTaskData(info, status) {
    await api.post('/tasks', { info, status });
  }

  async function updateTaskData(info, status) {
    await api.put(`/tasks/${id}`, { info, status });
  }

  async function deleteTask(id) {
    await api.delete(`/tasks/${id}`);
    setShouldUpdate(true);
  }

  useEffect(() => {
    if (shouldUpdate) {
      getAllTasks();
    }
  }, [shouldUpdate]);

  const context = {
    tasks,
    setShouldUpdate,
    sendTaskData,
    updateTaskData,
    deleteTask,
  };

  return (
    <TasksContext.Provider value={ context }>
      {children}
    </TasksContext.Provider>
  );
}

TasksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
