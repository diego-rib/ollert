import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

import { TasksContext } from '../../Context/TasksProvider';

export default function TaskForm({ taskInfo = '', taskStatus = '', edit, push }) {
  const {
    setShouldUpdate,
    sendTaskData,
    updateTaskData,
    deleteTask,
  } = useContext(TasksContext);

  const [info, setInfo] = useState(taskInfo);
  const [status, setStatus] = useState(taskStatus);
  useEffect(() => {
    setInfo(taskInfo);
    setStatus(taskStatus);
  }, [taskInfo, taskStatus]);

  const [error, setError] = useState('');
  function errorMessage(field) {
    const twoSeconds = 2000;
    setError(`O campo ${field} precisa ser preenchido`);
    setTimeout(() => {
      setError('');
    }, twoSeconds);
  }

  async function submitForm(event) {
    event.preventDefault();
    if (!info.trim()) return errorMessage('`Tarefa`');
    if (!status.trim()) return errorMessage('`Status`');

    setInfo('');
    setStatus('');

    if (!edit.trim()) {
      await sendTaskData(info, status);
    } else {
      await updateTaskData(edit, info, status);
    }

    setShouldUpdate(true);
    push('/');
  }

  async function redirectToHome(fn, param) {
    if (fn) await fn(param);
    push('/');
  }

  return (
    <form onSubmit={ submitForm } className="newTaskForm">
      { !error.trim() ? null : <p className="newTaskErrorMessage">{error}</p> }

      <label htmlFor="info" className="newTaskInputLabel">
        Tarefa:
        <input
          name="info"
          value={ info }
          onChange={ (event) => setInfo(event.target.value) }
          className="newTaskInput"
          data-testid="form-task-input"
        />
      </label>

      <label htmlFor="status" className="newTaskSelectLabel">
        Status:
        <select
          name="status"
          value={ status }
          onChange={ (event) => setStatus(event.target.value) }
          className="newTaskSelect"
          data-testid="form-task-status"
        >
          <option value="">{}</option>
          <option value="pendente">Pendente</option>
          <option value="em_progresso">Em progresso</option>
          <option value="concluida">Concluída</option>
        </select>
      </label>

      <div className="buttonsWrapper">
        {
          edit && (
            <button
              type="button"
              className="goBackButton"
              onClick={ () => redirectToHome() }
              data-testid="form-task-go-back-button"
            >
              Voltar
            </button>
          )
        }
        <button
          type="submit"
          className="newTaskButton"
          data-testid="form-task-button"
        >
          {edit ? 'Salvar alterações' : 'Adicionar tarefa'}
        </button>
        {
          edit && (
            <button
              type="button"
              onClick={ () => redirectToHome(deleteTask, edit) }
              className="deleteButton"
              data-testid="form-task-delete-button"
            >
              Deletar
            </button>
          )
        }
      </div>
    </form>
  );
}

TaskForm.propTypes = {
  taskInfo: PropTypes.string,
  taskStatus: PropTypes.string,
  edit: PropTypes.string,
  push: PropTypes.func,
};

TaskForm.defaultProps = {
  taskInfo: '',
  taskStatus: '',
  edit: null,
  push: () => {},
};
