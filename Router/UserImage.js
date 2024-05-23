const express = require("express");

const { cloudImage } = require("../Controllers/UserImage");

const router = express.Router();

router.post("/imageFile", cloudImage);

module.exports = router;
