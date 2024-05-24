const Watch = require("../Models/Watch");

const createWatch = async (req, res) => {
  const {
    brand,
    model,
    technology,
    gender,
    guarantee,
    description,
    watchImage,
    price,
    watchFeatures,
    beltStructure,
    bodyStructure,
    dialStructure,
    jewelry,
  } = req.body;

  try {
    const newWatch = new Watch({
      brand,
      model,
      technology,
      gender,
      guarantee,
      description,
      watchImage,
      price,
      watchFeatures,
      beltStructure,
      bodyStructure,
      dialStructure,
      jacquard,
      jewelry,
    });
    await newWatch.save();
    res.status(200).json({
      message: "Saat oluşturuldu",
      success: true,
    });
  } catch (error) {
    console.log("🚀 ~ createWatch ~ error:", error);
    res.status(500).json({
      message: "Serverda bir hata oluştu",
      success: false,
    });
  }
};

const getWatch = async (req, res) => {
  const { id } = req.params;
  try {
    const watch = await Watch.findById(id);
    if (!watch) {
      res.status(404).json({
        message: "Saat bulunamadı",
        success: false,
      });
    }
    res.status(200).json({
      message: "Saat bulundu",
      success: true,
      data: watch,
    });
  } catch (error) {
    console.log("🚀 ~ getWatch ~ error:", error);
    res.status(500).json({
      message: "Serverda bir hata oluştu",
      success: false,
    });
  }
};
const getSingleWatchBrand = async (req, res) => {
  const { brand } = req.params;
  try {
    const watch = await Watch.find({ brand });
    if (!watch) {
      res.status(404).json({
        message: "Saat bulunamadı",
        success: false,
      });
    }
    res.status(200).json({
      message: "Saat bulundu",
      success: true,
      data: watch,
    });
  } catch (error) {
    console.log("🚀 ~ getSingleWatchBrand ~ error:", error);
    res.status(500).json({
      message: "Serverda bir hata oluştu",
      success: false,
    });
  }
};

module.exports = { createWatch, getWatch, getSingleWatchBrand };
