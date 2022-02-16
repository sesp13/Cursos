const { Router } = require("express");
const { check } = require("express-validator");

//Controller
const {
  uploadFile,
  updateImage,
  showImage,
  updateImageCloudDinary,
  showImageCloudDinary,
} = require("../controllers/uploadsController");

//Helpers
const { allowedCollections } = require("../helpers");

//Middleware
const { fieldValidator, validateUploadingFile } = require("../middlewares");

const router = Router();

//BASE URL IS /api/uploads/

router.get(
  "/:collection/:id",
  [
    check("id", "The id must be valid").isMongoId(),
    check("collection").custom((c) =>
      allowedCollections(c, ["users", "products"])
    ),
    fieldValidator,
  ],
  showImage
);

router.get(
  "/cloudDinary/:collection/:id",
  [
    check("id", "The id must be valid").isMongoId(),
    check("collection").custom((c) =>
      allowedCollections(c, ["users", "products"])
    ),
    fieldValidator,
  ],
  showImageCloudDinary
);

//Upload simple file
router.post("/", validateUploadingFile, uploadFile);

//Use this server to save the image
router.put(
  "/:collection/:id",
  [
    validateUploadingFile,
    check("id", "The id must be valid").isMongoId(),
    check("collection").custom((c) =>
      allowedCollections(c, ["users", "products"])
    ),
    fieldValidator,
  ],
  updateImage
);

//Use Cloud dinary to save the image
router.put(
  "/cloudDinary/:collection/:id",
  [
    validateUploadingFile,
    check("id", "The id must be valid").isMongoId(),
    check("collection").custom((c) =>
      allowedCollections(c, ["users", "products"])
    ),
    fieldValidator,
  ],
  updateImageCloudDinary
);

module.exports = router;
