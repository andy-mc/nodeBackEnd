"use strict";

const multer = require("multer");

const public_uploads = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
      const [name, extension] = file.originalname.split(".");
      cb(null, `${name}-${Date.now()}.${extension}`);
  }
});

module.exports = {
  public_uploads
};
