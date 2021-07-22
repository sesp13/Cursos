const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generateJwt");

const User = require("../models/user");

async function login(req = request, res = response) {
  const { email, password } = req.body;

  try {
    //Verify email existencie
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User / Password are not correct",
      });
    }

    //Verify if the user is activated
    if (!user.state) {
      return res.status(400).json({
        message: "User / Password are not correct - State False",
      });
    }

    //Verify password
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        message: "User / Password are not correct - Password",
      });
    }

    //Generate JWT
    const token = await generateJWT(user.id);

    return res.json({
      message: "Login Ok",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something were wrong, please notify the administrator",
    });
  }
}

module.exports = {
  login,
};
