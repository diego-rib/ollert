const errors = require('../errors/tasksErrors');

module.exports = (info = '', status = '') => {
  if (
    status.trim() === ''
    || info.trim() === ''
    ) return { error: errors.invalidParams };

  return { error: null };
};
