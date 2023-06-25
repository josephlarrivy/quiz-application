## Trivia Application Backend API Documentation
# This documentation provides an overview of the backend API routes, models, and schemas for the Trivia Application.

Table of Contents
User Routes
User Model
User Schemas
User Routes
The following routes are available for managing user data.

GET /testconnection
Tests the connection to the backend and the User model.

Response:

Status: 200 OK

Body:

json
Copy code
{
  "response": "testClass method being called to user model through users routes"
}
POST /users
Creates a new user.

Request Body:

json
Copy code
{
  "username": "exampleUser",
  "name": "John Doe",
  "password": "examplePassword"
}
Response:

Status: 201 Created
Body: The inserted user object
PATCH /users/:id
Updates information about a user.

Request Parameters:

id (string): The ID of the user to update
Request Body:

json
Copy code
{
  "name": "New Name"
}
Response:

Status: 200 OK
Body: The updated user object
DELETE /users/:id
Deletes a user.

Request Parameters:

id (string): The ID of the user to delete
Response:

Status: 202 Accepted
Body: The deletion result
GET /users/username/:username
Retrieves user information based on the username.

Request Parameters:

username (string): The username of the user to retrieve
Response:

Status: 200 OK
Body: The user object (excluding the password)
GET /users/id/:id
Retrieves user information based on the ID.

Request Parameters:

id (string): The ID of the user to retrieve
Response:

Status: 200 OK
Body: The user object (excluding the password)
GET /users
Retrieves information about all users.

Response:

Status: 200 OK
Body: An array of user objects (excluding the password)
User Model
The User class represents the user model used for managing user data.

Class Methods
createUser(userData)
Creates a user and adds it to the database.

Parameters:
userData (object): An object containing the user data
Returns: A promise that resolves to the result of the insertion
updateUser(userId, updatedUserData)
Updates the user data for a specific user in the database.

Parameters:
userId (string): The ID of the user to update
updatedUserData (object): An object containing the updated user data
Returns: A promise that resolves to the result of the update
deleteUser(userId)
Deletes a user from the database based on the given user ID.

Parameters:
userId (string): The ID of the user to delete
Returns: A promise that resolves to the result of the deletion
getUserByUsername(username)
Retrieves a user from the database based on the given username and returns all of their data except for their password.

Parameters:
username (string): The username of the user to retrieve
Returns: A promise that resolves to the user object (excluding the password)
getUserById(userId)
Retrieves a user from the database based on the given ID and returns all of their data except for their password.

Parameters:
userId (string): The ID of the user to retrieve
Returns: A promise that resolves to the user object (excluding the password)
getUsers()
Retrieves all users from the database and returns all of their data except for their password.

Returns: A promise that resolves to an array of user objects (excluding the password)
Example Usage
javascript
Copy code
const user = new User();

// Example usage of class methods
user.createUser(userData)
  .then(result => console.log(result))
  .catch(error => console.error(error));

user.updateUser(userId, updatedUserData)
  .then(result => console.log(result))
  .catch(error => console.error(error));

user.deleteUser(userId)
  .then(result => console.log(result))
  .catch(error => console.error(error));

user.getUserByUsername(username)
  .then(result => console.log(result))
  .catch(error => console.error(error));

user.getUserById(userId)
  .then(result => console.log(result))
  .catch(error => console.error(error));

user.getUsers()
  .then(users => console.log(users))
  .catch(error => console.error(error));
User Schemas
The following JSON schemas define the structure and validation rules for user data.

newUserSchema.json
json
Copy code
{
  "type": "object",
  "properties": {
    "username": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "password": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "username",
    "name",
    "password"
  ],
  "additionalProperties": false
}
updateUserSchema.json
json
Copy code
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "name"
  ],
  "additionalProperties": false
}
Feel free to refer to this documentation when building the frontend for the Trivia Application.