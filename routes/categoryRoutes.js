const express = require('express');
const { connectToDb } = require('../db')
const jsonschema = require("jsonschema");
const categoryRoutes = express.Router();
const Category = require('../models/Category');
const { ExpressError,
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
  ForbiddenError } = require('../ExpressError')

const newCategorySchema = require('../schemas/newCategorySchema.json')




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

// creates a new category
// schema requires category to be at least three characters long
categoryRoutes.post('/create', async (req, res) => {
  try {
    const validator = jsonschema.validate(req.body, newCategorySchema)
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const result = await category.createCategory(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// updates data about a category
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

// deletes a category
categoryRoutes.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await category.deleteCategory(id);
    res.status(202).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// get a category by id
categoryRoutes.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await category.getCategoryById(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// gets all category names
categoryRoutes.get('/', async (req, res) => {
  try {
    const result = await category.getAllCategories();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = categoryRoutes;