const express = require("express");
const { connectDB, sql } = require("./db");
const cors = require("cors");

const router = express.Router();

// Thêm middleware CORS
router.use(cors());

// API đăng ký người dùng mới
router.post("/register", async (req, res) => {
  const { username, email, password, fullName, phone, address } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Vui lòng cung cấp tên người dùng, email và mật khẩu." });
  }

  try {
    const pool = await connectDB();

    // Kiểm tra username hoặc email đã tồn tại
    const existingUser = await pool
      .request()
      .input("username", sql.NVarChar, username)
      .input("email", sql.NVarChar, email)
      .query(
        "SELECT * FROM Users WHERE Username = @username OR Email = @email"
      );

    if (existingUser.recordset.length > 0) {
      return res
        .status(400)
        .json({ error: "Tên người dùng hoặc email đã được sử dụng." });
    }

    // Dùng mật khẩu thô (không mã hóa)
    await pool
      .request()
      .input("username", sql.NVarChar, username)
      .input("email", sql.NVarChar, email)
      .input("passwordHash", sql.NVarChar, password)
      .input("fullName", sql.NVarChar, fullName || null)
      .input("phone", sql.NVarChar, phone || null)
      .input("address", sql.NVarChar, address || null)
      .query(
        "INSERT INTO Users (Username, Email, PasswordHash, FullName, Phone, Address, Role) VALUES (@username, @email, @passwordHash, @fullName, @phone, @address, 'User')"
      );

    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi khi đăng ký người dùng." });
  }
});

// API đăng nhập
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
    const result = await pool
      .request()
      .input("username", sql.NVarChar, username)
      .query("SELECT * FROM Users WHERE Username = @username");

    if (result.recordset.length === 0) {
      console.log("User not found:", username);
      return res.status(400).json({ error: "Tên người dùng không tồn tại." });
    }

    const user = result.recordset[0];

    // So sánh trực tiếp mật khẩu (không hash)
    if (password !== user.PasswordHash) {
      console.log("Password incorrect for user:", username);
      return res.status(400).json({ error: "Mật khẩu không đúng." });
    }

    res.status(200).json({ message: "Đăng nhập thành công!" });
  } catch (err) {
    console.error("Error in login:", err);
    res.status(500).json({ error: "Lỗi khi đăng nhập." });
  }
});

// API lấy danh sách danh mục
router.get("/categories", async (req, res) => {
  console.log("Fetching categories...");

  try {
    const pool = await connectDB();
    const result = await pool.request().query(`
      SELECT 
        CategoryId AS id,
        CategoryName AS name
      FROM Category
    `);

    if (result.recordset.length === 0) {
      console.log("No categories found");
      return res.status(404).json({ error: "Không tìm thấy danh mục nào." });
    }

    console.log("Categories fetched successfully:", result.recordset);
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Lỗi khi lấy danh sách danh mục." });
  }
});

// API lấy danh sách sản phẩm
router.get("/products", async (req, res) => {
  console.log("Fetching products...");

  try {
    const pool = await connectDB();
    const result = await pool.request().query(`
      SELECT 
        FoodId AS id,
        FoodName AS name,
        Price AS price,
        DiscountPrice AS discountPrice,
        CONCAT('https://9883-171-251-212-26.ngrok-free.app', ImageURL) AS image,
        CreatedDate AS createdDate,
        CategoryId AS categoryId, -- Thêm categoryId
        CASE 
          WHEN DATEDIFF(DAY, CreatedDate, GETDATE()) <= 7 THEN 1 
          ELSE 0 
        END AS isNew
      FROM Food
      WHERE Status = 1
    `);

    if (result.recordset.length === 0) {
      console.log("No products found with Status = 1");
      return res.status(404).json({ error: "Không tìm thấy sản phẩm nào." });
    }

    console.log("Products fetched successfully:", result.recordset);
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Lỗi khi lấy danh sách sản phẩm." });
  }
});

// API lấy chi tiết sản phẩm
router.get("/products/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Vui lòng cung cấp ID sản phẩm." });
  }

  console.log("Fetching product with ID:", id);

  try {
    const pool = await connectDB();
    const result = await pool.request().input("id", sql.Int, id).query(`
        SELECT 
          FoodId AS id,
          FoodName AS name,
          Price AS price,
          DiscountPrice AS discountPrice,
          ImageURL AS image,
          Description AS description,
          Stock AS stock,
          CreatedDate AS createdDate,
          CASE 
            WHEN DATEDIFF(DAY, CreatedDate, GETDATE()) <= 7 THEN 1 
            ELSE 0 
          END AS isNew
        FROM Food
        WHERE FoodId = @id AND Status = 1
      `);

    if (result.recordset.length === 0) {
      console.log("Product not found with ID:", id);
      return res.status(404).json({ error: "Không tìm thấy sản phẩm." });
    }

    console.log("Product fetched successfully:", result.recordset[0]);
    res.status(200).json(result.recordset[0]);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: "Lỗi khi lấy thông tin sản phẩm." });
  }
});

module.exports = router;
