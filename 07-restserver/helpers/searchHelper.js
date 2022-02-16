const { response } = require("express");
const { ObjectId } = require("mongoose").Types;

const { User, Product, Category } = require("../models");

class SearchHelper {
  constructor() {
    this.allowedCollections = ["categories", "products", "roles", "users"];
  }

  async searchUsers(term = "", res = response) {
    //Check the if term is a mongo Id
    const isMongoId = ObjectId.isValid(term);
    if (isMongoId) {
      const result = await User.findById(term);
      return res.status(200).json({
        results: result ? [result] : [],
      });
    }

    //Search for a simple term
    const regex = new RegExp(term, "i");
    const users = await User.find({
      $or: [{ name: regex }, { email: regex }],
      $and: [{ status: true }],
    });

    return res.status(200).json({
      results: users,
    });
  }

  async searchCategories(term = "", res = response) {
    const isMongoId = ObjectId.isValid(term);
    if (isMongoId) {
      const result = await Category.findById(term);
      return res.status(200).json({
        results: result ? [result] : [],
      });
    }

    const regex = new RegExp(term, "i");
    const categories = await Category.find({
      name: regex,
      state: true,
    }).populate("userId", "name");

    return res.status(200).json({
      results: categories,
    });
  }

  async searchProducts(term = "", res = response) {
    const isMongoId = ObjectId.isValid(term);
    if (isMongoId) {
      const result = await Product.findById(term);
      return res.status(200).json({
        results: result ? [result] : [],
      });
    }

    const regex = new RegExp(term, "i");
    const products = await Product.find({
      $or: [{ name: regex }, { description: regex }],
      $and: [{ state: true }],
    })
      .populate("userId", "name")
      .populate("categoryId", "name");

    return res.status(200).json({
      results: products,
    });
  }
}

module.exports = SearchHelper;
