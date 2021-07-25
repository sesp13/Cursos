const { request, response } = require("express");

const Category = require("../models/categorie");

const getCategories = async (req = request, res = response) => {
  let { skip, limit } = req.query;

  //Parse params
  limit = isNaN(limit) ? 5 : Number(limit);
  skip = isNaN(skip) ? 0 : Number(skip);
  const query = { state: true };

  try {
    //Get Queries
    const [categories, total] = await Promise.all([
      Category.find(query).skip(skip).limit(limit).populate("userId", "name"),
      Category.countDocuments(query),
    ]);

    return res.status(200).json({
      categories,
      total,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "There was error an getting categories",
      error,
    });
  }
};

const getCategoryById = async (req = request, res = response) => {
  const id = req.params.id;

  try {
    let category = await Category.findById(id).populate("userId");

    return res.status(200).json({
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `There was an error getting the categorie ${id}`,
      error,
    });
  }
};

const createCategories = async (req = request, res = response) => {
  try {
    const name = req.body.name.toUpperCase();

    const categoryDb = await Category.findOne({ name });

    //If the category exists send an error
    if (categoryDb) {
      return res.status(400).json({
        message: `The category ${categoryDb.name} already exits`,
      });
    }

    //Generate the save data
    const data = {
      name,
      userId: req.authUser._id,
    };

    //Save category
    const category = new Category(data);
    await category.save();

    return res.status(201).json({
      message: "Category created",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "There was an error creating an category",
      error,
    });
  }
};

//updateCategorie -> getName
const updateCategory = async (req = request, res = response) => {
  const id = req.params.id;
  const name = req.body.name.toUpperCase();
  try {
    //check that new name has not been taken
    let categoryFound = await Category.findOne({ name });
    if (categoryFound && categoryFound._id != id) {
      return res.status(400).json({
        message: `The name ${name} was already taken, please use another one`,
      });
    }

    //Update category
    const category = await Category.findByIdAndUpdate(id, { name });

    return res.status(200).json({
      category,
      user: `${req.authUser._id} - ${req.authUser.name}`
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `There was an error updating the category ${id}`,
      error,
    });
  }
};

//delete Categorie -> set state false
const deleteCategory = async (req = request, res = response) => {
  const id = req.params.id;
  try {
    const category = await Category.findByIdAndUpdate(id, { state: false });
    return res.status(200).json({
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `There was an error deleting the category ${id} from the database`,
      error,
    });
  }
};

module.exports = {
  getCategories,
  createCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
