const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;
const sinon = require('sinon');
const server = require('../src/server/app');
const { MongoClient } = require('mongodb');
const { getConnection } = require('./connectionMock');

const validTask = {
  info: 'caminhar',
  status: 'concluido',
};

describe('Testa o endpoint POST `/tasks`', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Cria a tarefa com sucesso', () => {
    let response;

    before(async () => {
      response = await chai
        .request(server)
        .post('/tasks')
        .send(validTask);
    });

    it('retorna status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto', () => {
      expect(response.body.task).to.be.an('object');
    });

    it('o objeto retornado contem as chaves: `_id, info, status, createdAt`', () => {
      expect(response.body.task).to.contain.keys(['_id', 'info', 'status', 'createdAt']);
    });
  });

  describe('Parametro \'info\' não é inserido', () => {
    let response;

    before(async () => {
      response = await chai
        .request(server)
        .post('/tasks')
        .send({ status: 'em_progresso' });
    });

    it('retorna status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna uma mensagem: `Os campos \'info\' e \'status\' devem ser preenchidos`', () => {
      expect(response.body.message).to.equal('Os campos \'info\' e \'status\' devem ser preenchidos');
    });
  });

  describe('Parametro \'status\' não é inserido', () => {
    let response;

    before(async () => {
      response = await chai
        .request(server)
        .post('/tasks')
        .send({ info: 'andar de bicicleta', status: '' });
    });

    it('retorna status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna uma mensagem: `Os campos \'info\' e \'status\' devem ser preenchidos`', () => {
      expect(response.body.message).to.equal('Os campos \'info\' e \'status\' devem ser preenchidos');
    });
  });
});
