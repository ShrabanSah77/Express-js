const router = require("express").Router();

router.get("/", (req, res, next) => {
  try {
    res.json({ msg: "All movies list" });
  } catch (e) {
    next(e);
  }
});


/*



*/