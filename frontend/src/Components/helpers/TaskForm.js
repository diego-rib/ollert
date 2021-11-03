import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { TasksContext } from '../../Context/TasksProvider';

export default function TaskForm({
  taskInfo = '',
  taskStatus = '',
  callback,
  buttonMessage,
}) {
  const { setShouldUpdate } = useContext(TasksContext);

  const [info, setInfo] = useState(taskInfo);
  const [status, setStatus] = useState(taskStatus);

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

      <button type="submit" className="newTaskButton">{buttonMessage}</button>
    </form>
  );
}

TaskForm.propTypes = {
  taskInfo: PropTypes.string,
  taskStatus: PropTypes.string,
  callback: PropTypes.func.isRequired,
  buttonMessage: PropTypes.string.isRequired,
};

TaskForm.defaultProps = {
  taskInfo: '',
  taskStatus: '',
};
