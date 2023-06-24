const express = require('express');
const { connectToDb } = require('../db')
const questionRoutes = express.Router();

const Question = require('../models/Question');

let question;

connectToDb((err) => {
  if (!err) {
    question = new Question();
  }
});

questionRoutes.get('/testconnection', (req, res) => {
  response = question.testClass();
  res.json({ response });
});

/////////////////// routes //////////////////

// creates a new question
questionRoutes.post('/', async (req, res) => {
  try {
    const result = await question.createQuestion(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// updates the data about a question
questionRoutes.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const result = await question.updateQuestion(id, updates);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// deletes a question
questionRoutes.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await question.deleteQuestion(id);
    res.status(202).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// gets a question based in its id
questionRoutes.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await question.getQuestionById(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// gets all questions
questionRoutes.get('/', async (req, res) => {
  try {
    const result = await question.getAllQuestions();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = questionRoutes;