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

const event = require("events");
const router = require("express").Router();
const { generateToken } = require("../../utils/token");
const { secure } = require("../../utils/secure");
const { sendMail } = require("../../services/mailer");

const eventEmitter = new event.EventEmitter();
eventEmitter.addListener("signup", (email) =>
  sendMail({
    email,
    subject: "MovieMate Signup",
    htmlMsg: "<b>Thank you for joining Moviemate</b>",
  })
);

router.get("/", secure(["admin"]), (req, res, next) => {
  try {
    res.json({ msg: "User list generated", data: [] });
  } catch (e) {
    next(e);
  }
});

router.post("/register", (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) throw new Error("Email is missing");
    // call the nodemailer

    eventEmitter.emit("signup", email);
    res.json({ msg: "User Registered Successfully" });
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
