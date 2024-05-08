require("dotenv").config();

const express = require("express");
const app = express();
const PORT = Number(process.env.PORT);

app.use(express.json());

app.get("/id:", (req, res) => {
  res.json({ msg: "Get Hello world by Shraban" });
});

app.post("/id:", (req, res) => {
  // Client send the data
  console.log({ query: req.query, params: req.params, body: req.body });
  res.json({ msg: "Post Hello world by Shraban" });
});

app.put("/id:", (req, res) => {
  // Client send the data
  res.json({ msg: "Put Hello world by Shraban" });
});

app.patch("/", (req, res) => {
  // Client send the data
  res.json({ msg: "Patch Hello world by Shraban" });
});

app.delete("/", (req, res) => {
  res.json({ msg: "Delete Hello world by Shraban" });
});

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
