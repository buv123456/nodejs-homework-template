const handleError = (err, req, res, next) => {
  const {
    statusCode = 500,
    message = "Something went wrong, please try again later",
  } = err;
  res.status(statusCode).json(message);
};

module.exports = handleError;
