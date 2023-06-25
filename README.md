# Question Vault API
##### A backend for all of your trivia and quiz needs
#

Written and maintained by:   [www.josephlarrivy.com](https://joseph-larrivy-portfolio.herokuapp.com/)


### Features
- Creating multiple-choice questions
- Building quizes based on categories
- Retrieving questions based on specific tags or categories


### Tech

Question Vault uses a number of technologies:

- [Node.js] - evented I/O for the backend
- [Express.js] - fast node.js network app framework
- [MongoDB] - database


## Endpoints
This backend has endpoints for users, tags, categories, and questions
##### USERS endpoints
---
GET - get all information except passwords for all users
```
/users/
```
GET - get all information except password for a specific user by id
```
/users/id/:id
```
GET - get all information except password for a specific user by username
```
/users/username/:username
```
POST - create a new user - accepts a json body in the request
```
/users/
```
```
{
    "username" : "example_user",
    "password" : "example_passowrd",
    "name" : "Example User"
}
```
PATCH - update the name of a user - accepts a json body
```
/users/:id
```
```
{
    "name" : "Example User Updated"
}
```
DELETE - remove a user from the database
```
/users/:id
```

##### CATEGORIES endpoints
---
GET - get all categories
```
/categories/
```
GET - get information on a caregoty by its id
```
/categories/:id
```
POST - create a new category - accepts a json body in the request
```
/categories/
```
```
{
    "name" : "New Category Name"
}
```
PATCH - updates the name of a category by its id - accepts a json body in the request
```
/categories/:id
```
```
{
    "name" : "Category Name Updated"
}
```
DELETE - remove a category from the database
```
/categories/:id
```


##### TAGS endpoints
---
GET - get all tags
```
/tags/
```
GET - get information on a tag by its id
```
/tags/:id
```
POST - create a new tag - accepts a json body in the request
```
/tags/
```
```
{
    "name" : "New Tag"
}
```
PATCH - updates the name of a tag by its id - accepts a json body in the request
```
/tags/:id
```
```
{
    "name" : "Tag Name Updated"
}
```
DELETE - remove a tag from the database
```
/tags/:id
```

##### QUESTIONS endpoints
---
GET - get all questions
```
/questions/
```
GET - get a question by its id
```
/questions/:id
```
POST - create a new question - accepts a json body in the request
```
/questions/
```
The json body for a new question must include the question's text, four options in an array, which of the options is the correct answer, the points that the question is worth (as an integer), and the name of the creator of the question.
```
{
  "text": "Which animal is known as the 'king of the jungle'?",
  "options": [
    "Lion",
    "Tiger",
    "Elephant",
    "Giraffe"
  ],
  "solution": "Lion",
  "points": 5,
  "creator": "AnimalExpert234"
}
```
PATCH - updates a question by its id - accepts a json body in the request
```
/questions/:id
```
This endpoint is set up so that all fields are required in the request body when any part of the question is going to be changed.
```
{
  "text": "In which year did the United States declare independence?",
  "options": [
    "1776",
    "1789",
    "1804",
    "1865"
  ],
  "solution": "1776",
  "points": 7,
  "creator": "HistoryBuff789"
}

```
DELETE - remove a question from the database
```
/questions/:id
```

##### QUESTIONTAGS endpoints
---
POST - connects a tag to a question - accepts a json body in the request
```
/questiontags/
```
Include the id of the question and the id of the tag as "questionId" and "tagId" respectively. The database table that the endpoint repesents is a many-to-many relationship where a question can be associated with multiple tags and any given tag can be associated with multiple questions.
```
{
    "questionId" : "649758baae2a8873d89c465e",
    "tagId" : "649751e5796c9e634492529f"
}
```
GET - gets all tags (returning their ids) that are associated with a given question using the question's id
```
/tags/:questionId
```
GET - gets all questions (returning their ids) that are associated with a given tag using the tag's id
```
/questions/:tagId
```
DELETE - remove the association between a tag and a question. Tags and questions will not be affected, only the remationship between them is removed
```
/:questionId/:tagId
```