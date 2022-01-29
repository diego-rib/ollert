import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

function makeNewTask(task) {
  const inputInfo = screen.queryByRole('textbox');
  const inputStatus = screen.queryByTestId('form-task-status');
  const addButton = screen.queryByRole('button', { name: /adicionar tarefa/i });

  userEvent.type(inputInfo, task.info);
  userEvent.selectOptions(inputStatus, task.status);

  expect(inputInfo).toHaveValue(task.info);
  expect(inputStatus).toHaveValue(task.status);

  userEvent.click(addButton);

  return [inputInfo, inputStatus];
}

export default makeNewTask;
