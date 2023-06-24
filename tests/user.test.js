const User = require('../models/user')
const { connectToDb } = require('../db')
const user = new User()

// beforeAll(async () => {
//   mongoServer = new MongoMemoryServer();
//   await mongoServer.start();
//   const mongoUri = mongoServer.getUri();
//   conn = await MongoClient.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
//   db = conn.db();
//   user = new User();
// });

// afterAll(async () => {
//   await conn.close();
//   await mongoServer.stop();
// });


describe('Test User Class Methods', () => {

  it('testClass() should return a string', () => {
    const result = user.testClass();
    expect(typeof result).toBe('string');
    expect(result).toBe('testClass method being called');
  });

  const testUser = { username: 'test_user_jest', password: 'test_password', name: 'Test User' };
  let insertedId;

  it('should create a new user', async () => {
    const result = await user.createUser(testUser);
    expect(result.acknowledged).toBe(true);
    insertedId = result.insertedId.toString();
  });

  it('should retrieve the user by username', async () => {
    const result = await user.getUserByUsername('test_user');
    expect(result.username).toBe('test_user');
  });

  it('should update the user', async () => {
    const result = await user.updateUser(insertedId, { username: 'testUpdated', password: 'testUpdated' });
    expect(result.modifiedCount).toBe(1);
  });

  it('should delete the user', async () => {
    const result = await user.deleteUser(insertedId);
    expect(result.deletedCount).toBe(1);
  });
});