const request = require('supertest');
const express = require('express');
const userRoutes = require('../userRoutes');


let app;

beforeEach(() => {
  app = express();
  app.use(express.json());
  app.use('/', userRoutes);
});


test('GET / - success', async () => {
  const res = await request(app).get('/');
  expect(res.statusCode).toEqual(200);
  // Expect the response object to have keys
  expect(Object.keys(res.body)).toEqual(expect.arrayContaining(['users']));
});
