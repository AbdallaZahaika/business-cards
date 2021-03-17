const express = require("express");
const fs = require("fs");
const multer = require("multer");
const auth = require("../middleware/auth");
const { Card } = require("../models/card");
let router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, "public");
  },
  filename: function (req, file, cd) {
    const parts = file.mimetype.split("/");
    cd(null, `${file.originalname}-${Date.now()}.${parts[1]}`);
  },
});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/gif" ||
    file.mimetype === "image/psd"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("only .png .jpg .jpeg .gif .psd"));
  }
};
const maxSize = 5 * 1024 * 1024;
const uploadCardImage = multer({
  storage,
  fileFilter: filefilter,
  limits: { fileSize: maxSize },
}).single("image");

router.post("/save-card-image", auth, (req, res) => {
  uploadCardImage(req, res, (error) => {
    if (error && error.message) {
      res.json({ error: error.message });
    } else {
      res.json({
        file: {
          path: `/public/${req.file.filename}`,
          name: req.file.originalname,
        },
      });
    }
  });
});

router.put("/delete-card-image/", auth, async (req, res) => {
  const path = req.body.cardImage.file.path;
  const checkUser = await Card.findOne({
    user_id: req.user._id,
    cardImage: req.body.cardImage,
  });
  if (checkUser) {
    if (path === "/public/defula_avatir_image.png") {
      return res.send("deleted ");
    }
    fs.unlink(`${__dirname}/..${path}`, (err) => {
      if (err) {
        return res.json({ error: err.message });
      } else {
        return res.send("deleted ");
      }
    });
  } else {
    res.send("you are not the owner of the image don't try again");
  }
});
module.exports = router;
