import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import customRender from './customRender';

import TaskForm from '../Components/TaskForm';
import { getAllTasks, getRandomTask } from './mock/getRandomTask';

describe('Testa o componente TaskForm', () => {
  describe('recebe mensagem de erro quando não insere os dados incorretos', async () => {
    customRender(<TaskForm edit="" />);

    const tasks = getAllTasks('invalid');

    const inputInfo = screen.queryByRole('textbox');
    const inputStatus = screen.queryByTestId('form-task-status');
    const addButton = screen.queryByRole('button', { name: /adicionar tarefa/i });

    tasks.forEach((task) => {
      it(`testa caso: ${JSON.stringify(task, null, '')}`, () => {
        const warningDuration = 2001;
        setTimeout(() => {
          userEvent.type(inputInfo, task.info);
          userEvent.selectOptions(inputStatus, task.status);

          expect(inputInfo).toHaveValue(task.info);
          expect(inputStatus).toHaveValue(task.status);

          userEvent.click(addButton);

          expect(inputInfo).toHaveValue(task.info);
          expect(inputStatus).toHaveValue(task.status);

          const errorMessage = `O campo \`${task.error}\` precisa ser preenchido`;

          expect(screen.queryByText(errorMessage)).toBeInTheDocument();
        }, warningDuration);
      });
    });
  });

  it('adiciona tarefa com sucesso', async () => {
    customRender(<TaskForm edit="" />);

    const task = getRandomTask('valid');

    const inputInfo = screen.queryByRole('textbox');
    const inputStatus = screen.queryByTestId('form-task-status');
    const addButton = screen.queryByRole('button', { name: /adicionar tarefa/i });

    userEvent.type(inputInfo, task.info);
    userEvent.selectOptions(inputStatus, task.status);

    expect(inputInfo).toHaveValue(task.info);
    expect(inputStatus).toHaveValue(task.status);

    userEvent.click(addButton);

    const timeout = 500;

    setTimeout(() => {
      expect(inputInfo).toHaveValue('');
      expect(inputInfo).toHaveValue('');
    }, timeout);
  });
});
