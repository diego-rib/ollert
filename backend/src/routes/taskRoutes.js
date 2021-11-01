// Routes
const router = require('express').Router();

const {
  getAllTasksController,
} = require('../controllers/taskControllers');

router.get('/', getAllTasksController);

module.exports = router;
