const { getDb } = require('../db')
const { ObjectId } = require('mongodb');

class QuestionTag {
  constructor() {
    this.db = getDb();
  }

  // Associates a question with a tag
  async addTagToQuestion(questionId, tagId) {
    if (ObjectId.isValid(questionId) && ObjectId.isValid(tagId)) {
      try {
        const result = await this.db.collection('question_tags')
          .insertOne({ question_id: new ObjectId(questionId), tag_id: new ObjectId(tagId) });
        return result;
      } catch (err) {
        throw new Error('could not add tag to question');
      }
    } else {
      throw new Error('not a valid document id');
    }
  }

  // Removes the association between a question and a tag
  async removeTagFromQuestion(questionId, tagId) {
    if (ObjectId.isValid(questionId) && ObjectId.isValid(tagId)) {
      try {
        const result = await this.db.collection('question_tags')
          .deleteOne({ question_id: new ObjectId(questionId), tag_id: new ObjectId(tagId) });
        return result;
      } catch (err) {
        throw new Error('could not remove tag from question');
      }
    } else {
      throw new Error('not a valid document id');
    }
  }

  // Retrieves all tags associated with a question
  async getTagsByQuestionId(questionId) {
    if (ObjectId.isValid(questionId)) {
      try {
        const questionTags = await this.db.collection('question_tags')
          .find({ question_id: new ObjectId(questionId) }).toArray();
        return questionTags;
      } catch (err) {
        throw new Error('could not retrieve tags for question');
      }
    } else {
      throw new Error('not a valid document id');
    }
  }

  // Retrieves all questions associated with a tag
  async getQuestionsByTagId(tagId) {
    if (ObjectId.isValid(tagId)) {
      try {
        const questionTags = await this.db.collection('question_tags')
          .find({ tag_id: new ObjectId(tagId) }).toArray();
        return questionTags;
      } catch (err) {
        throw new Error('could not retrieve questions for tag');
      }
    } else {
      throw new Error('not a valid document id');
    }
  }
}

module.exports = QuestionTag;
