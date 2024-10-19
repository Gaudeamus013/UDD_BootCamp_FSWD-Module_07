const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const addWatermark = (publicId) => {
  return cloudinary.url(publicId, {
    transformation: [
      { width: 1920, height: 1080, crop: "limit" },
      { overlay: "watermark", gravity: "center", opacity: 50 }
    ]
  });
};

module.exports = { cloudinary, addWatermark };