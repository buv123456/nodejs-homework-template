const controllerWrapper = (ctrl) => async (req, res, next) => {
  try {
    await ctrl(req, res, next);
  } catch (err) {
    next(err);
  }
};

module.exports = controllerWrapper;
