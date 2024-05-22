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
      passwordConfirm,
      birthDate,
      gender,
      phoneNumber,
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
      return res
        .status(400)
        .json({ message: "Şifre oluşturulamadı.", success: false });
    }
    // ? Password hashing
    const hashedPassword = await bcrypt.hash(password, salt);
    if (!hashedPassword) {
      return res
        .status(400)
        .json({ message: "Şifre oluşturulamadı.", success: false });
    }
    // ? Email sending
    const otp = otpGenerator.generate(6, {
      digits: true,
      upperCase: false,
      specialChars: false,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
    });
    req.body.otp = otp;
    // ? User creation
    if (password === passwordConfirm) {
      const user = new User({
        name,
        surname,
        email,
        password: hashedPassword,
        passwordConfirm: hashedPassword,
        birthDate,
        gender,
        phoneNumber,
        profilePicture,
        otp: otp,
      });
      const controllerUser = await user.save();

      if (!controllerUser) {
        return res.status(400).json({
          message: "Kayıt sırasında bir hata oluştu.",
          success: false,
        });
      }

      // ? Token creation
      const token = jwt.sign(
        { _id: controllerUser._id },
        process.env.JWT_SECRET,
        {
          expiresIn: 86400,
        }
      );

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
    }
  } catch (error) {
    console.log("🚀 ~ register ~ error:", error);
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    // ? User request information
    const { email, password } = req.body;
    // ? User email and password verification
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Kullanıcı e-mail bulunamadı." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Şifre hatalı." });
    }

    // ? Token creation
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });
    // ? cookie creation
    res.cookie("token", token, {
      httpOnly: true, // ? cookie only accessible by the web server
      maxAge: 24 * 60 * 60 * 1000, // ? 1 day
    });
    // ? Response
    res.status(200).json({
      success: true,
      message: "Giriş yapıldı.",
      data: { user, token },
    });
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

const authController = async (req, res) => {
  try {
    const userID = await User.findById(req.user._id);
    if (!userID) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    } else {
      res.status(200).json({
        message: "Kullanıcı bilgileri getirildi.",
        success: true,
        data: userID,
      });
    }
  } catch (error) {
    console.log("🚀 ~ authController ~ error:", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = { register, login, authController };
