const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");

const { generateJWT } = require("../helpers/generateJwt");
const { googleVerify } = require("../helpers/googleVerify");

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

const googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, email, img } = await googleVerify(id_token);

    //Verify if the email exists on the database
    let user = await User.findOne({ email });

    //If the user doesn't exists create it
    if (!user) {
      const data = {
        name,
        email,
        password: ":p",
        google: true,
        img,
      };

      user = new User(data);
      await user.save();
    }

    //Only allow users with state 1
    if (!user.state) {
      return res.status(401).json({
        msg: "User disabled please notify to database server",
      });
    }

    //Generate JWT
    const token = await generateJWT(user.id);

    return res.json({
      message: "Everything OK google sign in",
      user,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Invalid google token",
      error,
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
