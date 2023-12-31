const { getDb } = require('../db')
const { ObjectId } = require('mongodb');

class Category {
  constructor(db = null) {
    this.db = db || getDb();
  }

  // Creates a category an adds to the database
  async createCategory(categoryData) {
    try {
      const { name } = categoryData;

      // Check if the category already exists
      const existingCategory = await this.db.collection('categories').findOne({ name });

      if (existingCategory) {
        throw new Error('Category already exists');
      }

      const result = await this.db.collection('categories')
        .insertOne(categoryData);
      return result;
    } catch (err) {
      throw new Error('category already exists');
    }
  }

  // Updates the category data for a specific category in the database
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

  // Deletes a category from the database based on the given category ID
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

  static testClass() {
    return 'testClass method being called to category model through categories routes'
  }

}



module.exports = Category;