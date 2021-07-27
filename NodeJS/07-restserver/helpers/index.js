const dbValidators = require("./db-validators");
const generateJwt = require("./generateJwt");
const googleVerify = require("./googleVerify");
const uploadFile = require("./uploadFile");

module.exports = {
  //... exports all content from de constant
  ...dbValidators,
  ...generateJwt,
  ...googleVerify,
  ...uploadFile,
};
