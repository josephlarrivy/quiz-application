const express = require('express');
const { connectToDb } = require('../db')
const questionTagRoutes = express.Router();

const QuestionTag = require('../models/QuestionTag');

let questionTag;

connectToDb((err) => {
  if (!err) {
    questionTag = new QuestionTag();
  }
});

/////////////////// routes //////////////////

// adds a tag to a question
questionTagRoutes.post('/', async (req, res) => {
  const { questionId, tagId } = req.body;
  try {
    const result = await questionTag.addTagToQuestion(questionId, tagId);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// removes a tag from a question
questionTagRoutes.delete('/:questionId/:tagId', async (req, res) => {
  const { questionId, tagId } = req.params;
  try {
    const result = await questionTag.removeTagFromQuestion(questionId, tagId);
    res.status(202).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// gets all tags' tag_id associated with a question
questionTagRoutes.get('/tags/:questionId', async (req, res) => {
  const { questionId } = req.params;
  try {
    const result = await questionTag.getTagsByQuestionId(questionId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// gets all questions question_id associated with a tag
questionTagRoutes.get('/questions/:tagId', async (req, res) => {
  const { tagId } = req.params;
  try {
    const result = await questionTag.getQuestionsByTagId(tagId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = questionTagRoutes;
