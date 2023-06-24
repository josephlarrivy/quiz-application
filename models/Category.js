const { getDb } = require('../db')
const { ObjectId } = require('mongodb');

class Category {
  constructor() {
    this.db = getDb();
  }

  // Creates a category an adds to the database
  async createCategory(data) {
    try {
      const result = await this.db.collection('categories')
        .insertOne(data);
      return result;
    } catch (err) {
      throw new Error('could not create document');
    }
  }

  // Updates the user data for a specific user in the database
  async updateCategory(categoryId, updatedCategoryData) {
    if (ObjectId.isValid(categoryId)) {
      try {
        const result = await this.db.collection('categories')
          .updateOne({ _id: new ObjectId(categoryId) }, { $set: updatedCategoryData });
        return result;
      } catch (err) {
        throw new Error('could not update document');
      }
    } else {
      res.status(500).json({ error: 'not a valid document id' })
    }
  }

  //Deletes a category from the database based on the given user ID
  async deleteCategory(categoryId) {
    if (ObjectId.isValid(categoryId)) {
      try {
        const result = await this.db.collection('categories')
          .deleteOne({ _id: new ObjectId(categoryId) });
        return result;
      } catch (err) {
        throw new Error('could not delete document');
      }
    } else {
      throw new Error('not a valid document id');
    }
  }

  // Retrieves a category from the database based on the id
  async getCategoryById(categoryId) {
    if (ObjectId.isValid(categoryId)) {
      try {
        const result = await this.db.collection('categories')
          .findOne({ _id: new ObjectId(categoryId) });
        return result;
      } catch (err) {
        throw new Error('could not retrieve document');
      }
    } else {
      throw new Error('not a valid document id');
    }
  }

  // Retrieves all categories from the database and returns them
  async getAllCategories() {
    try {
      const categories = await this.db.collection('categories')
        .find().toArray();
      return categories;
    } catch (err) {
      throw new Error('could not retrieve documents');
    }
  }

  testClass() {
    return 'testClass method being called to category model through categories routes'
  }

}



module.exports = Category;