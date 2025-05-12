const express = require("express");
const { connectDB, sql } = require("../db");
const cors = require("cors");

const router = express.Router();

router.use(cors());

// API lấy thông tin chi tiết của một cửa hàng theo ID
router.get("/stores/:id", async (req, res) => {
  // B1: Định nghĩa API GET cho endpoint /stores/:id
  const { id } = req.params; // B2: Lấy id từ tham số URL

  if (!id) {
    // B3: Kiểm tra nếu id không được cung cấp
    return res.status(400).json({ error: "Vui lòng cung cấp ID cửa hàng." }); // B4: Trả lỗi 400 nếu thiếu id
  }

  console.log("Fetching store with ID:", id); // B5: Ghi log id cửa hàng đang tìm

  try {
    // B6: Bắt đầu khối try để xử lý lỗi
    const pool = await connectDB(); // B7: Kết nối cơ sở dữ liệu
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
    `); // B9: Truy vấn lấy các trường id, tên, địa chỉ, giờ mở, ảnh, điện thoại, ngày tạo, vĩ độ, kinh độ

    if (result.recordset.length === 0) {
      // B10: Kiểm tra nếu không tìm thấy cửa hàng
      console.log("Store not found with ID:", id); // B11: Ghi log nếu không tìm thấy
      return res.status(404).json({ error: "Không tìm thấy cửa hàng." }); // B12: Trả lỗi 404
    }

    console.log("Store fetched successfully:", result.recordset[0]); // B13: Ghi log thành công
    res.status(200).json(result.recordset[0]); // B14: Trả thông tin cửa hàng
  } catch (err) {
    // B15: Xử lý lỗi nếu có
    console.error("Error fetching store:", err); // B16: Ghi log lỗi
    res.status(500).json({ error: "Lỗi khi lấy thông tin cửa hàng." }); // B17: Trả lỗi 500
  }
});

// API lấy danh sách tất cả các cửa hàng
router.get("/stores", async (req, res) => {
  // B1: Định nghĩa API GET cho endpoint /stores
  console.log("Fetching stores..."); // B2: Ghi log theo dõi API

  try {
    // B3: Bắt đầu khối try để xử lý lỗi
    const pool = await connectDB(); // B4: Kết nối cơ sở dữ liệu
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
    `); // B6: Truy vấn lấy các trường id, tên, địa chỉ, ảnh, ngày tạo, vĩ độ, kinh độ

    if (result.recordset.length === 0) {
      // B7: Kiểm tra nếu không có cửa hàng nào
      console.log("No stores found"); // B8: Ghi log nếu không có dữ liệu
      return res.status(404).json({ error: "Không tìm thấy cửa hàng nào." }); // B9: Trả lỗi 404
    }

    console.log("Stores fetched successfully:", result.recordset); // B10: Ghi log thành công
    res.status(200).json(result.recordset); // B11: Trả danh sách cửa hàng
  } catch (err) {
    // B12: Xử lý lỗi nếu có
    console.error("Error fetching stores:", err); // B13: Ghi log lỗi
    res
      .status(500)
      .json({ error: "Lỗi khi lấy danh sách cửa hàng.", details: err.message }); // B14: Trả lỗi 500 với chi tiết
  }
});

module.exports = router;
