const express = require('express');
const router = express.Router();

const users = [
  {name: 'Peter'},
  {name: 'Victor'},
  {name: 'Francesco'},
];

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('users', { users });
});

module.exports = router;
