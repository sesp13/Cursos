const { Router } = require("express");

//Controllers
const { search } = require("../controllers/searchController");

const router = Router();

//BASE URL IS /api/search/

router.get("/:collection/:term", search);

module.exports = router;
