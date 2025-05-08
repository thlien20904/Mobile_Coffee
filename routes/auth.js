const express = require("express");
const { connectDB, sql } = require("../db");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const router = express.Router();

router.use(cors());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "thuylien2k4@gmail.com",
    pass: "sjxtrgqgodaomlir",
  },
});

const otps = {};

// API gửi OTP để đặt lại mật khẩu
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Vui lòng cung cấp email." });
  }

  try {
    const pool = await connectDB();
    const userResult = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query("SELECT * FROM Users WHERE Email = @email");

    if (userResult.recordset.length === 0) {
      return res.status(404).json({ error: "Email không tồn tại." });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    otps[email] = { code: otp, expires: Date.now() + 5 * 60 * 1000 };

    const mailOptions = {
      from: "thuylien2k4@gmail.com",
      to: email,
      subject: "Mã OTP để đặt lại mật khẩu",
      text: `Mã OTP của bạn là: ${otp}. Mã này có hiệu lực trong 5 phút.`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({
      message:
        "Mã OTP đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư hoặc thư rác.",
    });
  } catch (err) {
    console.error("Lỗi trong forgot-password:", err);
    res.status(500).json({ error: "Lỗi khi xử lý yêu cầu." });
  }
});

// API xác minh mã OTP
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res
      .status(400)
      .json({ error: "Vui lòng cung cấp email và mã OTP." });
  }

  try {
    const storedOtp = otps[email];

    if (!storedOtp) {
      return res
        .status(400)
        .json({ error: "Mã OTP không tồn tại hoặc đã hết hạn." });
    }

    if (storedOtp.expires < Date.now()) {
      delete otps[email];
      return res.status(400).json({ error: "Mã OTP đã hết hạn." });
    }

    if (storedOtp.code !== otp) {
      return res.status(400).json({ error: "Mã OTP không hợp lệ." });
    }

    delete otps[email];
    res.status(200).json({ message: "Xác minh OTP thành công." });
  } catch (err) {
    console.error("Lỗi trong verify-otp:", err);
    res.status(500).json({ error: "Lỗi khi xác minh OTP." });
  }
});

// API đặt lại mật khẩu
router.post("/reset-password", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Vui lòng cung cấp email và mật khẩu mới." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Email không đúng định dạng." });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Mật khẩu phải có ít nhất 6 ký tự." });
  }

  try {
    const pool = await connectDB();
    const userResult = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query("SELECT * FROM Users WHERE Email = @email");

    if (userResult.recordset.length === 0) {
      return res.status(404).json({ error: "Email không tồn tại." });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    await pool
      .request()
      .input("email", sql.NVarChar, email)
      .input("passwordHash", sql.NVarChar, passwordHash)
      .query(
        "UPDATE Users SET PasswordHash = @passwordHash WHERE Email = @email"
      );

    res.status(200).json({ message: "Cập nhật mật khẩu thành công." });
  } catch (err) {
    console.error("Lỗi trong reset-password:", err);
    res.status(500).json({ error: "Lỗi khi cập nhật mật khẩu." });
  }
});

// API kiểm tra tên người dùng có tồn tại
router.post("/check-username", async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Vui lòng cung cấp tên người dùng." });
  }

  try {
    const pool = await connectDB();
    const result = await pool
      .request()
      .input("username", sql.NVarChar, username)
      .query("SELECT * FROM Users WHERE Username = @username");

    if (result.recordset.length > 0) {
      res
        .status(400)
        .json({ exists: true, message: "Tên người dùng đã được sử dụng." });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (err) {
    console.error("Lỗi khi kiểm tra username:", err);
    res.status(500).json({ error: "Lỗi server." });
  }
});

// API kiểm tra email có tồn tại
router.post("/check-email", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Vui lòng cung cấp email." });
  }

  try {
    const pool = await connectDB();
    const result = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query("SELECT * FROM Users WHERE Email = @email");

    if (result.recordset.length > 0) {
      res.status(400).json({ exists: true, message: "Email đã được sử dụng." });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (err) {
    console.error("Lỗi khi kiểm tra email:", err);
    res.status(500).json({ error: "Lỗi server." });
  }
});

