// Import thư viện Express để tạo API
const express = require("express");
// Import hàm connectDB và sql từ file cấu hình cơ sở dữ liệu
const { connectDB, sql } = require("../db");
// Import middleware CORS để cho phép yêu cầu từ các nguồn khác
const cors = require("cors");

// Khởi tạo router của Express để định nghĩa các tuyến đường (routes)
const router = express.Router();

// Sử dụng middleware CORS cho tất cả các tuyến đường
router.use(cors());

// API GET: Lấy danh sách sản phẩm trong giỏ hàng của người dùng
router.get("/cart", async (req, res) => {
  // 1. Lấy username từ query parameter
  const { username } = req.query;

  // 2. Kiểm tra nếu không có username, trả về lỗi 400
  if (!username) {
    return res
      .status(400)
      .json({ error: "Vui lòng cung cấp tên người dùng (username)." });
  }

  try {
    // 3. Kết nối đến cơ sở dữ liệu
    const pool = await connectDB();

    // 4. Tìm ID của người dùng dựa trên username
    const userResult = await pool
      .request()
      .input("username", sql.NVarChar, username)
      .query("SELECT Id FROM Users WHERE Username = @username");

    // 5. Kiểm tra nếu không tìm thấy người dùng, trả về lỗi 404
    if (userResult.recordset.length === 0) {
      return res.status(404).json({ error: "Không tìm thấy người dùng." });
    }

    // 6. Lấy userId từ kết quả truy vấn
    const userId = userResult.recordset[0].Id;

    // 7. Truy vấn danh sách sản phẩm trong giỏ hàng của người dùng
    const result = await pool.request().input("userId", sql.Int, userId).query(`
      SELECT 
        g.GioHangID AS gioHangId, -- ID của mục trong giỏ hàng
        g.FoodId AS id, -- ID của món ăn
        f.FoodName AS name, -- Tên món ăn
        f.Price AS price, -- Giá gốc
        f.DiscountPrice AS discountPrice, -- Giá sau giảm giá
        CONCAT('${process.env.NGROK_BASE_URL}', f.ImageURL) AS image, -- URL hình ảnh
        g.SoLuong AS quantity, -- Số lượng
        g.SizeID AS sizeId, -- ID kích thước
        g.TotalPrice AS totalPrice -- Tổng giá
      FROM GioHang g
      JOIN Food f ON g.FoodId = f.FoodId -- Kết nối bảng GioHang và Food
      WHERE g.Id = @userId -- Lọc theo ID người dùng
    `);

    // 8. Trả về danh sách sản phẩm trong giỏ hàng
    res.status(200).json(result.recordset);
  } catch (err) {
    // 9. Xử lý lỗi nếu có, in lỗi ra console và trả về lỗi 500
    console.error("Error fetching cart:", err);
    res.status(500).json({ error: "Lỗi khi lấy giỏ hàng." });
  }
});

// API POST: Thêm sản phẩm vào giỏ hàng hoặc cập nhật số lượng nếu sản phẩm đã tồn tại
router.post("/cart", async (req, res) => {
  // 1. Lấy thông tin từ body của yêu cầu
  const { username, foodId, quantity, price } = req.body;

  // 2. Kiểm tra nếu thiếu thông tin, trả về lỗi 400
  if (!username || !foodId || !quantity || !price) {
    return res
      .status(400)
      .json({ error: "Vui lòng cung cấp đầy đủ thông tin sản phẩm." });
  }

  try {
    // 3. Kết nối đến cơ sở dữ liệu
    const pool = await connectDB();

    // 4. Tìm ID của người dùng dựa trên username
    const userResult = await pool
      .request()
      .input("username", sql.NVarChar, username)
      .query("SELECT Id FROM Users WHERE Username = @username");

    // 5. Kiểm tra nếu không tìm thấy người dùng, trả về lỗi 404
    if (userResult.recordset.length === 0) {
      return res.status(404).json({ error: "Không tìm thấy người dùng." });
    }

    // 6. Lấy userId từ kết quả truy vấn
    const userId = userResult.recordset[0].Id;

    // 7. Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingItem = await pool
      .request()
      .input("userId", sql.Int, userId)
      .input("foodId", sql.Int, foodId).query(`
        SELECT * FROM GioHang 
        WHERE Id = @userId AND FoodId = @foodId
      `);

    if (existingItem.recordset.length > 0) {
      // 8. Nếu sản phẩm đã tồn tại, cập nhật số lượng và tổng giá
      const currentQuantity = existingItem.recordset[0].SoLuong;
      const newQuantity = currentQuantity + quantity;
      const newTotalPrice = price * newQuantity;

      await pool
        .request()
        .input("userId", sql.Int, userId)
        .input("foodId", sql.Int, foodId)
        .input("newQuantity", sql.Int, newQuantity)
        .input("newTotalPrice", sql.Decimal(10, 2), newTotalPrice).query(`
          UPDATE GioHang
          SET SoLuong = @newQuantity, TotalPrice = @newTotalPrice
          WHERE Id = @userId AND FoodId = @foodId
        `);

      // 9. Trả về thông báo cập nhật thành công
      res
        .status(200)
        .json({ message: "Cập nhật số lượng sản phẩm thành công!" });
    } else {
      // 10. Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
      const totalPrice = price * quantity;

      await pool
        .request()
        .input("userId", sql.Int, userId)
        .input("foodId", sql.Int, foodId)
        .input("quantity", sql.Int, quantity)
        .input("totalPrice", sql.Decimal(10, 2), totalPrice).query(`
          INSERT INTO GioHang (Id, FoodId, SoLuong, TotalPrice)
          VALUES (@userId, @foodId, @quantity, @totalPrice)
        `);

      // 11. Trả về thông báo thêm sản phẩm thành công
      res
        .status(201)
        .json({ message: "Thêm sản phẩm vào giỏ hàng thành công!" });
    }
  } catch (err) {
    // 12. Xử lý lỗi nếu có, in lỗi ra console và trả về lỗi 500
    console.error("Error adding to cart:", err);
    res.status(500).json({ error: "Lỗi khi thêm sản phẩm vào giỏ hàng." });
  }
});

