const validTasks = [
  {
    info: 'Comprar pão',
    status: 'pendente',
  },
  {
    info: 'Estudar',
    status: 'em_progresso',
  },
  {
    info: 'Tomar café da manhã',
    status: 'concluida',
  },
  {
    info: 'Almoçar',
    status: 'pendente',
  },
  {
    info: 'Caminhar',
    status: 'concluida',
  },
];

const invalidTasks = [
  {
    info: '',
    status: 'concluida',
    error: 'Tarefa',
  },
  {
    info: 'Viajar',
    status: '',
    error: 'Status',
  },
  {
    info: '',
    status: '',
    error: 'Tarefa',
  },
];

export {
  validTasks,
  invalidTasks,
};
