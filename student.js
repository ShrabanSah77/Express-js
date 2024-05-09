/*

User
1. Create
2. Update
3. Read
4. Delete
5. Patch
6. inActive
7. Role change
8. Password change
9. Forget Password
10. List all users

*/

const express = require("express");
require("dotenv").config();

const app = express();
const port = Number(process.env.PORT);

app.use(express.json()); // ensures use of request.body

const users = [
  { name: "Shraban", age: 25, id: 1 },
  { name: "Ram", age: 14, id: 2 },
  { name: "Hari", age: 19, id: 3 },
];

app.get("/getUsers/", (request, response) => {
  // client requests data from server
  console.log({
    query: request.query, // query starts with ? in the url
    params: request.params, //":id" -> params
    body: users, // data comes from middleware
  });
  response.json({ allUsers: users });
});

app.post("/createUsers/:id", (request, response) => {
  // client sends data to servers
  const addUser = [...users, { name: "Max", age: 56, id: 7 }];
  console.log({
    query: request.query, // query starts with ? in the url
    params: request.params, //":id" -> params
    body: addUser, // data comes from middleware
  });
  response.json({
    message: "Request : POST, created new user",
  });
});

app.put("/changeUsers/:id", (request, response) => {
  // client sends data to server
  users[0].age = 34;
  users[0].name = "Killer";
  console.log({
    query: request.query, // query starts with ? in the url
    params: request.params,
    body: users, // data comes from middleware
  });
  response.json({
    message: `Request : PUT, changed user's age to ${users[0].age}, user's name to ${users[0].name}`,
  });
});

app.patch("/patchUsers/:id", (request, response) => {
  // client sends data to server
  users[2].id = 5;
  console.log({
    query: request.query, // query starts with ? in the url
    params: request.params,
    body: users, // data comes from middleware
  });
  response.json({
    message: `Request : PATCH, changed user's id to ${users[2].id}`,
  });
});

app.delete("/deleteUser", (request, response) => {
  const newUsers = users.filter((item) => item.name != "Ram");
  console.log({
    query: request.query, // query starts with ? in the url
    params: request.params,
    body: newUsers, // data comes from middleware
  });
  response.json({
    message: "Request : DELETE, user deleted",
  });
});

app.listen(port, () => {
  console.log(`Appilcation is running at port ${port}`);
});
