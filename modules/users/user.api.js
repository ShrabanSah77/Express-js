/*
1. Register
2. login
3. forget password
4. reset password
5. change passwrod
6. verify token
7. change status of user
8. delete user
9. list users
10. update user
11. update my profile
12. get one user

*/

const router = require("express").Router();
const { generateToken } = require("../../utils/token");
const {secure} = require("../../utils/secure");
router.get("/", secure(["admin"]), (req, res, next) => {
  try {
    res.json({ msg: "User list generated", data: [] });
  } catch (e) {
    next(e);
  }
});

router.post("/login", (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email === "shrabanshah77@gmail.com" && password === "password") {
      // generate the JWT Token
      const payload = {
        email,
        roles: ["admin"],
      };
      const token = generateTOken(payload);
      res.json({ msg: "user logged in successfully", data: token });
    } else {
      res.json({ msg: "Email or password Invalid", data: "" });
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
