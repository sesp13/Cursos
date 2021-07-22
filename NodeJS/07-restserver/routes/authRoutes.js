const { Router } = require("express");
const { check } = require("express-validator");

const { login } = require("../controllers/authController");
const { fieldValidator } = require("../middlewares/fieldValidator");

const router = Router();

//BASE URL IS /api/auth/

router.post("/login",[
    check("email", "The field 'email' is required").notEmpty(),
    check("email", "The field 'email' has to be an email").isEmail(),
    check("password", "The password is required").notEmpty(),
    fieldValidator
], login);

module.exports = router;