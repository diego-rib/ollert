import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import api from '../services/api';

export const TasksContext = createContext();

export default function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await api.get('tasks');
      setShouldUpdate(false);
      setTasks(data.tasks);
    }
    if (shouldUpdate) {
      fetchData();
    }
  }, [shouldUpdate]);

  const context = {
    tasks,
    setShouldUpdate,
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
