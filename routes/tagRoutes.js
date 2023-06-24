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

tagRoutes.post('/', async (req, res) => {
  try {
    const result = await tag.createTag(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

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

tagRoutes.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await tag.deleteTag(id);
    res.status(202).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

tagRoutes.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await tag.getTagById(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

tagRoutes.get('/', async (req, res) => {
  try {
    const result = await tag.getAllTags();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = tagRoutes;