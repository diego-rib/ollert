// Services
const {
  getAllTasks,
  createNewTask,
} = require('../models/taskModels');
const newTaksValidate = require('../validations/newTaskValidate');
const errors = require('../errors/tasksErrors');

const getAllTasksService = async () => {
  const tasks = await getAllTasks();

  if (!tasks) return { error: errors.internalError };

  return { tasks };
};

const createNewTaskService = async (info, status) => {
  const createdAt = Date.now();

  const { error } = newTaksValidate(info, status);

  if (error) return { error };

  const task = await createNewTask(info, status, createdAt);

  if (!task) return { error: errors.internalError };

  return { task };
};

module.exports = {
  getAllTasksService,
  createNewTaskService,
};
