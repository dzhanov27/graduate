const router = require('express').Router();

const { newUser, login } = require('../controllers/auth.controller');

router.post('/register', newUser);

router.post('/login', login);

module.exports = router;
