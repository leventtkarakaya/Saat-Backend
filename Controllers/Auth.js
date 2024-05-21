const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const register = async (req, res) => {
  try {
    // ? User request information
    const {
      name,
      surname,
      email,
      password,
      birthDate,
      gender,
      phoneNumber,
      passwordConfirm,
      profilePicture,
    } = req.body;
    // ? User email and phone number verification
    const userExitEmail = await User.findOne({ email });
    if (userExitEmail) {
      return res.status(400).json({
        message: "Bu email adresi ile daha önce hesap oluşturulmuştur.",
      });
    }
    const userExitPhoneNumber = await User.findOne({ phoneNumber });
    if (userExitPhoneNumber) {
      return res.status(400).json({
        message: "Bu telefon numarası ile daha önce hesap oluşturulmuştur.",
      });
    }

    // ? Password hashing
    const salt = await bcrypt.genSalt(10);
    if (!salt) {
      throw new Error("Salt oluşturulamadı");
    }
    const hashedPassword = await bcrypt.hash(password, salt);
    if (!hashedPassword) {
      throw new Error("Şifre oluşturulamadı");
    }

    // ? Password and passwordConfirm verification
    if (password !== passwordConfirm) {
      return res.status(400).json({ message: "Şifreler uyuşmuyor." });
    }

    // ? User creation
    const user = new User({
      name,
      surname,
      email,
      password: hashedPassword,
      birthDate,
      gender,
      phoneNumber,
      profilePicture,
    });
    await user.save();

    // ? Token creation
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });

    // ? Email sending
    const otp = otpGenerator.generate(6, {
      digits: true,
      upperCase: false,
      specialChars: false,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
    });

    req.body.otp = otp;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: "dd0133195@gmail.com",
      to: "leventtkarakaya@gmail.com",
      subject: "E-posta doğrulaması için verilen kodu alın",
      text: `Hesap doğrulaması için: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });

    // ? Response
    res.status(201).json({
      message: "Hesap oluşturuldu.",
      data: { user, token },
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
