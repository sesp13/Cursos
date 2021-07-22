const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      message: "The request does not have token",
    });
  }

  try {
    //Verify the token, if the token is not valid it will throw an error
    const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const { uid } = payload;

    //Set auth user in the request
    const authUser = await User.findById(uid);

    //Verify User existence in the database
    if(!authUser){
      return res.status(401).json({
        message: "Invalid Token - User Not Found",
      });
    }

    //Verify that the authUser has not been deleted | authUser.state = false
    if (!authUser.state) {
      return res.status(401).json({
        message: "Invalid Token - User Deleted",
      });
    }

    req.authUser = authUser;

    //Everything is ok, please continue
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Invalid Token",
    });
  }
};

module.exports = {
  validateJWT,
};
