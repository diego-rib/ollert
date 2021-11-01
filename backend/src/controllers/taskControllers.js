// Controllers
const {
  getAllTasksService,
  createNewTaskService,
} = require('../services/taskServices');

const getAllTasksController = async (_req, res, next) => {
  const { tasks, error } = await getAllTasksService();

  if (error) return next(error);

  res.status(200).json({ tasks });
};

const createNewTaskController = async (req, res, next) => {
  const { info, status } = req.body;

  const { task, error } = await createNewTaskService(info, status);

  if (error) return next(error);

  res.status(201).json(task);
};

module.exports = {
  getAllTasksController,
  createNewTaskController,
};
