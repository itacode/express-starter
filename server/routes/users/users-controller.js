
const users = [{ name: 'Peter' }, { name: 'Victor' }, { name: 'Francesco' }];

function indexGet(req, res) {
  res.render('users', { users });
}

module.exports = { indexGet };
