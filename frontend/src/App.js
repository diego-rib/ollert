import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './styles.css';

// Context
import TasksProvider from './Context/TasksProvider';

import Header from './Components/Header';

// Componentes
import Board from './Components/Board';
import EditCard from './Components/EditCard';

export default function App() {
  return (
    <TasksProvider>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={ Board } />
          <Route path="/:id" component={ EditCard } />
        </Switch>
      </BrowserRouter>
    </TasksProvider>
  );
}
