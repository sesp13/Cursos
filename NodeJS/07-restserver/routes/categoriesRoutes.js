const { Router } = require("express");
const { check } = require("express-validator");

const { fieldValidator, validateJWT, hasRole } = require("../middlewares");

const {
  createCategories,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoriesController");

const { checkCategorieExistenceById } = require("../helpers/db-validators");

const router = Router();

//BASE URL IS /api/categories/

//Get all categories / PUBLIC
router.get("/", getCategories);

//Get a categorie by id / PUBLIC
router.get(
  "/:id",
  [
    check("id", "The id must be valid").isMongoId(),
    check("id").custom(checkCategorieExistenceById),
    fieldValidator,
  ],
  getCategoryById
);

//Create Categorie / Private valid with any valid token
router.post(
  "/",
  [
    validateJWT,
    check("name", "The name is required").notEmpty(),
    fieldValidator,
  ],
  createCategories
);

//Update category by id / private valid with any token
router.put(
  "/:id",
  [
    validateJWT,
    check("id", "The id must be valid").isMongoId(),
    check("id").custom(checkCategorieExistenceById),
    check("name", "The name field is required").notEmpty(),
    fieldValidator,
  ],
  updateCategory
);

//Delete categorie by id / private valid only for admins
router.delete(
  "/:id",
  [
    validateJWT,
    hasRole("ADMIN_ROLE"),
    check("id", "The id must be valid").isMongoId(),
    check("id").custom(checkCategorieExistenceById),
    fieldValidator,
  ],
  deleteCategory
);

module.exports = router;
