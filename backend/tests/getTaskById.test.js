const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;
const sinon = require('sinon');
const server = require('../src/server/app');
const { MongoClient } = require('mongodb');
const { getConnection } = require('./connectionMock');

describe('Testa o endpoint GET `/tasks/:id`', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Retorna sucesso na resposta', () => {
    let response;

    before(async () => {
      const { body: { task } } = await chai
        .request(server)
        .post('/tasks')
        .send({
          info: 'trocar a areia da caixa de areia do gato',
          status: 'pendente',
        });

      const { _id } = task;

      response = await chai
        .request(server)
        .get(`/tasks/${_id}`);
    });

    it('retorna status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto', () => {
      expect(response.body.task).to.be.an('object');
    });

    it('o objeto retornado contem as chaves: `_id, info, status, createdAt`', () => {
      expect(response.body.task).to.contain.keys(['_id', 'info', 'status', 'createdAt']);
    });
  });

  describe('Id inserido é inválido', () => {
    let response;

    const invalidId = 'jaskdgkjh123123asdwqe123';

    before(async () => {
      response = await chai
        .request(server)
        .get(`/tasks/${invalidId}`);
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

    const inexistentId = '618015c92425c12defa81661';

    before(async () => {
      response = await chai
        .request(server)
        .get(`/tasks/${inexistentId}`);
    });

    it('retorna status 404', () => {
      expect(response).to.have.status(404);
    });

    it('retorna uma mensagem: `Não existem tarefas com o id inserido`', () => {
      expect(response.body.message).to.equal('Não existem tarefas com o id inserido');
    });
  });
});
