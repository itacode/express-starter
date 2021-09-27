function indexGet(req, res) {
  res.render('index', { title: 'Express' });
}

module.exports = { indexGet };
