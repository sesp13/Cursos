const Role = require("../models/role");
const User = require("../models/user");

const isValidRole = async (role = "") => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`The role ${role} is not registered in the databse `);
  }
};

const checkEmailExistence = async (email = "") => {
  const emailFound = await User.findOne({ email });
  if (emailFound) {
    throw new Error(`The email ${email} has already been taken`);
  }
};

const checkUserExistenceById = async (id = "") => {
  const userFound = await User.findById(id);
  if (!userFound) {
    throw new Error(`The user with Id ${id} doesn't exists`);
  }
};

module.exports = {
  isValidRole,
  checkEmailExistence,
  checkUserExistenceById,
};
