const mongoose = require("mongoose");

const bodyStructure = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  glass: {
    type: String,
    required: true,
  },
  vaultStone: {
    type: String,
    required: true,
  },
  caseDiameter: {
    type: Number,
    required: true,
  },
  caseThickness: {
    type: Number,
    required: true,
  },
  caseMaterial: {
    type: String,
    required: true,
  },
  caseColar: {
    type: String,
    required: true,
  },
  caseShape: {
    type: String,
    required: true,
  },
  style: {
    type: String,
    required: true,
  },
});

const jewelryFeature = new mongoose.Schema({});

const watchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  technology: {
    type: String,
  },
  gender: {
    type: String,
    required: true,
  },
  guarantee: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  bodyStructure: [bodyStructure],
  jewelry: [jewelryFeature],
});
