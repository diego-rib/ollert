// Controllers
const {
  getAllTasksService,
  createNewTaskService,
  updateTaskService,
  getTaskByIdService,
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

const updateTaskController = async (req, res, next) => {
  const { id } = req.params;
  const { info, status } = req.body;

  const { task, error } = await updateTaskService(id, info, status);

  if (error) return next(error);

  res.status(200).json(task);
};

const getTaskByIdController = async (req, res, next) => {
  const { id } = req.params;

  const { task, error } = await getTaskByIdService(id);

  if (error) return next(error);

  res.status(200).json(task);
};

module.exports = {
  getAllTasksController,
  createNewTaskController,
  updateTaskController,
  getTaskByIdController,
};
