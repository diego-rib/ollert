import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

import { TasksContext } from '../../Context/TasksProvider';

export default function TaskForm({
  taskInfo = '',
  taskStatus = '',
  callback,
  edit,
  push,
}) {
  const { setShouldUpdate, deleteTask } = useContext(TasksContext);

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

    await callback(info, status);

    setInfo('');
    setStatus('');
    setShouldUpdate(true);
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
        />
      </label>

      <label htmlFor="status" className="newTaskSelectLabel">
        Status:
        <select
          name="status"
          value={ status }
          onChange={ (event) => setStatus(event.target.value) }
          className="newTaskSelect"
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
            <button type="button" className="goBackButton" onClick={ () => push('/') }>
              Voltar
            </button>
          )
        }
        <button type="submit" className="newTaskButton">
          {edit ? 'Salvar alterações' : 'Adicionar tarefa'}
        </button>
        {
          edit && (
            <button
              type="button"
              onClick={ async () => {
                await deleteTask(edit);
                push('/');
              } }
              className="deleteButton"
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
  callback: PropTypes.func.isRequired,
  edit: PropTypes.bool,
  push: PropTypes.func,
};

TaskForm.defaultProps = {
  taskInfo: '',
  taskStatus: '',
  edit: null,
  push: () => {},
};
