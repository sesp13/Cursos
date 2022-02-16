const fieldValidator = require("../middlewares/fieldValidator");
const validateJWT = require("../middlewares/validateJwt");
const validateRoles = require("../middlewares/validateRoles");
const validateUploadingFile = require("../middlewares/validateFile");

module.exports = {
  ...fieldValidator,
  ...validateJWT,
  ...validateRoles,
  ...validateUploadingFile,
};
