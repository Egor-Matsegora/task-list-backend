module.exports = (res, error, message) => {
  res.status(500).json({
    succes: false,
    message: message ? message : error.message || error
  });
};
