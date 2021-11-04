import React, { useContext, useState } from 'react';
import './styles.css';

import { TasksContext } from '../../Context/TasksProvider';

import Cards from '../Cards';
import TaskForm from '../TaskForm';

import orderTasks from '../../helpers/orderTasks';

export default function Board() {
  const { tasks } = useContext(TasksContext);

  const [orderBy, setOrderBy] = useState('alphabetical');
  const [descending, setDescending] = useState('asc');

  const pending = tasks.filter(({ status }) => status === 'pendente');
  const inProgress = tasks.filter(({ status }) => status === 'em_progresso');
  const done = tasks.filter(({ status }) => status === 'concluida');

  const pendingOrdered = orderTasks(orderBy, pending);
  const inProgressOrdered = orderTasks(orderBy, inProgress);
  const doneOrdered = orderTasks(orderBy, done);

  return (
    <div className="boardWrapper">
      <TaskForm edit={ false } />
      <div className="filtersWrapper">
        <h1 className="filterTitle">Ordem:</h1>
        <label htmlFor="order">
          <select
            value={ orderBy }
            onChange={ (event) => setOrderBy(event.target.value) }
            className="filterSelect"
          >
            <option value="alphabetical">alfabética</option>
            <option value="createdAt">de criação</option>
          </select>
        </label>
        <label htmlFor="desc/asc">
          <select
            value={ descending }
            onChange={ (event) => setDescending(event.target.value) }
            className="filterSelect"
          >
            <option value="asc">crescente</option>
            <option value="desc">decrescente</option>
          </select>
        </label>
      </div>
      <main className="boardColumnsWrapper">
        <div className="boardColumn">
          <h4 className="boardColumnTitle">Pendentes:</h4>
          <ul
            className={ `taskListColumn ${
              descending === 'asc' ? 'columnAsc' : 'columnDesc'
            }` }
          >
            <Cards tasks={ pendingOrdered } />
          </ul>
        </div>
        <div className="boardColumn">
          <h4 className="boardColumnTitle">Em progresso:</h4>
          <ul
            className={ `taskListColumn ${
              descending === 'asc' ? 'columnAsc' : 'columnDesc'
            }` }
          >
            <Cards tasks={ inProgressOrdered } />
          </ul>
        </div>
        <div className="boardColumn">
          <h4 className="boardColumnTitle">Concluídas:</h4>
          <ul
            className={ `taskListColumn ${
              descending === 'asc' ? 'columnAsc' : 'columnDesc'
            }` }
          >
            <Cards tasks={ doneOrdered } />
          </ul>
        </div>
      </main>
    </div>
  );
}
