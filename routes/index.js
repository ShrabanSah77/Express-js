const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "Get Hello world by Shraban" });
});

router.post("/groups/id:", (req, res) => {
  // Client send the data
  console.log({ query: req.query, params: req.params, body: req.body });
  res.json({ msg: "Post Hello world by Shraban" });
});

router.put("/groups/:id/status", (req, res) => {
  // Client send the data
  res.json({ msg: "Put Hello world by Shraban" });
});

router.patch("/", (req, res) => {
  // Client send the data
  res.json({ msg: "Patch Hello world by Shraban" });
});

router.delete("/", (req, res) => {
  res.json({ msg: "Delete Hello world by Shraban" });
});

module.exports = router;
