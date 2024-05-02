// 1. npm init -y
// 2. npm i express --save
// 3. create .gitignore file > Add node_modules folder
// 4. 


require("dotenv").config();

const express = require("express");
const app = express();

const PORT = 8000;

const PORT =Number(process)

app.get("/", (req, res) => {
  res.json({ msg: "Hello world by Shraban" });
});

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
