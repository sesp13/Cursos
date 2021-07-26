const { Router } = require("express");
const { check } = require("express-validator");

//Controller methods
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsController");

//Helpers
const {
  checkCategorieExistenceById,
  checkProductExistenceById,
} = require("../helpers/db-validators");

//Middlewares
const { fieldValidator, validateJWT, hasRole } = require("../middlewares");

//BASE URL IS /api/products/
const router = Router();

router.get("/", getProducts);

router.get(
  "/:id",
  [
    check("id", "The Id must be valid").isMongoId(),
    fieldValidator,
    check("id").custom(checkProductExistenceById),
    fieldValidator,
  ],
  getProductById
);

//Create Product
router.post(
  "/",
  [
    validateJWT,
    //Check the existence of relations fields
    check("categoryId", "The categoryId field is required").notEmpty(),
    fieldValidator,
    //Check mongoId fields
    check("categoryId", "The categoryId field must be a valid Id").isMongoId(),
    fieldValidator,
    //Check valid relations
    check("categoryId").custom(checkCategorieExistenceById),
    fieldValidator,
    //Another kind of validations
    check("name", "The name field is required").notEmpty(),
    check("price", "The price must be a number").optional().isNumeric(),
    check("available", "The available field must be a boolean")
      .optional()
      .isBoolean(),
    fieldValidator,
  ],
  createProduct
);

router.put(
  "/:id",
  [
    validateJWT,
    check("id", "The id must be valid").isMongoId(),
    //Check mongoId fields
    check("categoryId", "The id must be valid").optional().isMongoId(),
    fieldValidator,
    //Check valid relations
    check("categoryId").optional().custom(checkCategorieExistenceById),
    //Another kind of validations
    check("id").custom(checkProductExistenceById),
    check("price", "The price must be a number").optional().isNumeric(),
    check("available", "The available field must be a boolean")
      .optional()
      .isBoolean(),
    fieldValidator,
  ],
  updateProduct
);

router.delete(
  "/:id",
  [
    validateJWT,
    hasRole("ADMIN_ROLE"),
    check("id", "The id must be valid").isMongoId(),
    fieldValidator,
    check("id").custom(checkProductExistenceById),
    fieldValidator,
  ],
  deleteProduct
);

module.exports = router;
