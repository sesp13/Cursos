const path = require("path");
const { v4: uuidv4 } = require("uuid");

//By default we only accept images
const uplodadFile = (
  files,
  validExtensions = ["png", "jpg", "jpeg", "gif"],
  folder = ""
) => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    const cutName = file.name.split(".");
    const ext = cutName[cutName.length - 1];

    if (!validExtensions.includes(ext)) {
      return reject(
        `Error: The extension ${ext} is not allowed, the allowed extensions are: ${validExtensions}`
      );
    }

    //Create unique name
    const tempName = uuidv4() + "." + ext;

    const uploadPath = path.join(__dirname, "../uploads/", folder, tempName);

    file.mv(uploadPath, (err) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(tempName);
    });
  });
};

const getCloudDinaryPublicId = (url = "") => {
  try {
    const nameArr = url.split("/");
    const fileArr = nameArr[nameArr.length - 1];
    const [publicId, ext] = fileArr.split(".");
    return publicId;
  } catch (error) {
    return "";
  }
};

module.exports = {
  uplodadFile,
  getCloudDinaryPublicId,
};
