const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        success: false,
        message: "Token bulunamadı.",
      });
    }
    const token = req.headers["authorization"].split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Geçersiz token.",
      });
    } else {
      req.body.userId = decoded._id;
      next();
    }
  } catch (error) {
    console.log("🚀 ~ authMiddleware ~ error:", error);
    res.status({ message: error.message, success: false });
  }
};

module.exports = authMiddleware;
