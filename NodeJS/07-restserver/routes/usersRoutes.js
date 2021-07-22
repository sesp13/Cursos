const { Router } = require("express");
const { check } = require("express-validator");

const { fieldValidator } = require("../middlewares/fieldValidator");
const {
  isValidRole,
  checkEmailExistence,
  checkUserExistenceById,
} = require("../helpers/db-validators");

const {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
  patchUsers,
  populateUsers,
} = require("../controllers/usersController");

const router = Router();

//BASE URL IS /api/users/

router.get("/", getUsers);

router.post(
  "/",
  [
    check("name", "The name is required").not().isEmpty(),
    check("password", "The password must have more than 6 chars").isLength({
      min: 6,
    }),
    // check("role", "Is not a role allowed").isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check("role").custom(isValidRole),
    check("email", "the email is not valid").isEmail(),
    check("email").custom(checkEmailExistence),
    fieldValidator,
  ],
  postUsers
);

//Fills user collection with sample data
router.post("/populate", populateUsers);

router.put(
  "/:id",
  [
    check("id", "Is not a valid Id").isMongoId(),
    check("id").custom(checkUserExistenceById),
    check("role").custom(isValidRole),
    fieldValidator,
  ],
  putUsers
);

router.patch("/", patchUsers);

router.delete(
  "/:id",
  [
    check("id", "Is not a valid Id").isMongoId(),
    check("id").custom(checkUserExistenceById),
    fieldValidator,
  ],
  deleteUsers
);

module.exports = router;
