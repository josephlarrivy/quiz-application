const express = require('express');
const { connectToDb } = require('../db')
const jsonschema = require("jsonschema");
const tagRoutes = express.Router();
const Tag = require('../models/Tag');
const { ExpressError,
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
  ForbiddenError } = require('../ExpressError')

const newTagSchema = require('../schemas/newTagSchema.json')
const updateTagSchema = require('../schemas/updateTagSchema.json')




let tag;

connectToDb((err) => {
  if (!err) {
    tag = new Tag();
  }
});

tagRoutes.get('/testconnection', (req, res) => {
  response = tag.testClass();
  res.json({ response });
});

/////////////////// routes //////////////////

// creates a new tag
// schema requires tag to be at least 3 characters
tagRoutes.post('/', async (req, res) => {
  try {
    const validator = jsonschema.validate(req.body, newTagSchema)
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const result = await tag.createTag(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// updates the data about a tag
// schema requires tag to be at least 3 characters
tagRoutes.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const validator = jsonschema.validate(updates, updateTagSchema)
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const result = await tag.updateTag(id, updates);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// deletes a tag
tagRoutes.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await tag.deleteTag(id);
    res.status(202).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// gets information about a tag based on its id
tagRoutes.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await tag.getTagById(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// gets all tags
tagRoutes.get('/', async (req, res) => {
  try {
    const result = await tag.getAllTags();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = tagRoutes;