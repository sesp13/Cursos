const { Router } = require("express");
const { check } = require("express-validator");

const { fieldValidator } = require("../middlewares/fieldValidator");
const { login, googleSignIn } = require("../controllers/authController");

const router = Router();

//BASE URL IS /api/auth/

router.post("/login",[
    check("email", "The field 'email' is required").notEmpty(),
    check("email", "The field 'email' has to be an email").isEmail(),
    check("password", "The password is required").notEmpty(),
    fieldValidator
], login);

router.post("/google",[
    check("id_token", "The id_token field is required").notEmpty(),
    fieldValidator
], googleSignIn);


module.exports = router;