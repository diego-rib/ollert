module.exports = (error, _req, res, _next) => {
  const { code, message } = error;

  if (code && message) {
    return res.status(code).json({ message });
  }

  res
    .status(500)
    .json({
      message: 'Aconteceu um erro inesperado, tente novamente mais tarde',
    });
};
