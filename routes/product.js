const express = require("express");
const { connectDB, sql } = require("../db");
const cors = require("cors");

const router = express.Router();

router.use(cors());

// API lấy danh sách tất cả danh mục sản phẩm
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

// API lấy danh sách tất cả sản phẩm có trạng thái hoạt động
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
        CONCAT('${process.env.NGROK_BASE_URL}', ImageURL) AS image,
        CreatedDate AS createdDate,
        CategoryId AS categoryId,
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

// API lấy thông tin chi tiết của một sản phẩm theo ID
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
