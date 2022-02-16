const { request, response } = require("express");
const SearchHelper = require("../helpers/searchHelper");

const search = async (req = request, res = response) => {
  const { collection, term } = req.params;

  const searchHelper = new SearchHelper();

  if (!searchHelper.allowedCollections.includes(collection)) {
    return res.status(400).json({
      message: `Error: the allowed collections are ${searchHelper.allowedCollections}`,
    });
  }

  switch (collection) {
    case "categories":
      return await searchHelper.searchCategories(term, res);
      break;
    case "products":
      return await searchHelper.searchProducts(term, res);
      break;
    case "users":
      return await searchHelper.searchUsers(term, res);
      break;
    default:
      return res.status(500).json({
        message: "I forgot to do this query",
      });
  }
};

module.exports = {
  search,
};
