const { request, response } = require("express");

const isAdminRole = (req = request, res = response, next) => {
  if (!req.authUser) {
    return res.status(500).json({
      message:
        "The server is trying to validate Admin role without validate the token",
    });
  }
  console.log(req.authUser);
  if (req.authUser.role == "ADMIN_ROLE") {
    next();
  } else {
    return res.status(401).json({
      message: `${req.authUser.name} is not admin - operation not allowed`,
    });
  }
};

//...roles will convert all the arguments in one array with those arguments
const hasRole = (...roles) => {
  //Always return a function with middleware structure
  return (req = request, res = response, next) => {
    if (!req.authUser) {
      return res.status(500).json({
        message:
          "The server is trying to validate Admin role without validate the token",
      });
    }

    if (!roles.includes(req.authUser.role)) {
      return res.status(401).json({
        message: `${req.authUser.name} has a not allowed role to perform this action, the allowed roles are ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  isAdminRole,
  hasRole,
};
