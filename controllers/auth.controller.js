const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/user.model');
const { registerValidation, loginValidation } = require('./validation');

module.exports = {
  newUser: async (req, res) => {
    //data validation
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const { username, password, name } = req.body;

    try {
      //find if username exists in db
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res
          .status(400)
          .json({ message: 'User with this username exists' });
      }

      //hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      //create new user
      const newUser = new User({ username, password: hashedPassword, name });
      await newUser.save();
      res.status(201).json('New user created!');
    } catch (err) {
      res.status(400).json('Something get wrong, try again');
    }
  },

  login: async (req, res) => {
    //data validation
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const { username, password } = req.body;

    try {
      //find same username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json('Wrong username or password');
      }

      //check password
      const validPass = bcrypt.compare(password, user.password);
      if (!validPass) return res.status(400).json('Invalid password');

      //create and assign a token
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
      res.header('auth-token', token).json(token);
    } catch (err) {
      res.status(400).json('Something get wrong, try again');
    }
  },
};
