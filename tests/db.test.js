const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;
const opts = { useNewUrlParser: true, useUnifiedTopology: true };

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
});

afterAll(async () => {
  await mongoServer.stop();
});

describe('Test MongoDB Connection', () => {
  it('should connect to the in-memory test database', async () => {
    const uri = mongoServer.getUri();
    const conn = await MongoClient.connect(uri, opts);

    expect(conn).toBeDefined();
    expect(conn.topology).toBeDefined();
    expect(conn.topology.isConnected()).toBeTruthy();

    await conn.close();
  });
});
