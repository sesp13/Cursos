const { request, response } = require("express");
const path = require("path");
const fs = require("fs");

const clouDinary = require("cloudinary").v2;
clouDinary.config(process.env.CLOUDINARY_URL);

//Helpers
const { uplodadFile, getCloudDinaryPublicId } = require("../helpers");

//Models
const { User, Product } = require("../models");

const uploadFile = async (req = request, res = response) => {
  //Upload images
  try {
    const filename = await uplodadFile(req.files, undefined, "imgs");
    res.json({ filename });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }

  //Upload .txt .md
  // try {
  //   const filename = await uplodadFile(req.files, ["txt", "md"], 'textos');
  //   res.json({ filename });
  // } catch (err) {
  //   res.status(400).json({
  //     error: err,
  //   });
  // }
};

//Save the image in the server
const updateImage = async (req = request, res = response) => {
  const { id, collection } = req.params;
  let model;
  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          message: `Error: Not user found with id ${id}`,
        });
      }
      break;
    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          message: `Error: Not product found with id ${id}`,
        });
      }
      break;
    default:
      return res.status(500).json({
        message: `This case is not supported yet ${collection}`,
      });
      break;
  }

  try {
    //Remove old image
    if (model.img) {
      //Remove the old image
      const oldPath = path.join(__dirname, "../uploads", collection, model.img);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    //Upload file to the model
    const filename = await uplodadFile(req.files, undefined, collection);
    model.img = filename;
    await model.save();
    return res.status(200).json({ model });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err,
    });
  }
};

//Save the image in clouddinary
const updateImageCloudDinary = async (req = request, res = response) => {
  const { id, collection } = req.params;
  let model;
  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          message: `Error: Not user found with id ${id}`,
        });
      }
      break;
    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          message: `Error: Not product found with id ${id}`,
        });
      }
      break;
    default:
      return res.status(500).json({
        message: `This case is not supported yet ${collection}`,
      });
      break;
  }

  try {
    //Remove old image
    if (model.img) {
      //Remove the old image
      const nameArr = model.img.split("/");
      const fileArr = nameArr[nameArr.length - 1];
      const [publicId, ext] = fileArr.split(".");

      //Remove file from cloudDinary
      clouDinary.uploader.destroy(publicId);
    }

    //Upload file to cloudDinary
    const { tempFilePath } = req.files.file;
    const { secure_url } = await clouDinary.uploader.upload(tempFilePath);
    //Set new image in the model
    model.img = secure_url;
    await model.save();
    return res.status(200).json({ model });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err,
    });
  }
};

const showImage = async (req = request, res = response) => {
  const { id, collection } = req.params;
  let model;
  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          message: `Error: Not user found with id ${id}`,
        });
      }
      break;
    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          message: `Error: Not product found with id ${id}`,
        });
      }
      break;
    default:
      return res.status(500).json({
        message: `This case is not supported yet ${collection}`,
      });
      break;
  }

  try {
    if (model.img) {
      //Get image
      const imagePath = path.join(
        __dirname,
        "../uploads",
        collection,
        model.img
      );
      if (fs.existsSync(imagePath)) {
        return res.status(200).sendFile(imagePath);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err,
    });
  }

  //Return default image
  const noImagePath = path.join(__dirname, "../assets/no-image.jpg");
  return res.status(404).sendFile(noImagePath);
};

const showImageCloudDinary = async (req = request, res = response) => {
  const { id, collection } = req.params;
  try {
    let model;
    switch (collection) {
      case "users":
        model = await User.findById(id);
        if (!model) {
          return res.status(400).json({
            message: `Error: Not user found with id ${id}`,
          });
        }
        break;
      case "products":
        model = await Product.findById(id);
        if (!model) {
          return res.status(400).json({
            message: `Error: Not product found with id ${id}`,
          });
        }
        break;
      default:
        return res.status(500).json({
          message: `This case is not supported yet ${collection}`,
        });
        break;
    }

    if (model.img) {
      const publicId = getCloudDinaryPublicId(model.img);
      //Check if the file exists, if doesn't it will throw an error
      try {
        await clouDinary.uploader.explicit(publicId, {
          type: "upload",
        });
        //Return the image path
        return 
        
      } catch (err) {
        console.log(err);
        //Return default image 
        const noImagePath = path.join(__dirname, "../assets/no-image.jpg");
        return res.status(404).sendFile(noImagePath);
      }
    }
    //Return default image 
    const noImagePath = path.join(__dirname, "../assets/no-image.jpg");
    return res.status(404).sendFile(noImagePath);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};

module.exports = {
  uploadFile,
  updateImage,
  updateImageCloudDinary,
  showImage,
  showImageCloudDinary,
};
