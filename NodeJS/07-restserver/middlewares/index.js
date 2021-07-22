const fieldValidator = require("../middlewares/fieldValidator");
const validateJWT = require("../middlewares/validateJwt");
const validateRoles = require("../middlewares/validateRoles");

module.exports = {
  ...fieldValidator,
  ...validateJWT,
  ...validateRoles,
};
