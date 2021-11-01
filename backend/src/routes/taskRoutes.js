// Routes
const router = require('express').Router();
const errorHandler = require('../errors/errorHandler');

const {
  getAllTasksController,
  createNewTaskController,
  updateTaskController,
  getTaskByIdController,
} = require('../controllers/taskControllers');

router.get('/', getAllTasksController);
router.get('/:id', getTaskByIdController);
router.post('/', createNewTaskController);
router.put('/:id', updateTaskController);

router.use(errorHandler);

module.exports = router;
