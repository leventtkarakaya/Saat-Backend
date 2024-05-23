const cloundinary = require("cloudinary");
const dotenv = require("dotenv");

dotenv.config();

cloundinary.config({
  CLOUD_NAME: process.env.CLOUD_NAME,
  CLOUD_KEY: process.env.CLOUD_KEY,
  CLOUD_SECRET: process.env.CLOUD_SECRET,
});

const cloudImage = async (req, res) => {
  try {
    const image = await cloundinary.uploader.upload(req.files.image.path);
    if (!image) {
      res.status(400).json({
        success: false,
        message: "Resim yüklenirken hata oluştu",
      });
    }
    res.status(200).json({
      success: true,
      message: "Resim başarılı bir şekilde yükelendi",
    });
  } catch (error) {
    console.log("🚀 ~ cloudImage ~ error:", error);
    res.status(400).json({
      message: "Server'da bir hata oluştu",
      success: false,
    });
  }
};

module.exports = { cloudImage };
