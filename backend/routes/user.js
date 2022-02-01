const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../secrets');
const { validateRegisterInput } = require('../utils/validators');
const { validateLoginInput } = require('../utils/validators');

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: '1h' },
  );
}

router.post('/register', async (req, res, next) => {
  const { username, email, password } = req.body;
  const { valid, errors } = validateRegisterInput(username, email, password);
  if (!valid) {
    res.status(401).json(errors);
  } else {
    const user = await User.findOne({ username });
    if (user) {
      res.status(401).json({
        username: 'Username already exists',
      });
    }
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      res.status(401).json({
        email: 'Email already exists',
      });
    }
    const password = await bcrypt.hash(password, 12);
    const newUser = new User({
      username,
      email,
      password,
      createdAt: new Date().toISOString(),
    });

    const savedUser = await newUser.save();
    res.status(200).json({
      user: savedUser,
      token: generateToken(savedUser),
    });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const { valid, errors } = validateLoginInput(username, password);
  if (!valid) {
    res.status(401).json(errors);
  } else {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({
        username: 'Username does not exist',
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({
        password: 'Password is incorrect',
      });
    }
    res.status(200).json({
      user: user,
      id: user._id,
      token: generateToken(user),
    });
  }
});

module.exports = router;
