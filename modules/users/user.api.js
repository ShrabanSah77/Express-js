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
  // how to limit the file size; 1MB limit??
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

// User Day 2

router.get("/", secure(["admin"]), async (req, res, next) => {
  try {
    // TODO advanced Ops
    const data = await userController.list();
    res.json({ msg: "User list generated", data });
  } catch (e) {
    next(e);
  }
});

router.patch("/:id/block", secure(["admin"]), async (req, res, next) => {
  try {
    const result = await userController.blockUser(req.params.id);
    res.json({ msg: "User status updated Successfully", data: result });
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const result = await userController.removeById(req.params.id);
    res.json({ msg: "User Deleted successfully", data: result });
  } catch (e) {
    next(e);
  }
});

router.get("/profile", secure(), async (req, res, next) => {
  try {
    const result = await userController.getProfile(req.currentUser);
    res.json({ msg: "User profile generated", data: result });
  } catch (e) {
    next(e);
  }
});

// Day 3

router.put("/profile", secure(), async (req, res, next) => {
  try {
    const result = await userController.updateById(req.currentUser, req.body);
    res.json({ msg: "User Profile Updated Successfully", data: result });
  } catch (e) {
    next(e);
  }
});

router.get("/:id", secure(["admin"]), async (req, res, next) => {
  try {
    const result = await userController.getById(req.params.id);
    res.json({ msg: "User detail generated", data: result });
  } catch (e) {
    next(e);
  }
});

router.post(
  "/change-password",
  secure(["user", "admin"]),
  async (req, res, next) => {
    try {
      const result = await userController.changePassword(
        req.currentUser,
        req.body
      );
      res.json({ msg: "Password changed successfully", data: result });
    } catch (e) {
      next(e);
    }
  }
);

router.post("/reset-password", secure(["admin"]), async (req, res, next) => {
  try {
    const { id, newPassword } = req.body;
    if (!id || !newPassword) throw new Error("Something is missing");
    const result = await userController.resetPassword(id, newPassword);
    res.json({ msg: "Password Reset Successfully", data: result });
  } catch (e) {
    next(e);
  }
});

router.post("/forget-password-token", async (req, res, next) => {
  try {
    const result = await userController.forgetPasswordTokenGen(req.body);
    res.json({ msg: "Forget Password Token sent successfully", data: result });
  } catch (e) {
    next(e);
  }
});

router.post("/forget-password", async (req, res, next) => {
  try {
    const result = await userController.forgetPasswordPassChange(req.body);
    res.json({ msg: "Password changed successfully", data: result });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
