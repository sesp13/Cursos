const { validationResult } = require("express-validator");
const { request, response } = require("express");

//Custom Middleware
const fieldValidator = (req = request, res = response, next) => {
  //Validate fields detected in express validator middleware
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors });
  }

  next();
};

module.exports = {
  fieldValidator,
};
