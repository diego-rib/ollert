module.exports = (error, _req, res, _next) => {
  const { code, message } = error;

  if (code && message) {
    return res.status(code).json({ message });
  }

  res.status(503).json({ message: 'Servidor se encontra com problemas' });
};
