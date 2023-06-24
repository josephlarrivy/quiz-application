const express = require('express');
const { connectToDb } = require('../db')
const userRoutes = express.Router();

const User = require('../models/User');

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
userRoutes.post('/', async (req, res) => {
  try {
    const result = await user.createUser(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// updates information about a user
userRoutes.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
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