// API đăng ký người dùng
router.post("/register", async (req, res) => {
  const { username, email, password, fullName, phone, address } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Vui lòng cung cấp tên người dùng, email và mật khẩu." });
  }

  try {
    const pool = await connectDB();

    const existingUser = await pool
      .request()
      .input("username", sql.NVarChar, username)
      .input("email", sql.NVarChar, email)
      .query(
        "SELECT * FROM Users WHERE Username = @username OR Email = @email"
      );

    if (existingUser.recordset.length > 0) {
      const existingUsername = existingUser.recordset.some(
        (user) => user.Username === username
      );
      const existingEmail = existingUser.recordset.some(
        (user) => user.Email === email
      );

      if (existingUsername && existingEmail) {
        return res
          .status(400)
          .json({ error: "Tên người dùng và email đã được sử dụng." });
      } else if (existingUsername) {
        return res
          .status(400)
          .json({ error: "Tên người dùng đã được sử dụng." });
      } else {
        return res.status(400).json({ error: "Email đã được sử dụng." });
      }
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await pool
      .request()
      .input("username", sql.NVarChar, username)
      .input("email", sql.NVarChar, email)
      .input("passwordHash", sql.NVarChar, hashedPassword)
      .input("fullName", sql.NVarChar, fullName || null)
      .input("phone", sql.NVarChar, phone || null)
      .input("address", sql.NVarChar, address || null)
      .query(
        "INSERT INTO Users (Username, Email, PasswordHash, FullName, Phone, Address, Role) VALUES (@username, @email, @passwordHash, @fullName, @phone, @address, 'User')"
      );

    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (err) {
    console.error("Lỗi khi đăng ký:", err);
    res.status(500).json({ error: "Lỗi khi đăng ký người dùng." });
  }
});

// API đăng nhập người dùng
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Vui lòng cung cấp tên người dùng và mật khẩu." });
  }

  console.log("Received username:", username);
  console.log("Received password:", password);

  try {
    const pool = await connectDB();
    console.log("Kết nối cơ sở dữ liệu thành công");

    const result = await pool
      .request()
      .input("username", sql.NVarChar, username)
      .query("SELECT * FROM Users WHERE Username = @username");

    if (result.recordset.length === 0) {
      console.log("User not found:", username);
      return res.status(400).json({ error: "Tên người dùng không tồn tại." });
    }

    const user = result.recordset[0];
    console.log("User found:", user.FullName);

    let passwordMatch = false;
    const storedPassword = user["PasswordHash"];

    if (!storedPassword) {
      console.log("Mật khẩu không tồn tại trong cơ sở dữ liệu:", username);
      return res.status(400).json({ error: "Mật khẩu không tồn tại." });
    }

    if (storedPassword === password) {
      passwordMatch = true;
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      console.log(`Mật khẩu của ${username} đã được băm: ${hashedPassword}`);
      await pool
        .request()
        .input("username", sql.NVarChar, username)
        .input("passwordHash", sql.NVarChar, hashedPassword)
        .query(
          "UPDATE Users SET PasswordHash = @passwordHash WHERE Username = @username"
        );
      console.log(`Mật khẩu của ${username} đã được cập nhật thành công.`);
    } else {
      passwordMatch = await bcrypt.compare(password, storedPassword);
    }

    if (!passwordMatch) {
      console.log("Password incorrect for user:", username);
      return res.status(400).json({ error: "Mật khẩu không đúng." });
    }

    res.status(200).json({
      message: "Đăng nhập thành công!",
      user: {
        username: user["Username"],
        fullName: user.FullName,
        email: user.Email,
        phone: user.Phone,
        address: user.Address,
        avatarUrl: user.AvatarUrl
          ? `${process.env.NGROK_BASE_URL}${user.AvatarUrl}`
          : null,
        id: user.Id,
      },
    });
  } catch (err) {
    console.error("Error in login:", err.message);
    console.error("Stack trace:", err.stack);
    res.status(500).json({ error: "Lỗi khi đăng nhập.", details: err.message });
  }
});

module.exports = router;
