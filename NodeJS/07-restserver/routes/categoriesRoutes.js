const { Router } = require("express");
const { check } = require("express-validator");

const { fieldValidator } = require("../middlewares/fieldValidator");

const router = Router();

//BASE URL IS /api/categories/

//Get all categories / PUBLIC
router.get("/", (req, res) => {
  res.json({
    message: "GET Categories",
  });
});

//Get a categorie by id / PUBLIC
router.get("/:id", (req, res) => {
  res.json({
    message: "GET Categories BY ID",
  });
});

//Create Categorie / Private valid with any valid token
router.post("/", (req, res) => {
  res.json({
    message: "POST Categories",
  });
});

//Update categore by id / private valid with any token
router.put("/:id", (req, res) => {
  res.json({
    message: "PUT Categories BY ID",
  });
});

//Delete categorie by id / private valid only for admins
router.delete("/:id", (req, res) => {
  res.json({
    message: "DELETE Categories BY ID",
  });
});

module.exports = router;
