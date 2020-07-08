function indexGet(req, res) {
  return res.status(200).json({
    message: 'user indexGet',
  });
}

module.exports = { indexGet };
