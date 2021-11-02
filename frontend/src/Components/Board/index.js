import React, { useContext } from 'react';
import './styles.css';

import { TasksContext } from '../../Context/TasksProvider';

import Cards from '../Cards';

export default function Board() {
  const { tasks } = useContext(TasksContext);

  const pending = tasks.filter(({ status }) => status === 'pendente');
  const inProgress = tasks.filter(({ status }) => status === 'em_progresso');
  const done = tasks.filter(({ status }) => status === 'concluida');

  return (
    <div className="boardWrapper">
      <h1 className="boardTitle">Tarefas:</h1>
      <main className="boardColumnsWrapper">
        <ul className="boardColumn">
          <h4 className="boardColumnTitle">Pendentes:</h4>
          <Cards tasks={ pending } />
        </ul>
        <ul className="boardColumn">
          <h4 className="boardColumnTitle">Em progresso:</h4>
          <Cards tasks={ inProgress } />
        </ul>
        <ul className="boardColumn">
          <h4 className="boardColumnTitle">Concluídas:</h4>
          <Cards tasks={ done } />
        </ul>
      </main>
    </div>
  );
}
