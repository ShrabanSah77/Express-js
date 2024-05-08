const express = require("express");
const router = express.Router();

const movieRouter = require("../modules/movies/movie.api");

router.get("/id:", (req, res) => {
  res.json({ msg: "Get Hello world by Shraban" });
});

router.post("/id:", (req, res) => {
  // Client send the data
  console.log({ query: req.query, params: req.params, body: req.body });
  res.json({ msg: "Post Hello world by Shraban" });
});

router.put("/id:", (req, res) => {
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

router.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});

router.use("/api/v1/movies", movieRouter);
router.use("/api/v1/movies", movieRouter);
modules.exports = router;
