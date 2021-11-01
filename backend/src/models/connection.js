// Connection
const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://localhost:27017/Ollert';
const DB_NAME = 'Ollert';

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db = null;

const connection = async () => {
  if (db) Promise.resolve(db);

  const connect = await MongoClient.connect(MONGO_DB_URL, OPTIONS);
  db = await connect.db(DB_NAME);
  return db;
};

module.exports = connection;
