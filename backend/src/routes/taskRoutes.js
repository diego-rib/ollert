// Routes
const router = require('express').Router();
const errorHandler = require('../errors/errorHandler');

const {
  getAllTasksController,
  createNewTaskController,
  updateTaskController,
  getTaskByIdController,
  removeTaskController,
} = require('../controllers/taskControllers');

router.get('/', getAllTasksController);
router.get('/:id', getTaskByIdController);
router.post('/', createNewTaskController);
router.put('/:id', updateTaskController);
router.delete('/:id', removeTaskController);

router.use(errorHandler);

module.exports = router;
