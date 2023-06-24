const express = require('express');
const { connectToDb } = require('../db')
const tagRoutes = express.Router();

const Tag = require('../models/Tag');

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
tagRoutes.post('/', async (req, res) => {
  try {
    const result = await tag.createTag(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// updates the data about a tag
tagRoutes.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const result = await tag.updateTag(id, updates);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// deletes a tat
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