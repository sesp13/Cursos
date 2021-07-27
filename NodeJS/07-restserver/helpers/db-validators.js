const { Role, User, Category, Product } = require("../models");

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

const checkCategorieExistenceById = async (id = "") => {
  const categoryFound = await Category.findById(id);
  if (!categoryFound) {
    throw new Error(`The category with Id ${id} doesn't exists`);
  }
};

const checkProductExistenceById = async (id = "") => {
  const categoryFound = await Product.findById(id);
  if (!categoryFound) {
    throw new Error(`The product with Id ${id} doesn't exists`);
  }
};

//Validate allowed collections
const allowedCollections = async (collection = "", collections = []) => {
  const isIncluded = collections.includes(collection);
  if (!isIncluded) {
    throw new Error(
      `The collection ${collection} is not allowed, the allowed colections are ${collections}`
    );
  }
  return true;
};

module.exports = {
  isValidRole,
  checkEmailExistence,
  checkUserExistenceById,
  checkCategorieExistenceById,
  checkProductExistenceById,
  allowedCollections,
};
