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
  },
  caseDiameter: {
    type: Number,
  },
  caseThickness: {
    type: Number,
  },
  caseMaterial: {
    type: String,
  },
  caseColar: {
    type: String,
  },
  caseShape: {
    type: String,
  },
  style: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const jewelryFeature = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  caseMaterial: {
    type: String,
  },
  caseColar: {
    type: String,
  },
  caseShape: {
    type: String,
  },
  jewelryStone: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const dialStructure = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dialStone: {
    type: String,
  },
  dialColar: {
    type: String,
  },
  dialType: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const beltStructure = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  beltColar: {
    type: String,
  },
  beltType: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const watchFeatures = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Alarm: {
    type: String,
  },
  Stopwatch: {
    type: String,
  },
  Waterproof: {
    type: String,
  },
  calendar: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AutoID = mongoose.Types.ObjectId;

const watchSchema = new mongoose.Schema(
  {
    id: AutoID,
    brand: {
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
    watchImage: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    favorite: {
      type: Boolean,
      default: false,
      select: false,
    },
    watchFeatures: [watchFeatures],
    beltStructure: [beltStructure],
    bodyStructure: [bodyStructure],
    dialStructure: [dialStructure],
    jewelry: [jewelryFeature],
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Watch", watchSchema);
