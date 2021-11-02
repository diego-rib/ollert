import React, { useContext } from 'react';
import './styles.css';

import { TasksContext } from '../../Context/TasksProvider';

import Cards from '../Cards';

function Board() {
  const { tasks } = useContext(TasksContext);

  const pending = tasks.filter(({ status }) => status === 'pendente');
  const inProgress = tasks.filter(({ status }) => status === 'em_progresso');
  const done = tasks.filter(({ status }) => status === 'concluida');

  return (
    <div className="boardWrapper">
      <h1 className="boardTitle">Tarefas:</h1>
      <main className="boardColumnsWrapper">
        <ul className="boardColumn">
          <h3 className="boardColumnTitle">Pendentes:</h3>
          {
            pending.map((task) => <Cards key={task._id} task={ task } />)
          }
        </ul>
        <ul className="boardColumn">
        <h3 className="boardColumnTitle">Em progresso:</h3>
          {
            inProgress.map((task) => <Cards key={task._id} task={ task } />)
          }
        </ul>
        <ul className="boardColumn">
        <h3 className="boardColumnTitle">Concluídas:</h3>
          {
            done.map((task) => <Cards key={task._id} task={ task } />)
          }
        </ul>
      </main>
    </div>
  );
}

export default Board;
