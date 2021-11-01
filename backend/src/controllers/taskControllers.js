// Controllers
const {
  getAllTasksService,
} = require('../services/taskServices');

const getAllTasksController = async (_req, res, next) => {
  const { tasks, error } = await getAllTasksService();

  if (error) return next(error);

  res.status(200).json({ tasks });
};

module.exports = {
  getAllTasksController,
};
