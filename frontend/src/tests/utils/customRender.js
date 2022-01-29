import React from 'react';
import { render } from '@testing-library/react';
import TasksProvider from '../../Context/TasksProvider';

function customRender(ui) {
  return render(
    <TasksProvider>
      {ui}
    </TasksProvider>,
  );
}

export default customRender;
