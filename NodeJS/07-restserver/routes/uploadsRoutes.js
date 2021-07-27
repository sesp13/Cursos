const { Router } = require("express");
const { check } = require("express-validator");

//Controller
const { uploadFile } = require("../controllers/uploadsController");

//Middleware
const { fieldValidator } = require("../middlewares/fieldValidator");

const router = Router();

//BASE URL IS /api/uploads/

router.post('/', uploadFile);

module.exports = router;