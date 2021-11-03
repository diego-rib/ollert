import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

import api from '../../services/api';

import TaskForm from '../helpers/TaskForm';

export default function CardEditForm({ match, history }) {
  const { id } = match.params;

  const [task, setTask] = useState({ info: '', status: '' });

  const taskId = useRef(id);

  useEffect(() => {
    async function fetchData() {
      const { data } = await api.get(`/tasks/${taskId.current}`);
      setTask(data.task);
    }
    fetchData();
  }, []);

  async function updateTaskData(info, status) {
    await api.put(`/tasks/${id}`, { info, status });
    history.push('/');
  }

  return (
    <div>
      {
        task
          ? (
            <TaskForm
              taskInfo={ task.info }
              taskStatus={ task.status }
              callback={ updateTaskData }
              edit={ id }
              push={ history.push }
            />
          )
          // Loader retirado do site: https://projects.lukehaas.me/css-loaders/
          : <div className="loader">Loading...</div>
      }
    </div>
  );
}

CardEditForm.propTypes = {
  match: {
    params: {
      id: PropTypes.string,
    },
  },
}.isRequired;
