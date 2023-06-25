const express = require('express');
const { connectToDb } = require('../db')
const jsonschema = require("jsonschema");
const userRoutes = express.Router();
const User = require('../models/User');
const { ExpressError,
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
  ForbiddenError } = require('../ExpressError')

const newUserSchema = require('../schemas/newUserSchema.json')
const updateUserSchema = require('../schemas/updateUserSchema.json')





let user;

connectToDb((err) => {
  if (!err) {
    user = new User();
  }
});

userRoutes.get('/testconnection', (req, res) => {
  response = user.testClass();
  res.json({ response });
});

/////////////////// routes //////////////////

// create a new user
// schema requires username, name, password
userRoutes.post('/', async (req, res) => {
  try {
    const validator = jsonschema.validate(req.body, newUserSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const result = await user.createUser(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// updates information about a user
// schema allows only for name to be changed
userRoutes.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const validator = jsonschema.validate(updates, updateUserSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const result = await user.updateUser(id, updates);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// deletes a user
userRoutes.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await user.deleteUser(id);
    res.status(202).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// gets user information based on username
userRoutes.get('/username/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const result = await user.getUserByUsername(username);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// gets user information based on id
userRoutes.get('/id/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await user.getUserById(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// gets information about all users
userRoutes.get('/', async (req, res) => {
  try {
    const result = await user.getUsers();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = userRoutes;