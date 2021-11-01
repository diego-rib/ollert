// Services
const { ObjectId } = require('mongodb');

const {
  getAllTasks,
  createNewTask,
  updateTask,
  getTaskById,
  removeTask,
} = require('../models/taskModels');

const newTaskValidate = require('../validations/newTaskValidate');
const errors = require('../errors/tasksErrors');

const getAllTasksService = async () => {
  const tasks = await getAllTasks();

  if (!tasks) return { error: errors.internalError };

  return { tasks };
};

const createNewTaskService = async (info, status) => {
  const createdAt = Date.now();

  const { error } = newTaskValidate(info, status);

  if (error) return { error };

  const task = await createNewTask(info, status, createdAt);

  if (!task) return { error: errors.internalError };

  return { task };
};

const updateTaskService = async (id, info, status) => {
  if (!ObjectId.isValid(id)) return { error: errors.invalidId };

  const { error } = newTaskValidate(info, status);

  if (error) return { error };

  const task = await updateTask(ObjectId(id), info, status);

  if (!task) return { error: errors.taskNotFound };

  return { task };
};

const getTaskByIdService = async (id) => {
  if (!ObjectId.isValid(id)) return { error: errors.invalidId };

  const task = await getTaskById(ObjectId(id));

  if (!task) return { error: errors.taskNotFound };

  return { task };
};

const removeTaskService = async (id) => {
  if (!ObjectId(id).isValid) return { error: errors.invalidId };

  const task = await removeTask(ObjectId(id));

  if (!task) return { error: errors.taskNotFound };

  return { error: null };
};

module.exports = {
  getAllTasksService,
  createNewTaskService,
  updateTaskService,
  getTaskByIdService,
  removeTaskService,
};
