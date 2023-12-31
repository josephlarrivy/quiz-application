const { getDb } = require('../db')
const { ObjectId } = require('mongodb');

class Question {
  constructor() {
    this.db = getDb();
  }

  // Creates a question an adds to the database
  async createQuestion(questionData) {
    try {
      const result = await this.db.collection('questions')
        .insertOne(questionData);
      return result;
    } catch (err) {
      throw new Error('could not create document');
    }
  }

  // Updates the user data for a specific question in the database
  async updateQuestion(questionId, updatedQuestionData) {
    if (ObjectId.isValid(questionId)) {
      try {
        const result = await this.db.collection('questions')
          .updateOne({ _id: new ObjectId(questionId) }, { $set: updatedQuestionData });
        return result;
      } catch (err) {
        throw new Error('could not update document');
      }
    } else {
      res.status(500).json({ error: 'not a valid document id' })
    }
  }

  //Deletes a question from the database based on the given question ID
  async deleteQuestion(questionId) {
    if (ObjectId.isValid(questionId)) {
      try {
        const result = await this.db.collection('questions')
          .deleteOne({ _id: new ObjectId(questionId) });
        return result;
      } catch (err) {
        throw new Error('could not delete document');
      }
    } else {
      res.status(500).json({ error: 'not a valid document id' })
    }
  }

  // Retrieves a question from the database and returns it
  async getQuestionById(questionId) {
    if (ObjectId.isValid(questionId)) {
      try {
        const result = await this.db.collection('questions')
          .findOne({ _id: new ObjectId(questionId) });
        return result;
      } catch (err) {
        throw new Error('could not retrieve document');
      }
    } else {
      res.status(500).json({ error: 'not a valid document id' })
    }
  }

  // Retrieves all questions from the database and returns them
  async getAllQuestions() {
    try {
      const questions = await this.db.collection('questions')
        .find().toArray();
      return questions;
    } catch (err) {
      throw new Error('could not retrieve documents');
    }
  }

  // gets all questions written by a specific user
  async getQuestionsByUser(user_id) {
    try {
      const questions = await this.db.collection('questions')
        .find({ creator_id: user_id })
        .toArray();
      return questions;
    } catch (err) {
      throw new Error('could not retrieve questions');
    }
  }

  // gets all questions in a category
  async getQuestionsByCategory(cat_id) {
    try {
      const questions = await this.db.collection('questions')
        .find({ category_id: cat_id })
        .toArray();
      return questions;
    } catch (err) {
      throw new Error('could not retrieve questions');
    }
  }

  static testClass() {
    return 'testClass method being called to Question model through questions routes'
  }

}



module.exports = Question;