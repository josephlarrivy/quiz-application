const express = require('express');
const { connectToDb } = require('../db')
const categoryRoutes = express.Router();

const Category = require('../models/Category');

let category;

connectToDb((err) => {
  if (!err) {
    category = new Category();
  }
});

categoryRoutes.get('/testconnection', (req, res) => {
  response = category.testClass();
  res.json({ response });
});

/////////////////// routes //////////////////

categoryRoutes.post('/create', async (req, res) => {
  try {
    const result = await category.createCategory(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

categoryRoutes.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const result = await category.updateCategory(id, updates);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

categoryRoutes.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await category.deleteCategory(id);
    res.status(202).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

categoryRoutes.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await category.getCategoryById(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

categoryRoutes.get('/', async (req, res) => {
  try {
    const result = await category.getAllCategories();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = categoryRoutes;