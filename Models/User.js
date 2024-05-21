const mongoose = require("mongoose");
const validator = require("validator");

let AutoID = mongoose.Types.ObjectId;

const UserSchema = new mongoose.Schema(
  {
    id: AutoID,
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validator: [
        validator.isEmail,
        "Lütfen geçerli bir email adresi giriniz.",
      ],
    },
    password: {
      type: String,
      required: true,
      min: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: true,
      min: 8,
      select: false,
      validator: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Şifreler uyuşmuyor.",
      },
    },
    birthDate: {
      type: Date,
      required: true,
      validator: {
        validator: function (el) {
          return el >= Date.now() && el === null;
        },
        message: "Lütfen geçerli bir tarih giriniz.",
      },
    },
    gender: {
      type: String,
      required: true,
      validator: {
        validator: function (el) {
          return ["Erkek", "Kadın", "Belirtmek istemiyorum"].includes(el);
        },
        message: "Lütfen cinsiyet bilgisini belirtiniz.",
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      validator: {
        validator: function (el) {
          return validator.isMobilePhone(el, "tr-TR");
        },
        message: "Lütfen geçerli bir telefon numarası giriniz.",
      },
    },
    profilePicture: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
  }
);

module.exports = mongoose.model("User", UserSchema);
