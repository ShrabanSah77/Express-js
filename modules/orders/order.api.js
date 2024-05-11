/*
create
list
read one order
delete the order
change the status of order
update the order

*/

const router = require("express").Router();

const mw = (req, res, next) => {
  const { username, password } = req.headers;
  if (username === "shraban" && password === " password") {
    next();
  }
  res.status(404).json({ msg: "User Unauthorized" });
};

//1) Create A Order

router.post("/", mw, (req, res, next) => {
  try {
    res.json({ msg: "Created new order" });
  } catch (e) {
    next(e);
  }
});

//2) List The Orders

router.get("/", (req, res, next) => {
  try {
    res.json({ msg: "List all orders", data: req.body });
  } catch (e) {
    next(e);
  }
});

//3) Read One Order

router.get("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    res.json({ msg: `get one order by ${id}` });
  } catch (e) {
    next(e);
  }
});

//4) Change The Order Data

router.patch("/:id/status", (req, res, next) => {
  try {
    const { id } = req.params;
    res.json({ msg: `change status of one order by ${id}` });
  } catch (e) {
    next(e);
  }
});

// update the order

router.put("/:id/status", (req, res, next) => {
  try {
    const { id } = req.params;
    res.json({ msg: `update one order by ${id}` });
  } catch (e) {
    next(e);
  }
});

//5) Delete The Order

router.delete("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    res.json({ msg: `delete one order by ${id}` });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
