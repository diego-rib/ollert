import React, { useContext, useState } from 'react';
import { TasksContext } from '../../Context/TasksProvider';

export default function TaskForm({ taskInfo = '', taskStatus = '', callback, buttonMessage }) {
  const { setShouldUpdate } = useContext(TasksContext);

  const [info, setInfo] = useState(taskInfo);
  const [status, setStatus] = useState(taskStatus);

  const [error, setError] = useState('');

  function errorMessage(field) {
    setError(`O campo ${field} precisa ser preenchido`);
    setTimeout(() => {
      setError('');
    }, 2000);
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
    <form onSubmit={submitForm} className="newTaskForm">
      { !!error.trim() ? <p className="newTaskErrorMessage">{error}</p> : null }

      <label className="newTaskInputLabel">
        Tarefa:
        <input
          name="info"
          value={info}
          onChange={(event) => setInfo(event.target.value)}
          className="newTaskInput"
        />
      </label>
  
      <label className="newTaskSelectLabel">
        Status:
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="newTaskSelect"
        >
          <option value=""></option>
          <option value="pendente">Pendente</option>
          <option value="em_progresso">Em progresso</option>
          <option value="concluida">Concluída</option>
        </select>
      </label>

      <button type="submit" className="newTaskButton">{buttonMessage}</button>
    </form>
  )
}
