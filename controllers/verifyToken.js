const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json('Access denied');

  try {
    const verified = jwt.verify(token, proccess.env.TOKEN_SECRET);
  } catch (err) {
    res.status(400).json('Invalid token');
  }
};
