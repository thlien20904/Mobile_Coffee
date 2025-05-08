const express = require("express");
const { connectDB, sql } = require("../db");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

router.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "public/images/avatar";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, uniqueSuffix + ext);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Chỉ hỗ trợ file ảnh (jpeg, jpg, png)!"));
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 },
});

// API lấy thông tin chi tiết của người dùng theo username
router.get("/user", async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res
      .status(400)
      .json({ error: "Vui lòng cung cấp tên người dùng (username)." });
  }

  console.log("Fetching user info for username:", username);

  try {
    const pool = await connectDB();
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
      `);

    if (result.recordset.length === 0) {
      console.log("User not found:", username);
      return res.status(404).json({ error: "Không tìm thấy người dùng." });
    }

    const user = result.recordset[0];
    if (user.avatarUrl) {
      user.avatarUrl = `${process.env.NGROK_BASE_URL}${user.avatarUrl}`;
    }

    console.log("User info fetched successfully:", user);
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user info:", err);
    res.status(500).json({ error: "Lỗi khi lấy thông tin người dùng." });
  }
});

// API cập nhật thông tin người dùng (bao gồm avatar)
router.put("/update-user", upload.single("avatar"), async (req, res) => {
  const { username, fullName, email, phone, address } = req.body;
  const avatarFile = req.file;

  if (!username) {
    return res
      .status(400)
      .json({ error: "Vui lòng cung cấp tên người dùng (username)." });
  }

  try {
    const pool = await connectDB();

    let avatarUrl = null;
    if (avatarFile) {
      avatarUrl = `/images/avatar/${avatarFile.filename}`;
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
        `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: "Không tìm thấy người dùng." });
    }

    res.status(200).json({ message: "Cập nhật thông tin thành công!" });
  } catch (err) {
    console.error("Error updating user info:", err);
    res.status(500).json({ error: "Lỗi khi cập nhật thông tin người dùng." });
  }
});

module.exports = router;