// API PUT: Cập nhật số lượng và giá của một sản phẩm trong giỏ hàng
router.put("/cart/:gioHangId", async (req, res) => {
  // 1. Lấy gioHangId từ tham số URL
  const { gioHangId } = req.params;
  // 2. Lấy quantity và price từ body
  const { quantity, price } = req.body;

  // 3. Kiểm tra nếu thiếu thông tin, trả về lỗi 400
  if (!quantity || !price) {
    return res
      .status(400)
      .json({ error: "Vui lòng cung cấp số lượng và giá sản phẩm." });
  }

  try {
    // 4. Kết nối đến cơ sở dữ liệu
    const pool = await connectDB();

    // 5. Tính tổng giá mới
    const totalPrice = price * quantity;

    // 6. Cập nhật số lượng và tổng giá của sản phẩm
    const result = await pool
      .request()
      .input("gioHangId", sql.Int, gioHangId)
      .input("quantity", sql.Int, quantity)
      .input("totalPrice", sql.Decimal(10, 2), totalPrice).query(`
        UPDATE GioHang
        SET SoLuong = @quantity, TotalPrice = @totalPrice
        WHERE GioHangID = @gioHangId
      `);

    // 7. Kiểm tra nếu không có hàng nào được cập nhật, trả về lỗi 404
    if (result.rowsAffected[0] === 0) {
      return res
        .status(404)
        .json({ error: "Không tìm thấy sản phẩm trong giỏ hàng." });
    }

    // 8. Trả về thông báo cập nhật thành công
    res.status(200).json({ message: "Cập nhật số lượng sản phẩm thành công!" });
  } catch (err) {
    // 9. Xử lý lỗi nếu có, in lỗi ra console và trả về lỗi 500
    console.error("Error updating cart item:", err);
    res.status(500).json({ error: "Lỗi khi cập nhật số lượng sản phẩm." });
  }
});

// API DELETE: Xóa một sản phẩm khỏi giỏ hàng
router.delete("/cart/:gioHangId", async (req, res) => {
  // 1. Lấy gioHangId từ tham số URL
  const { gioHangId } = req.params;

  try {
    // 2. Kết nối đến cơ sở dữ liệu
    const pool = await connectDB();

    // 3. Xóa sản phẩm khỏi giỏ hàng dựa trên gioHangId
    const result = await pool.request().input("gioHangId", sql.Int, gioHangId)
      .query(`
        DELETE FROM GioHang
        WHERE GioHangID = @gioHangId
      `);

    // 4. Kiểm tra nếu không có hàng nào bị xóa, trả về lỗi 404
    if (result.rowsAffected[0] === 0) {
      return res
        .status(404)
        .json({ error: "Không tìm thấy sản phẩm trong giỏ hàng." });
    }

    // 5. Trả về thông báo xóa thành công
    res.status(200).json({ message: "Xóa sản phẩm khỏi giỏ hàng thành công!" });
  } catch (err) {
    // 6. Xử lý lỗi nếu có, in lỗi ra console và trả về lỗi 500
    console.error("Error deleting cart item:", err);
    res.status(500).json({ error: "Lỗi khi xóa sản phẩm khỏi giỏ hàng." });
  }
});

// Xuất router để sử dụng trong ứng dụng chính
module.exports = router;
