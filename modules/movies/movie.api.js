const router = require("express").Router();
const movieController = require("./movie.controller");
const { secure } = require("../../utils/secure");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload/movies");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname.concat(
        "-",
        Date.now(),
        ".",
        file.originalname.split(".")[1]
      )
    );
  },
  // how to limit the file size; 1MB limit??
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // in bytes (1 MB = 1000000 bytes)
});

// 1. List all movie

router.get("/", async (req, res, next) => {
  try {
    const result = await movieController.list();
    res.json({ msg: "All movies list", data: result });
  } catch (e) {
    next(e);
  }
});

// 2. Create A movie

router.post(
  "/",
  secure(["admin"]),
  upload.single("poster"),
  async (req, res, next) => {
    try {
      if (req.file) {
        req.body.poster = req.file.path;
      }
      req.body.createdBy = req.currentUser;
      const result = await movieController.create(req.body);
      res.json({ msg: "Created new movie", data: result });
    } catch (e) {
      next(e);
    }
  }
);

// 3. Read movie

router.get("/:slug", async (req, res, next) => {
  try {
    const { slug } = req.params;
    const result = await movieController.getBySlug(slug);
    res.json({ msg: `read one movie by ${slug}`, data: result });
  } catch (e) {
    next(e);
  }
});

// 4. Update

router.put(
  "/:slug",
  secure(["admin"]),
  upload.single("poster"),
  async (req, res, next) => {
    try {
      const { slug } = req.params;
      req.body.updatedBy = req.currentUser;
      const result = await movieController.update(slug, req.body);
      res.json({ msg: `update one movie by ${slug}`, data: result });
    } catch (e) {
      next(e);
    }
  }
);

// 5. Delete

router.delete("/slug", secure(["admin"]), async (req, res, next) => {
  try {
    const { slug } = req.params;
    req.body.updatedBy = req.currentUser;
    const result = await movieController.remove(slug);
    res.json({ msg: `delete one movie by ${slug}`, data: result });
  } catch (e) {
    next(e);
  }
});

// 6. Update the seats for one movie

router.patch("/:slug/seats", secure(["admin"]), async (req, res, next) => {
  try {
    const { slug } = req.params;
    req.body.updatedBy = req.currentUser;
    const result = await movieController.updateSeats(slug, req.body);
    res.json({
      msg: `update the seat number of one movie by ${slug}`,
      data: result,
    });
  } catch (e) {
    next(e);
  }
});

// 7. Change the release date of 1 movie

router.patch(
  "/:slug/release-date",
  secure(["admin"]),
  async (req, res, next) => {
    try {
      const { slug } = req.params;
      req.body.updatedBy = req.currentUser;
      req.body.updatedBy = req.currentUser;
      const result = await movieController.updateReleaseDate(slug, req.body);
      res.json({
        msg: `update the release date of one movie by ${slug}`,
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
