const { response, request } = require("express");

const { Product } = require("../models/");

//Get all products
const getProducts = async (req = request, res = response) => {
  let { skip, limit } = req.query;

  //Parse params
  limit = isNaN(limit) ? 5 : Number(limit);
  skip = isNaN(skip) ? 0 : Number(skip);
  const query = { state: true };

  try {
    //Queries
    const [total, products] = await Promise.all([
      Product.countDocuments(query),
      Product.find({})
        .skip(skip)
        .limit(limit)
        .populate("userId", "name")
        .populate("categoryId", "name"),
    ]);

    return res.status(200).json({
      message: "Get products",
      total,
      products,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "There was an error getting the products",
      error: err,
    });
  }
};

//Get product by Id
const getProductById = async (req = request, res = response) => {
  const id = req.params.id;
  try {
    const productFound = await Product.findById(id)
      .populate("userId", "name")
      .populate("categoryId", "name");

    return res.status(200).json({
      message: "Get productBy Id",
      product: productFound,
    });
  } catch (err) {
    return res.status(500).json({
      message: `There was an error getting the product ${id}`,
      error: err,
    });
  }
};

//Create a product
const createProduct = async (req = request, res = response) => {
  try {
    const { userId, state, ...data } = req.body;

    //Uppercase name
    data.name = data.name.toUpperCase();

    //Verify unique name
    const productFound = await Product.findOne({ name: data.name });
    if (productFound) {
      return res.status(400).json({
        message: `Error: The name ${productFound.name} was already taken please use another one`,
      });
    }

    //Set user
    data.userId = req.authUser._id;

    //Create new Product
    const newProduct = new Product(data);

    await newProduct.save();

    return res.status(201).json({
      message: "Success the product was created",
      product: newProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "There was en error creating a product",
      error,
    });
  }
};

const updateProduct = async (req = request, res = response) => {
  const id = req.params.id;

  //Separate properies and data
  const { userId, state, ...data } = req.body;

  try {
    //Check valid new name
    if (data.name) {
      data.name = data.name.toUpperCase();
      const productFound = await Product.findOne({ name: data.name });
      if (productFound && productFound._id != id) {
        return res.status(400).json({
          message: `Error the name: ${data.name} was already taken please use another one`,
        });
      }
    }

    //Set user
    data.userId = req.authUser._id;

    //Update product
    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    return res.status(200).json({
      message: "Product updated",
      product,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `There was an error updating the product ${id}`,
      error: err,
    });
  }
};

const deleteProduct = async (req = request, res = response) => {
  const id = req.params.id;
  try {
    const productForDelete = await Product.findByIdAndUpdate(
      id,
      {
        state: false,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "The product was deleted",
      product: productForDelete,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `There was an error deleting the product ${id}`,
      error: err,
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
