const router = require("express").Router();
const movieController = require("./movie.controller");
const { secure } = require("../../utils/secure");

// List all movie

router.get("/", (req, res, next) => {
  try {
    res.json({ msg: "All movies list" });
  } catch (e) {
    next(e);
  }
});

// 1. Create A movie

router.post("/", secure(["admin"]), async (req, res, next) => {
  try {
    const result = await movieController.create(req.body);
    res.json({ msg: "Created new movie", data: result });
  } catch (e) {
    next(e);
  }
});

// 2. Read movie

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await movieController.getById(id);
    res.json({ msg: `read one movie by ${id}`, data: result });
  } catch (e) {
    next(e);
  }
});

// 3. Update

router.put("/:id", secure(["admin"]), async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await movieController.update(id, req.body);
    res.json({ msg: `update one movie by ${id}`, data: result });
  } catch (e) {
    next(e);
  }
});

// 4. Delete

router.delete("/:id", secure(["admin"]), async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await movieController.remove(id);
    res.json({ msg: `delete one movie by ${id}`, data: result });
  } catch (e) {
    next(e);
  }
});

// 6. Update the seats for one movie

router.patch("/:id/seats", secure(["admin"]), async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await movieController.updateSeats(id, req.body);
    res.json({
      msg: `update the seat number of one movie by ${id}`,
      data: result,
    });
  } catch (e) {
    next(e);
  }
});

// 7. Change the release date of 1 movie

router.patch("/:id/release-date", secure(["admin"]), async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await movieController.updateReleaseDate(id, req.body);
    res.json({
      msg: `update the seat number of one movie by ${id}`,
      data: result,
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
