const Tag = require('../models/Tag')
const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');

let tag;
let idOfCreatedTag

describe("Tag Model Methods Tests", () => {
  let connection, db;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);
    tag = new Tag(db);
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    const mockTag = {
      name: 'Testing Tag'
    };
    const createdTag = await tag.createTag(mockTag)
    idOfCreatedTag = createdTag.insertedId
  });

  afterEach(async () => {
    await db.collection('tags').deleteMany({});
  });

  ////////////// tests //////////////

  it("should not allow a duplicate tag", async () => {
    const tags = db.collection('tags');

    const mockTag = {
      name: 'Testing Tag'
    };

    try {
      await tag.createTag(mockTag);
      await tag.createTag(mockTag);
    } catch (err) {
      expect(err.message).toBe('Tag already exists');
    }
  });

  it("should insert a doc into the collection", async () => {
    const tags = db.collection('tags');

    const mockTag = {
      name: 'Testing Tag 2'
    };
    await tag.createTag(mockTag)

    const insertedTag = await tags.findOne({ name: 'Testing Tag 2' });
    expect(insertedTag.name).toEqual('Testing Tag 2');
  });

  it("should update a doc into collection", async () => {
    const tags = db.collection('tags');

    const mockTagUpdated = {
      name: 'Testing Tag Updated'
    };
    await tag.updateTag(idOfCreatedTag, mockTagUpdated)

    const insertedTag = await tags.findOne({ _id: idOfCreatedTag });
    expect(insertedTag.name).toEqual(mockTagUpdated.name);
  });

  it("should delete a doc from the collection", async () => {
    const tags = db.collection('tags');

    const deletedTag = await tag.deleteTag(idOfCreatedTag)
    expect(deletedTag.acknowledged).toEqual(true)
    expect(deletedTag.deletedCount).toEqual(1)
  });

  it("should get a tag by its id", async () => {
    const tags = db.collection('tags');
    const foundTag = await tag.getTagById(idOfCreatedTag)
    expect(foundTag.name).toEqual('Testing Tag');
  });

  it("should get all tags", async () => {
    const tags = db.collection('tags');

    let allTags = await tag.getAllTags()
    expect(allTags.length).toEqual(1)

    const mockTag = {
      name: 'Testing Tag Two'
    };
    const createdTag = await tag.createTag(mockTag)

    allTags = await tag.getAllTags()
    expect(allTags.length).toEqual(2)
  });
})