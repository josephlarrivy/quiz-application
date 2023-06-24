const { getDb } = require('../db')
const { ObjectId } = require('mongodb');

class Tag {
  constructor() {
    this.db = getDb();
  }

  // Creates a tag and adds to the database
  async createTag(tagData) {
    try {
      const result = await this.db.collection('tags')
        .insertOne(tagData);
      return result;
    } catch (err) {
      throw new Error('could not create document');
    }
  }

  // Updates the tag data for a specific tag in the database
  async updateTag(tagId, updatedTagData) {
    if (ObjectId.isValid(tagId)) {
      try {
        const result = await this.db.collection('tags')
          .updateOne({ _id: new ObjectId(tagId) }, { $set: updatedTagData });
        return result;
      } catch (err) {
        throw new Error('could not update document');
      }
    } else {
      res.status(500).json({ error: 'not a valid document id' })
    }
  }

  //Deletes a tag from the database based on the given tag ID
  async deleteTag(tagId) {
    if (ObjectId.isValid(tagId)) {
      try {
        const result = await this.db.collection('tags')
          .deleteOne({ _id: new ObjectId(tagId) });
        return result;
      } catch (err) {
        throw new Error('could not delete document');
      }
    } else {
      res.status(500).json({ error: 'not a valid document id' })
    }
  }

  // Retrieves a tag from the database and returns it
  async getTagById(tagId) {
    if (ObjectId.isValid(tagId)) {
      try {
        const result = await this.db.collection('tags')
          .findOne({ _id: new ObjectId(tagId) });
        return result;
      } catch (err) {
        throw new Error('could not retrieve document');
      }
    } else {
      res.status(500).json({ error: 'not a valid document id' })
    }
  }

  // Retrieves all tags from the database and returns them
  async getAllTags() {
    try {
      const tags = await this.db.collection('tags')
        .find().toArray();
      return tags;
    } catch (err) {
      throw new Error('could not retrieve documents');
    }
  }

  testClass() {
    return 'testClass method being called to tag model through tags routes'
  }

}



module.exports = Tag;