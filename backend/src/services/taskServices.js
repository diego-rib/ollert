// Services
const {
  getAllTasks,
} = require('../models/taskModels');

const errors = require('../errors/tasksErrors');

const getAllTasksService = async () => {
  const tasks = await getAllTasks();

  if (!tasks) return { error: errors.internalError };

  return { tasks };
};

module.exports = {
  getAllTasksService,
};
