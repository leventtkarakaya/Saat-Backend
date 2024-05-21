const express = require("express");
const cors = require("cors");
const DataBase = require("./Config/db");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json({ extended: true, limit: "5mb" }));

app.use(express.urlencoded({ extended: true, limit: "5mb" }));

app.get("/", (req, res) => {
  res.json("Hello World!");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
