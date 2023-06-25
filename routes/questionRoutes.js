const express = require('express');
const { connectToDb } = require('../db')
const jsonschema = require("jsonschema");
const questionRoutes = express.Router();
const Question = require('../models/Question');
const { ExpressError,
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
  ForbiddenError } = require('../ExpressError')

const newQuestionSchema = require('../schemas/newQuestionSchema.json')





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
    const validator = jsonschema.validate(req.body, newQuestionSchema)
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const result = await question.createQuestion(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// updates the data about a question
questionRoutes.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const validator = jsonschema.validate(updates, newQuestionSchema)
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
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