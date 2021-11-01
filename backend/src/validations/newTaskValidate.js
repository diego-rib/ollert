const errors = require('../errors/tasksErrors');

module.exports = (info, status) => {
  if (!status || !info) return { error: errors.invalidParams };

  if (
    status.trim() === ''
    || info.trim() === ''
    ) return { error: errors.invalidParams };

  return { error: null };
};
