const express = require("express");
const { connectDB, sql } = require("../db");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

router.use(cors());

// B1: Cấu hình lưu trữ file ảnh cho avatar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "public/images/avatar"; // Thư mục lưu avatar
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // Tạo thư mục nếu chưa có
    }
    cb(null, uploadPath); // Xác nhận thư mục
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // Tạo tên file duy nhất
    const ext = path.extname(file.originalname).toLowerCase(); // Lấy đuôi file
    cb(null, uniqueSuffix + ext); // Xác nhận tên file
  },
});

// B2: Cấu hình multer để xử lý upload file
const upload = multer({
  storage: storage, // Áp dụng cấu hình lưu trữ
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/; // Chỉ cho phép jpeg, jpg, png
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    ); // Kiểm tra đuôi file
    const mimetype = filetypes.test(file.mimetype); // Kiểm tra mimetype
    if (extname && mimetype) {
      return cb(null, true); // Cho phép tải lên
    } else {
      cb(new Error("Chỉ hỗ trợ file ảnh (jpeg, jpg, png)!")); // Báo lỗi nếu không hợp lệ
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // Giới hạn kích thước file 10MB
});

// B3: API lấy thông tin người dùng theo username
router.get("/user", async (req, res) => {
  const { username } = req.query; // Lấy username từ query

  if (!username) {
    // Kiểm tra nếu thiếu username
    return res
      .status(400)
      .json({ error: "Vui lòng cung cấp tên người dùng (username)." }); // Trả lỗi 400
  }

  console.log("Fetching user info for username:", username); // Ghi log username

  try {
    const pool = await connectDB(); // Kết nối cơ sở dữ liệu
    const result = await pool
      .request()
      .input("username", sql.NVarChar, username).query(`
        SELECT 
          Username AS username,
          FullName AS fullName,
          Email AS email,
          Phone AS phone,
          Address AS address,
          AvatarUrl AS avatarUrl,
          Id AS id
        FROM Users 
        WHERE Username = @username
      `); // Truy vấn thông tin người dùng

    if (result.recordset.length === 0) {
      // Kiểm tra nếu không tìm thấy
      console.log("User not found:", username); // Ghi log không tìm thấy
      return res.status(404).json({ error: "Không tìm thấy người dùng." }); // Trả lỗi 404
    }

    const user = result.recordset[0]; // Lấy dữ liệu người dùng
    if (user.avatarUrl) {
      // Kiểm tra nếu có avatar
      user.avatarUrl = `${process.env.NGROK_BASE_URL}${user.avatarUrl}`; // Thêm NGROK_BASE_URL vào avatar
    }

    console.log("User info fetched successfully:", user); // Ghi log thành công
    res.status(200).json(user); // Trả thông tin người dùng
  } catch (err) {
    console.error("Error fetching user info:", err); // Ghi log lỗi
    res.status(500).json({ error: "Lỗi khi lấy thông tin người dùng." }); // Trả lỗi 500
  }
});

// B4: API cập nhật thông tin người dùng (bao gồm avatar)
router.put("/update-user", upload.single("avatar"), async (req, res) => {
  const { username, fullName, email, phone, address } = req.body; // Lấy dữ liệu từ body
  const avatarFile = req.file; // Lấy file avatar

  if (!username) {
    // Kiểm tra nếu thiếu username
    return res
      .status(400)
      .json({ error: "Vui lòng cung cấp tên người dùng (username)." }); // Trả lỗi 400
  }

  try {
    const pool = await connectDB(); // Kết nối cơ sở dữ liệu

    let avatarUrl = null; // Khởi tạo avatarUrl
    if (avatarFile) {
      // Kiểm tra nếu có file avatar
      avatarUrl = `/images/avatar/${avatarFile.filename}`; // Tạo đường dẫn avatar
    }

    const result = await pool
      .request()
      .input("username", sql.NVarChar, username)
      .input("fullName", sql.NVarChar, fullName || null)
      .input("email", sql.NVarChar, email || null)
      .input("phone", sql.NVarChar, phone || null)
      .input("address", sql.NVarChar, address || null)
      .input("avatarUrl", sql.NVarChar, avatarUrl || null).query(`
          UPDATE Users
          SET FullName = @fullName, Email = @email, Phone = @phone, Address = @address
          ${avatarUrl ? ", AvatarUrl = @avatarUrl" : ""}
          WHERE Username = @username
        `); // Cập nhật thông tin người dùng, thêm avatar nếu có

    if (result.rowsAffected[0] === 0) {
      // Kiểm tra nếu không cập nhật được
      console.log("User not found:", username); // Ghi log không tìm thấy
      return res.status(404).json({ error: "Không tìm thấy người dùng." }); // Trả lỗi 404
    }

    console.log("User info updated successfully for username:", username); // Ghi log thành công
    res.status(200).json({ message: "Cập nhật thông tin thành công!" }); // Trả thông báo thành công
  } catch (err) {
    console.error("Error updating user info:", err); // Ghi log lỗi
    res.status(500).json({ error: "Lỗi khi cập nhật thông tin người dùng." }); // Trả lỗi 500
  }
});

module.exports = router;
