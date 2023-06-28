const Category = require('../models/Category')
const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');

let category;
let idOfCreatedCategory

describe("Category Model Methods Tests", () => {
  let connection, db;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);
    category = new Category(db);
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    const mockCategory = {
      name: 'Testing Category'
    };
    const createdCategory = await category.createCategory(mockCategory)
    idOfCreatedCategory = createdCategory.insertedId
  });

  afterEach(async () => {
    await db.collection('categories').deleteMany({});
  });

  ////////////// tests //////////////

  it("should not allow a duplicate ategory", async () => {
    const categories = db.collection('categories');

    const mockCategory = {
      name: 'Testing Category'
    };

    try {
      await category.createCategory(mockCategory);
      await category.createCategory(mockCategory);
    } catch (err) {
      expect(err.message).toBe('category already exists');
    }
  });

  it("should insert a doc into the collection", async () => {
    const categories = db.collection('categories');

    const mockCategory = {
      name: 'Testing Category 2'
    };
    await category.createCategory(mockCategory)

    const insertedCategory = await categories.findOne({ name: 'Testing Category 2' });
    expect(insertedCategory.name).toEqual('Testing Category 2');
  });

  it("should update a doc into collection", async () => {
    const categories = db.collection('categories');

    const mockCategoryUpdated = {
      name: 'Testing Category Updated'
    };
    await category.updateCategory(idOfCreatedCategory, mockCategoryUpdated)

    const insertedCategory = await categories.findOne({ _id: idOfCreatedCategory });
    expect(insertedCategory.name).toEqual(mockCategoryUpdated.name);
  });

  it("should delete a doc from the collection", async () => {
    const categories = db.collection('categories');

    const deletedCategory = await category.deleteCategory(idOfCreatedCategory)
    expect(deletedCategory.acknowledged).toEqual(true)
    expect(deletedCategory.deletedCount).toEqual(1)
  });

  it("should get a category by its id", async () => {
    const categories = db.collection('categories');
    const foundCategory = await category.getCategoryById(idOfCreatedCategory)
    expect(foundCategory.name).toEqual('Testing Category');
  });

  it("should get all categories", async () => {
    const categories = db.collection('categories');

    let allCategories = await category.getAllCategories()
    expect(allCategories.length).toEqual(1)

    const mockCategoryTwo = {
      name: 'Testing Category Two'
    };
    const createdCategory = await category.createCategory(mockCategoryTwo)

    allCategories = await category.getAllCategories()
    expect(allCategories.length).toEqual(2)
  });
})