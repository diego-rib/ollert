// Routes
const router = require('express').Router();
const errorHandler = require('../errors/errorHandler');

const {
  getAllTasksController,
  createNewTaskController,
  updateTaskController,
} = require('../controllers/taskControllers');

router.get('/', getAllTasksController);
router.post('/', createNewTaskController);
router.patch('/', updateTaskController);

router.use(errorHandler);

module.exports = router;
