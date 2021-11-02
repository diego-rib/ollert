import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './styles.css';

// Context
import TasksProvider from './Context/TasksProvider';

import Header from './Components/Header';

// Componentes
import Board from './Components/Board';
import CardEditForm from './Components/CardEditForm';

function App() {
  return (
    <TasksProvider>
      <BrowserRouter>
      <Header />
        <Switch>
          <Route exact path="/" component={Board} />
          <Route path="/:id" component={CardEditForm} />
        </Switch>
      </BrowserRouter>
    </TasksProvider>
  );
}

export default App;
