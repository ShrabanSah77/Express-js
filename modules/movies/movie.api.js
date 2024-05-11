/*
1. CREATE
2. Read only one movie
3. Update 
4. Delete
5. List
6. Update the seats for one movie
7. Change the release date of 1 movie

*/

const router = require("express").Router();

// 1. Create A movie

router.post("/", (req, res, next) => {
  try {
    res.json({ msg: "Created new movie" });
  } catch (e) {
    next(e);
  }
});

// 2. Read movie

router.get("/", (req, res, next) => {
  try {
    const { id } = req.params;
    res.json({ msg: `read one movie by ${id}` });
  } catch (e) {
    next(e);
  }
});

// 3. Update

router.put("/", (req, res, next) => {
  try {
    const { id } = req.params;
    res.json({ msg: `update one movie by ${id}` });
  } catch (e) {
    next(e);
  }
});

// 4. Update

router.delete("/", (req, res, next) => {
  try {
    const { id } = req.params;
    res.json({ msg: `delete one movie by ${id}` });
  } catch (e) {
    next(e);
  }
});

// 5. List

router.get("/", (req, res, next) => {
  try {
    res.json({ msg: "list all new movie" });
  } catch (e) {
    next(e);
  }
});

// 6. Update the seats for one movie

router.patch("/:id/seats", (req, res, next) => {
  try {
    const { id } = req.params;
    res.json({ msg: `update the seat number of one movie by ${id}` });
  } catch (e) {
    next(e);
  }
});

// 7. Change the release date of 1 movie

router.patch("/:id/release-date", (req, res, next) => {
  try {
    const { id } = req.params;
    res.json({ msg: `update the release date one movie by ${id}` });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
