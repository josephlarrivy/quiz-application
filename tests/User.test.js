const User = require('../models/User')
const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');

let user;
let idOfCreatedUser

describe("User Model Methods Tests", () => {
  let connection, db;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);
    user = new User(db);
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    const mockUser = {
      username: 'testing_user',
      name: 'Testing User',
      password: 'xxx'
    };
    const createdUser = await user.createUser(mockUser);
    idOfCreatedUser = createdUser.insertedId
  });

  afterEach(async () => {
    await db.collection('users').deleteMany({});
  });

  ////////////// tests //////////////

  it("should not allow a duplicate username", async () => {
    const users = db.collection('users');

    const mockUser = {
      username: 'testing_user',
      name: 'Testing User',
      password: 'xxx'
    };

    try {
      await user.createUser(mockUser);
      await user.createUser(mockUser);
    } catch (err) {
      expect(err.message).toBe('Username already exists');
    }
  });

  it("should insert a doc into collection", async () => {
    const users = db.collection('users');

    const mockUser = {
      username: 'testing_user_2',
      name: 'Testing User Two',
      password: 'xxx'
    };
    await user.createUser(mockUser);

    const insertedUser = await users.findOne({ name: 'Testing User Two' });
    expect(insertedUser.name).toEqual('Testing User Two');
  });

  it("should update a doc into collection", async () => {
    const users = db.collection('users');

    const updatedUser = {
      username: 'testing_user_updated',
      name: 'Testing User',
      password: 'xxx'
    };
    await user.updateUser(idOfCreatedUser, updatedUser)

    const insertedUser = await users.findOne({ _id: idOfCreatedUser });
    expect(insertedUser.name).toEqual(updatedUser.name);
  });

  it("should delete a doc from the collection", async () => {
    const users = db.collection('users');

    const deletedUser = await user.deleteUser(idOfCreatedUser)
    expect(deletedUser.acknowledged).toEqual(true)
    expect(deletedUser.deletedCount).toEqual(1)
  });

  it("should get a user by their username", async () => {
    const users = db.collection('users');
    const insertedUser = await user.getUserByUsername('testing_user')
    expect(insertedUser.name).toEqual('Testing User');
  });

  it("should get a user by their id", async () => {
    const users = db.collection('users');
    const foundUser = await user.getUserById(idOfCreatedUser)
    expect(foundUser.name).toEqual('Testing User');
  });

  it("should get all users", async () => {
    const users = db.collection('users');

    let allUsers = await user.getUsers()
    expect(allUsers.length).toEqual(1)

    const mockUserTwo = {
      username: 'testing_user_two',
      name: 'Testing User Two',
      password: 'xxx'
    };
    const createdUser = await user.createUser(mockUserTwo);
    
    allUsers = await user.getUsers()
    expect(allUsers.length).toEqual(2)
  });

});