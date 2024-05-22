const rateLimit = require("express-rate-limit");

const options = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  headers: true,
  handler: (req, res) => {
    res.json({
      message: "Too many requests, please try again later.",
    });
  },
};

module.exports = rateLimit(options);
