// Routes
const router = require('express').Router();
const errorHandler = require('../errors/errorHandler');

const {
  getAllTasksController,
  createNewTaskController,
} = require('../controllers/taskControllers');

router.get('/', getAllTasksController);
router.post('/', createNewTaskController);

router.use(errorHandler);

module.exports = router;
