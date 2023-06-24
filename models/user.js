const { getDb } = require('../db')
const { ObjectId } = require('mongodb');

class User {
  constructor() {
    this.db = getDb();
  }

  // Creates a user an adds to the database
  async createUser(userData) {
    try {
      const result = await this.db.collection('users')
        .insertOne(userData);
      return result;
    } catch (err) {
      throw new Error('could not create document');
    }
  }

  // Updates the user data for a specific user in the database
  async updateUser(userId, updatedUserData) {
    if (ObjectId.isValid(userId)) {
      try {
        const result = await this.db.collection('users')
          .updateOne({ _id: new ObjectId(userId) }, { $set: updatedUserData });
        return result;
      } catch (err) {
        throw new Error('could not update document');
      }
    } else {
      res.status(500).json({ error: 'not a valid document id' })
    }
  }

  //Deletes a user from the database based on the given user ID
  async deleteUser(userId) {
    if (ObjectId.isValid(userId)) {
      try {
        const result = await this.db.collection('users')
          .deleteOne({ _id: new ObjectId(userId) });
        return result;
      } catch (err) {
        throw new Error('could not delete document');
      }
    } else {
      res.status(500).json({ error: 'not a valid document id' })
    }
  }

  // Retrieves a user from the database based on the given user ID and returns all of their data except for their password
  async getUserByUsername(username) {
    try {
      const result = await this.db.collection('users')
        .findOne({ username }, { projection: { password: 0 } });
      return result;
    } catch (err) {
      throw new Error('could not retrieve document');
    }
  }

  // Retrieves all users from the database and returns all of their data except for their password
  async getUsers() {
    try {
      const users = await this.db.collection('users')
        .find({}, { projection: { password: 0 } }).toArray();
      return users;
    } catch (err) {
      throw new Error('could not retrieve documents');
    }
  }

  testClass() {
    return 'testClass method being called to user model through users routes'
  }

}



module.exports = User;