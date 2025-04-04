const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
      return {
        folder: file.fieldname === "photos" ? "images" : "videos",
        resource_type: file.fieldname === "photos" ? "image" : "video",
        allowed_formats: file.fieldname === "photos" ? ["jpeg", "png", "jpg", "webp"] : ["mp4", "mov", "avi", "mkv"],
      };
    },
  }),
});


module.exports = { upload };
