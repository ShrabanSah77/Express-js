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
const multer = require("multer");
const { secure } = require("../../utils/secure");

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

router.post(
  "/register",
  upload.single("profile"), // for multiple files upload use .array
  validator,
  async (req, res, next) => {
    try {
      if (req.file) {
        req.body.profile = req.file.path;
      }
      const result = await userController.create(req.body);

      res.json({ msg: "User Registered Successfully", data: result });
    } catch (e) {
      next(e);
    }
  }
);

router.get("/", secure(["admin"]), (req, res, next) => {
  try {
    res.json({ msg: "User list generated", data: [] });
  } catch (e) {
    next(e);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const result = await userController.login(req.body);
    res.json({ msg: "User successfully logged in", data: result });
  } catch (e) {
    next(e);
  }
});

router.post("/generate-email-token", async (req, res, next) => {
  try {
    const result = await userController.generateEmailToken(req.body);
    res.json({ msg: "Email successfully sent", data: result });
  } catch (e) {
    next(e);
  }
});

router.post("/verify-email-token", async (req, res, next) => {
  try {
    const result = await userController.verifyEmailToken(req.body);
    res.json({ msg: "Email successfully verified", data: result });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
