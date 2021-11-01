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

const updateTask = async (id, info, status) => {
  const db = await connection();

  const updated = await db
    .collection('tasks')
    .findOneAndUpdate(
      { _id: id },
      { $set: { info, status } },
      { returnNewDocument: true },
    );

  return { ...updated.value, info, status };
};

const getTaskById = async (id) => {
  const db = await connection();

  const task = await db
    .collection('tasks')
    .findOne({ _id: id });
  
  return task;
};

module.exports = {
  getAllTasks,
  createNewTask,
  updateTask,
  getTaskById,
};
