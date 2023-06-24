const express = require('express');
const { connectToDb } = require('../db')
const userRoutes = express.Router();

const User = require('../models/user');

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

userRoutes.post('/', async (req, res) => {
  try {
    const result = await user.createUser(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

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

userRoutes.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await user.deleteUser(id);
    res.status(202).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

userRoutes.get('/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const result = await user.getUserByUsername(username);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

userRoutes.get('/', async (req, res) => {
  try {
    const result = await user.getUsers();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = userRoutes;