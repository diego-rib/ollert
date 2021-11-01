const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;
const sinon = require('sinon');
const server = require('../src/server/app');
const { MongoClient } = require('mongodb');
const { getConnection } = require('./connectionMock');

describe('Testa o endpoint GET `/tasks`', () => {
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
      response = await chai
        .request(server)
        .get('/tasks');
    });

    it('retorna status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um array', () => {
      expect(response.body.tasks).to.be.an('array');
    });
  });
});
