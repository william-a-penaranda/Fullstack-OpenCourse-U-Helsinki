const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');


usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1 });
  response.json(users);
});


usersRouter.post('/', async (request, response) => {
  const { username, password, name } = request.body;

  if (!(username && password)) {
    return response.status(400).json({
      error: 'username and password are required'
    });
  } else if (! ((username.length >= 3) && (password.length >= 3))) {
    return response.status(400).json({
      error: 'username and password must have a minimum length of 3'
    });
  }

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    username,
    passwordHash,
    name,
  });

  const savedUser = await newUser.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;

