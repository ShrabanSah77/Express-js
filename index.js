// 1. npm init -y
// 2. npm i express --save
// 3. create .gitignore file > Add node_modules folder
// 4. create index.js file
// 5. update the script as dev: "node index.js" in the package.jsonn
// 6. jsong


require("dotenv").config();
const express = require("express");
const app = express();

const PORT = Number(process.env.PORT);

app.get("/", (req, res) => {
  res.json({ msg: "Hello world by Shraban" });
});

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
