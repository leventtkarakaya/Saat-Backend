const express = require("express");
const cors = require("cors");
const DataBase = require("./Config/db");
const dotenv = require("dotenv");
const rateLimit = require("./Utils/rate-limit");
dotenv.config();

const app = express();

app.use(cors());

app.use(rateLimit);

app.use(express.json({ limit: "5mb" }));

app.use(express.urlencoded({ extended: true, limit: "5mb" }));

app.set("views", `${__dirname}/views`);

app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/public`));

app.get("/", function (req, res) {
  res.render("index");
});
// ? Routers
const AuthRouter = require("./Router/Auth");

app.use("/api/auth/", AuthRouter);

// ? database
DataBase();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
