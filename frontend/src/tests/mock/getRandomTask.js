import { validTasks, invalidTasks } from './tasksMock';

function getRandomTask(type) {
  const tasksList = type === 'valid' ? validTasks : invalidTasks;

  const { random, floor } = Math;

  const limit = tasksList.length;

  const index = floor(random() * limit);

  return tasksList[index];
}

function getAllTasks(type) {
  return type === 'valid' ? validTasks : invalidTasks;
}

export {
  getRandomTask,
  getAllTasks,
};
