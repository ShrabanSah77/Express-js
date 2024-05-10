const express = require("express");
const router = express.Router();

router.post("/register", (req, res, next) => {
  res.json({ msg: "register user" });
});

// login scenario

router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;
    console.log({ email, password });
    // logic
    if (email != "shrabanshah77@gmail.com" && password != "123") {
      throw new Error("Invalid credentials");
    }
    res.json({ msg: "login user" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
