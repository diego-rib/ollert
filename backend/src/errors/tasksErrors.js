module.exports = {
  invalidParams: {
    code: 400,
    message: 'Os campos \'info\' e \'status\' devem ser preenchidos',
  },
  invalidId: {
    code: 400,
    message: 'Id inserido é inválido',
  },
  taskNotFound: {
    code: 404,
    message: 'Não existem tarefas com o id inserido',
  },
};
