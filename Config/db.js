const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const mongoURI = process.env.MONGO_URI;

const DataBase = () => {
  mongoose
    .connect(mongoURI, {
      dbName: "Saat",
    })
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.log("MongoDB connection failed", err);
    });
};

module.exports = DataBase;
