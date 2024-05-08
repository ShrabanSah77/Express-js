const express = require("express");
const router = express.Router();

const movieRouter = require("../modules/movies/movie.api");

router.get("/api/v1", (req, res, next) => {
  try {
    res.json({ msg: "MovieMate API is working..." });
  } catch (e) {
    next(e);
  }
});

router.use("/api/v1/movies", movieRouter);
router.use("/api/v1/movies", movieRouter);
modules.exports = router;
