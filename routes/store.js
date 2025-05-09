const express = require("express");
const { connectDB, sql } = require("../db");
const cors = require("cors");

const router = express.Router();

router.use(cors());

// API lấy thông tin chi tiết của một cửa hàng theo ID
router.get("/stores/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Vui lòng cung cấp ID cửa hàng." });
  }

  console.log("Fetching store with ID:", id);

  try {
    const pool = await connectDB();
    const result = await pool.request().input("id", sql.Int, id).query(`
      SELECT 
        CuaHangId AS id,
        CuaHangName AS name,
        address,
        opening_hours AS openingHours,
        CONCAT('${process.env.NGROK_BASE_URL}', image_url) AS image,
        phone,
        created_at AS createdAt,
        latitude,
        longitude
      FROM CuaHang
      WHERE CuaHangId = @id
    `);

    if (result.recordset.length === 0) {
      console.log("Store not found with ID:", id);
      return res.status(404).json({ error: "Không tìm thấy cửa hàng." });
    }

    console.log("Store fetched successfully:", result.recordset[0]);
    res.status(200).json(result.recordset[0]);
  } catch (err) {
    console.error("Error fetching store:", err);
    res.status(500).json({ error: "Lỗi khi lấy thông tin cửa hàng." });
  }
});

// API lấy danh sách tất cả các cửa hàng
router.get("/stores", async (req, res) => {
  console.log("Fetching stores...");

  try {
    const pool = await connectDB();
    const result = await pool.request().query(`
      SELECT 
        CuaHangId AS id,
        CuaHangName AS name,
        address,
        CONCAT('${process.env.NGROK_BASE_URL}', image_url) AS image,
        created_at AS createdAt,
        latitude,
        longitude
      FROM CuaHang
    `);

    if (result.recordset.length === 0) {
      console.log("No stores found");
      return res.status(404).json({ error: "Không tìm thấy cửa hàng nào." });
    }

    console.log("Stores fetched successfully:", result.recordset);
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error("Error fetching stores:", err);
    res
      .status(500)
      .json({ error: "Lỗi khi lấy danh sách cửa hàng.", details: err.message });
  }
});

module.exports = router;
