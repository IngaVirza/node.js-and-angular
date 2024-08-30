module.exports = (res, error) => {
  res.status(500).json({
    sucsess: false,
    message: error.message ? error.message : error,
  });
};
