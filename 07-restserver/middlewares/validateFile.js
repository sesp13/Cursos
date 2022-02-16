const { request, response } = require("express");

const validateUploadingFile = (req = request, res = response, next) => {
  //Check if any file was sent 
  //Also this server will only accept the file property
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).json({
      message: "Error: No files were uploaded.",
    });
  }
  next();
};

module.exports = {
  validateUploadingFile
}
