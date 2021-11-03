import React from 'react';
import api from '../../services/api';

import TaskForm from '../helpers/TaskForm';

export default function NewTaskForm() {
  async function sendTask(info, status) {
    await api.post('/tasks', { info, status });
  }

  return (
    <TaskForm callback={ sendTask } edit={ false } />
  );
}
