const express = require("express");
const { connectDB, sql } = require("../db");
const cors = require("cors");

const router = express.Router();

router.use(cors());

// API lấy danh sách sản phẩm trong giỏ hàng của người dùng
router.get("/cart", async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res
      .status(400)
      .json({ error: "Vui lòng cung cấp tên người dùng (username)." });
  }

  try {
    const pool = await connectDB();

    const userResult = await pool
      .request()
      .input("username", sql.NVarChar, username)
      .query("SELECT Id FROM Users WHERE Username = @username");

    if (userResult.recordset.length === 0) {
      return res.status(404).json({ error: "Không tìm thấy người dùng." });
    }

    const userId = userResult.recordset[0].Id;

    const result = await pool.request().input("userId", sql.Int, userId).query(`
      SELECT 
        g.GioHangID AS gioHangId,
        g.FoodId AS id,
        f.FoodName AS name,
        f.Price AS price,
        f.DiscountPrice AS discountPrice,
        CONCAT('${process.env.NGROK_BASE_URL}', f.ImageURL) AS image,
        g.SoLuong AS quantity,
        g.SizeID AS sizeId,
        g.TotalPrice AS totalPrice
      FROM GioHang g
      JOIN Food f ON g.FoodId = f.FoodId
      WHERE g.Id = @userId
    `);

    res.status(200).json(result.recordset);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ error: "Lỗi khi lấy giỏ hàng." });
  }
});

// API thêm sản phẩm vào giỏ hàng hoặc cập nhật số lượng nếu sản phẩm đã tồn tại
router.post("/cart", async (req, res) => {
  const { username, foodId, quantity, price } = req.body;

  if (!username || !foodId || !quantity || !price) {
    return res
      .status(400)
      .json({ error: "Vui lòng cung cấp đầy đủ thông tin sản phẩm." });
  }

  try {
    const pool = await connectDB();

    const userResult = await pool
      .request()
      .input("username", sql.NVarChar, username)
      .query("SELECT Id FROM Users WHERE Username = @username");

    if (userResult.recordset.length === 0) {
      return res
        .status(404)
        .json({ error: "Không tìm thấy người近年来: [userId] người dùng." });
    }

    const userId = userResult.recordset[0].Id;

    const existingItem = await pool
      .request()
      .input("userId", sql.Int, userId)
      .input("foodId", sql.Int, foodId).query(`
        SELECT * FROM GioHang 
        WHERE Id = @userId AND FoodId = @foodId
      `);

    if (existingItem.recordset.length > 0) {
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

      res
        .status(200)
        .json({ message: "Cập nhật số lượng sản phẩm thành công!" });
    } else {
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

      res
        .status(201)
        .json({ message: "Thêm sản phẩm vào giỏ hàng thành công!" });
    }
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ error: "Lỗi khi thêm sản phẩm vào giỏ hàng." });
  }
});

// API cập nhật số lượng và giá của một sản phẩm trong giỏ hàng
router.put("/cart/:gioHangId", async (req, res) => {
  const { gioHangId } = req.params;
  const { quantity, price } = req.body;

  if (!quantity || !price) {
    return res
      .status(400)
      .json({ error: "Vui lòng cung cấp số lượng và giá sản phẩm." });
  }

  try {
    const pool = await connectDB();

    const totalPrice = price * quantity;

    const result = await pool
      .request()
      .input("gioHangId", sql.Int, gioHangId)
      .input("quantity", sql.Int, quantity)
      .input("totalPrice", sql.Decimal(10, 2), totalPrice).query(`
        UPDATE GioHang
        SET SoLuong = @quantity, TotalPrice = @totalPrice
        WHERE GioHangID = @gioHangId
      `);

    if (result.rowsAffected[0] === 0) {
      return res
        .status(404)
        .json({ error: "Không tìm thấy sản phẩm trong giỏ hàng." });
    }

    res.status(200).json({ message: "Cập nhật số lượng sản phẩm thành công!" });
  } catch (err) {
    console.error("Error updating cart item:", err);
    res.status(500).json({ error: "Lỗi khi cập nhật số lượng sản phẩm." });
  }
});

// API xóa một sản phẩm khỏi giỏ hàng
router.delete("/cart/:gioHangId", async (req, res) => {
  const { gioHangId } = req.params;

  try {
    const pool = await connectDB();

    const result = await pool.request().input("gioHangId", sql.Int, gioHangId)
      .query(`
        DELETE FROM GioHang
        WHERE GioHangID = @gioHangId
      `);

    if (result.rowsAffected[0] === 0) {
      return res
        .status(404)
        .json({ error: "Không tìm thấy sản phẩm trong giỏ hàng." });
    }

    res.status(200).json({ message: "Xóa sản phẩm khỏi giỏ hàng thành công!" });
  } catch (err) {
    console.error("Error deleting cart item:", err);
    res.status(500).json({ error: "Lỗi khi xóa sản phẩm khỏi giỏ hàng." });
  }
});

module.exports = router;
