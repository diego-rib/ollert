const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;
const sinon = require('sinon');
const server = require('../src/server/app');
const { MongoClient } = require('mongodb');
const { getConnection } = require('./connectionMock');

describe('Testa o endpoint DELETE `/tasks/:id`', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Deleta a tarefa com sucesso', () => {
    let response;
    let id;

    before(async () => {
      const { body: { task } } = await chai
        .request(server)
        .post('/tasks')
        .send({
          info: 'trocar a areia da caixa de areia do gato',
          status: 'pendente',
        });

      id = task._id;

      response = await chai
        .request(server)
        .delete(`/tasks/${task._id}`);
    });

    it('retorna status 200', () => {
      expect(response).to.have.status(200);
    });

    it('A tarefa não é encontrada novamente', async () => {
      const data = await chai
        .request(server)
        .get(`/tasks/${id}`);

      expect(data).to.have.status(404);
      expect(data.body.message).to.equal('Não existem tarefas com o id inserido');
    });
  });

  describe('Id inserido é inválido', () => {
    let response;

    const invalidId = 'jaskdgkjh123123asdwqe123';

    before(async () => {
      response = await chai
        .request(server)
        .delete(`/tasks/${invalidId}`);
    });

    it('retorna status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna uma mensagem: `Id inserido é inválido`', () => {
      expect(response.body.message).to.equal('Id inserido é inválido');
    });
  });

  describe('Id inserido é válido porém não pode ser encontrado', () => {
    let response;

    const inexistentId = '61815b5f29dc57251e564904';

    before(async () => {
      response = await chai
        .request(server)
        .delete(`/tasks/${inexistentId}`);
    });

    it('retorna status 404', () => {
      expect(response).to.have.status(404);
    });

    it('retorna uma mensagem: `Não existem tarefas com o id inserido`', () => {
      expect(response.body.message).to.equal('Não existem tarefas com o id inserido');
    });
  });
});
