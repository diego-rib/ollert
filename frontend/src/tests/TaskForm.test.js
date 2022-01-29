import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { customRender, multipleTestWrapper, generateTestMessage } from './utils';

import TaskForm from '../Components/TaskForm';
import { getAllTasks } from './mock/getRandomTask';

describe('Testa o componente TaskForm', () => {
  describe('recebe mensagem de erro quando não insere os dados incorretos', async () => {
    customRender(<TaskForm edit="" />);

    const tasks = getAllTasks('invalid');

    tasks.forEach((task) => {
      it(generateTestMessage(task), () => {
        const warningDuration = 2001;
        multipleTestWrapper(() => {
          const [inputInfo, inputStatus] = makeNewTask(task);

          expect(inputInfo).toHaveValue(task.info);
          expect(inputStatus).toHaveValue(task.status);

          const errorMessage = `O campo \`${task.error}\` precisa ser preenchido`;

          expect(screen.queryByText(errorMessage)).toBeInTheDocument();
        }, warningDuration);
      });
    });
  });

  describe('adiciona tarefa com sucesso com dados corretos', async () => {
    customRender(<TaskForm edit="" />);

    const tasks = getAllTasks('valid');

    tasks.forEach((task) => {
      it(generateTestMessage(task), () => {
        multipleTestWrapper(() => {
          const [inputInfo, inputStatus] = makeNewTask(task);

          expect(inputInfo).toHaveValue('');
          expect(inputStatus).toHaveValue('');
        });
      });
    });
  });
});
