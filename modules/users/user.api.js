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
const multer = require("multer");
const { generateToken } = require("../../utils/token");
const { secure } = require("../../utils/secure");
const { sendMail } = require("../../services/mailer");

const userController = require("./user.controller");

const { validator } = require("./user.validator");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload/");
  },
  filename: function (req, file, cb) {
    console.log({ file }, Date.now());

    cb(
      null,
      file.fieldname.concat(
        "-",
        Date.now(),
        ".",
        file.originalname.split(".")[1]
      ) //profile-1234664.jpg
    );
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 1000 } });

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

router.post(
  "/register",
  upload.single("profile"), // for multiple files upload use .array
  validator,
  async (req, res, next) => {
    try {
      const { email } = req.body; // {email} destructure
      if (req.file) {
        req.body.profile = req.file.path;
      }
      // call the nodemailer
      console.log(req.body);
      const result = await userController.create(req.body); //eventEmitter.emit("signup", email);
      res.json({ msg: "User Registered Successfully", data: result });
    } catch (e) {
      next(e);
    }
  }
);

router.post("/login", (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email === "shrabanshah77@gmail.com" && password === "password") {
      // generate the JWT Token
      const payload = {
        email,
        password,
        roles: ["admin"],
      };
      const token = generateToken(payload);
      res.json({ msg: "user logged in successfully", data: token });
    } else {
      res.json({ msg: "Email or password Invalid", data: "" });
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
