const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { request, response } = require("express");

const uploadFile = (req = request, res = response) => {
  //Check if any file was uploaded
  //Also this server will only accept the file property
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).json({
      message: "Error: No files were uploaded.",
    });
  }

  const { file } = req.files;
  const cutName = file.name.split(".");
  const ext = cutName[cutName.length - 1];

  const validExtensions = ["png", "jpg", "jpeg", "gif"];

  if (!validExtensions.includes(ext)) {
    return res.status(400).json({
      message: `Error: The extension ${ext} is not allowed, the allowed extensions are: ${validExtensions}`,
    });
  }

  //Create unique name
  const tempName = uuidv4() + '.' + ext;

  const uploadPath = path.join(__dirname, "../uploads/", tempName);

  file.mv(uploadPath, (err) => {
    console.log(err);
    if (err) {
      return res.status(500).json({ err: err });
    }

  return res.status(401).json({ message: "File uploaded to " + uploadPath });
  });
};

module.exports = {
  uploadFile,
};
