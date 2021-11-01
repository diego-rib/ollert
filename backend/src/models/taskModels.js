// Models
const connection = require('./connection');

const getAllTasks = async () => {
  const db = await connection();

  const tasks = await db
    .collection('tasks')
    .find({})
    .toArray();
  
  return tasks;
};

const createNewTask = async (info, status, createdAt) => {
  const db = await connection();

  const inserted = await db
    .collection('tasks')
    .insertOne({ info, status, createdAt });
  
  return { _id: inserted.insertedId, info, status, createdAt };
};

module.exports = {
  getAllTasks,
  createNewTask,
};
