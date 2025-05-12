const express = require("express");
const { connectDB, sql } = require("../db");
const cors = require("cors");

const router = express.Router();

router.use(cors());

// API lấy danh sách tất cả danh mục sản phẩm
router.get("/categories", async (req, res) => {
  console.log("Fetching categories..."); // B1: Ghi log theo dõi API

  try {
    const pool = await connectDB(); // B2: Kết nối cơ sở dữ liệu
    const result = await pool.request().query(`
      SELECT 
        CategoryId AS id,
        CategoryName AS name
      FROM Category
    `); // B3: Truy vấn lấy danh mục

    if (result.recordset.length === 0) {
      console.log("No categories found"); // B4: Ghi log nếu không có dữ liệu
      return res.status(404).json({ error: "Không tìm thấy danh mục nào." }); // B5: Trả lỗi 404
    }

    console.log("Categories fetched successfully:", result.recordset); // B6: Ghi log thành công
    res.status(200).json(result.recordset); // B7: Trả danh sách danh mục
  } catch (err) {
    console.error("Error fetching categories:", err); // B8: Ghi log lỗi
    res.status(500).json({ error: "Lỗi khi lấy danh sách danh mục." }); // B9: Trả lỗi 500
  }
});

// API lấy danh sách tất cả sản phẩm có trạng thái hoạt động
router.get("/products", async (req, res) => {
  console.log("Fetching products..."); // B1: Ghi log theo dõi API

  try {
    const pool = await connectDB(); // B2: Kết nối cơ sở dữ liệu
    const result = await pool.request().query(`
      SELECT 
        FoodId AS id,
        FoodName AS name,
        Price AS price,
        DiscountPrice AS discountPrice,
        CONCAT('${process.env.NGROK_BASE_URL}', ImageURL) AS image,
        CreatedDate AS createdDate,
        CategoryId AS categoryId,
        CASE 
          WHEN DATEDIFF(DAY, CreatedDate, GETDATE()) <= 7 THEN 1 
          ELSE 0 
        END AS isNew
      FROM Food
      WHERE Status = 1
    `); // B3: Truy vấn lấy sản phẩm (Status = 1), thêm isNew nếu tạo trong 7 ngày

    if (result.recordset.length === 0) {
      console.log("No products found with Status = 1"); // B4: Ghi log nếu không có dữ liệu
      return res.status(404).json({ error: "Không tìm thấy sản phẩm nào." }); // B5: Trả lỗi 404
    }

    console.log("Products fetched successfully:", result.recordset); // B6: Ghi log thành công
    res.status(200).json(result.recordset); // B7: Trả danh sách sản phẩm
  } catch (err) {
    console.error("Error fetching products:", err); // B8: Ghi log lỗi
    res.status(500).json({ error: "Lỗi khi lấy danh sách sản phẩm." }); // B9: Trả lỗi 500
  }
});

// API lấy thông tin chi tiết của một sản phẩm theo ID
router.get("/products/:id", async (req, res) => {
  const { id } = req.params; // B1: Lấy id từ URL

  if (!id) {
    return res.status(400).json({ error: "Vui lòng cung cấp ID sản phẩm." }); // B2: Trả lỗi 400 nếu thiếu id
  }

  console.log("Fetching product with ID:", id); // B3: Ghi log id đang tìm

  try {
    const pool = await connectDB(); // B4: Kết nối cơ sở dữ liệu
    const result = await pool.request().input("id", sql.Int, id).query(`
      SELECT 
        FoodId AS id,
        FoodName AS name,
        Price AS price,
        DiscountPrice AS discountPrice,
        CONCAT('${process.env.NGROK_BASE_URL}', ImageURL) AS image,
        Description AS description,
        Stock AS stock,
        CreatedDate AS createdDate,
        CASE 
          WHEN DATEDIFF(DAY, CreatedDate, GETDATE()) <= 7 THEN 1 
          ELSE 0 
        END AS isNew
      FROM Food
      WHERE FoodId = @id AND Status = 1
    `); // B5: Truy vấn sản phẩm theo id (Status = 1), thêm isNew nếu tạo trong 7 ngày

    if (result.recordset.length === 0) {
      console.log("Product not found with ID:", id); // B6: Ghi log nếu không tìm thấy
      return res.status(404).json({ error: "Không tìm thấy sản phẩm." }); // B7: Trả lỗi 404
    }

    console.log("Product fetched successfully:", result.recordset[0]); // B8: Ghi log thành công
    res.status(200).json(result.recordset[0]); // B9: Trả thông tin sản phẩm
  } catch (err) {
    console.error("Error fetching product:", err); // B10: Ghi log lỗi
    res.status(500).json({ error: "Lỗi khi lấy thông tin sản phẩm." }); // B11: Trả lỗi 500
  }
});

module.exports = router;
