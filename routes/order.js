const express = require("express");
const { connectDB, sql } = require("../db");
const cors = require("cors");

const router = express.Router();

router.use(cors());

// API đặt hàng mới
router.post("/place-order", async (req, res) => {
  const {
    username,
    totalAmount,
    paymentMethod,
    items,
    deliveryAddress,
    voucherId,
  } = req.body;

  if (
    !username ||
    !totalAmount ||
    !paymentMethod ||
    !items ||
    !deliveryAddress
  ) {
    return res
      .status(400)
      .json({ error: "Vui lòng cung cấp đầy đủ thông tin đơn hàng." });
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

    const paymentMethodResult = await pool
      .request()
      .input("paymentMethod", sql.NVarChar, paymentMethod)
      .query(
        "SELECT Id FROM PhuongThucThanhToan WHERE TenPhuongThuc = @paymentMethod"
      );

    if (paymentMethodResult.recordset.length === 0) {
      return res
        .status(404)
        .json({ error: "Phương thức thanh toán không hợp lệ." });
    }

    const paymentMethodId = paymentMethodResult.recordset[0].Id;

    const statusResult = await pool
      .request()
      .query(
        "SELECT StatusId FROM OrderStatus WHERE StatusName = N'Đặt hàng thành công'"
      );

    if (statusResult.recordset.length === 0) {
      return res
        .status(404)
        .json({ error: "Trạng thái đơn hàng không hợp lệ." });
    }

    const statusId = statusResult.recordset[0].StatusId;

    const orderResult = await pool
      .request()
      .input("userId", sql.Int, userId)
      .input("totalAmount", sql.Decimal(18, 3), totalAmount)
      .input("paymentMethodId", sql.Int, paymentMethodId)
      .input("statusId", sql.Int, statusId)
      .input("deliveryAddress", sql.NVarChar, deliveryAddress)
      .input("voucherId", sql.Int, voucherId || null).query(`
        INSERT INTO Orders (UserId, OrderDate, TotalAmount, PaymentMethodId, StatusId, DeliveryAddress, VoucherId)
        OUTPUT INSERTED.OrderId
        VALUES (@userId, GETDATE(), @totalAmount, @paymentMethodId, @statusId, @deliveryAddress, @voucherId)
      `);

    const orderId = orderResult.recordset[0].OrderId;

    for (const item of items) {
      await pool
        .request()
        .input("orderId", sql.Int, orderId)
        .input("foodId", sql.Int, item.foodId)
        .input("sizeId", sql.Int, item.sizeId || null)
        .input("toppingId", sql.Int, item.toppingId || null)
        .input("quantity", sql.Int, item.quantity)
        .input("price", sql.Decimal(18, 3), item.price).query(`
          INSERT INTO OrderDetails (OrderId, FoodId, SizeId, ToppingId, Quantity, Price)
          VALUES (@orderId, @foodId, @sizeId, @toppingId, @quantity, @price)
        `);
    }

    res.status(201).json({ message: "Đặt hàng thành công!", orderId });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ error: "Lỗi khi đặt hàng.", details: err.message });
  }
});

// API áp dụng mã voucher để giảm giá đơn hàng
router.post("/apply-voucher", async (req, res) => {
  const { code, totalAmount } = req.body;
  console.log("Received voucher request:", { code, totalAmount });

  if (!code || totalAmount === undefined) {
    console.log("Missing code or totalAmount");
    return res
      .status(400)
      .json({ error: "Vui lòng cung cấp mã voucher và tổng tiền đơn hàng." });
  }

  try {
    const pool = await connectDB();
    const result = await pool.request().input("code", sql.NVarChar, code)
      .query(`
        SELECT VoucherId, Code, DiscountAmount, DiscountPercentage, MinOrderAmount, ExpiryDate, IsActive, MaxUsage, UsedCount
        FROM Vouchers
        WHERE Code = @code AND IsActive = 1 AND ExpiryDate > GETDATE()
      `);

    if (result.recordset.length === 0) {
      console.log("No valid voucher found for code:", code);
      return res
        .status(404)
        .json({ error: "Mã voucher không hợp lệ hoặc đã hết hạn." });
    }

    const voucher = result.recordset[0];
    console.log("Found voucher:", voucher);

    if (voucher.MaxUsage && voucher.UsedCount >= voucher.MaxUsage) {
      console.log("Voucher usage limit reached:", code);
      return res
        .status(400)
        .json({ error: "Mã voucher đã được sử dụng hết lượt." });
    }

    if (voucher.MinOrderAmount && totalAmount < voucher.MinOrderAmount) {
      console.log("Order amount too low:", {
        totalAmount,
        minRequired: voucher.MinOrderAmount,
      });
      return res.status(400).json({
        error: `Đơn hàng phải từ ${voucher.MinOrderAmount.toLocaleString(
          "vi-VN"
        )} đ để áp dụng mã này.`,
      });
    }

    let discount = 0;
    if (voucher.DiscountAmount !== null && voucher.DiscountAmount > 0) {
      discount = voucher.DiscountAmount;
    } else if (voucher.DiscountPercentage !== null) {
      discount = (totalAmount * voucher.DiscountPercentage) / 100;
    } else {
      console.log("Invalid voucher: No discount amount or percentage provided");
      return res
        .status(400)
        .json({ error: "Voucher không có giá trị giảm giá hợp lệ." });
    }

    await pool
      .request()
      .input("code", sql.NVarChar, code)
      .query(
        "UPDATE Vouchers SET UsedCount = UsedCount + 1 WHERE Code = @code"
      );

    res.status(200).json({
      message: "Áp dụng voucher thành công!",
      discount: Math.round(discount),
      voucherId: voucher.VoucherId,
    });
  } catch (err) {
    console.error("Detailed error applying voucher:", err.message, err.stack);
    res.status(500).json({ error: "Lỗi server khi áp dụng voucher." });
  }
});

// API lấy danh sách địa chỉ giao hàng của người dùng
router.get("/delivery-addresses", async (req, res) => {
  const { userId } = req.query;
  console.log("Received request for delivery-addresses with userId:", userId);
  if (!userId) {
    console.log("Missing userId");
    return res.status(400).json({ error: "Vui lòng cung cấp userId." });
  }
  try {
    const pool = await connectDB();
    const result = await pool.request().input("userId", sql.Int, userId).query(`
      SELECT AddressId, Address, IsDefault
      FROM DeliveryAddresses
      WHERE UserId = @userId
      ORDER BY IsDefault DESC, CreatedDate DESC
    `);
    console.log("Delivery addresses fetched:", result.recordset);
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error("Error fetching delivery addresses:", err);
    res.status(500).json({ error: "Lỗi khi lấy danh sách địa chỉ giao hàng." });
  }
});

// API thêm địa chỉ giao hàng mới cho người dùng
router.post("/delivery-addresses", async (req, res) => {
  const { userId, address, isDefault } = req.body;
  console.log("Received request to add delivery address:", {
    userId,
    address,
    isDefault,
  });
  if (!userId || !address) {
    console.log("Missing userId or address");
    return res.status(400).json({ error: "userId và address là bắt buộc." });
  }
  try {
    const pool = await connectDB();
    const result = await pool
      .request()
      .input("UserId", sql.Int, userId)
      .input("Address", sql.NVarChar, address)
      .input("IsDefault", sql.Bit, isDefault ? 1 : 0).query(`
        INSERT INTO DeliveryAddresses (UserId, Address, IsDefault, CreatedDate)
        OUTPUT INSERTED.AddressId, INSERTED.UserId, INSERTED.Address, INSERTED.IsDefault
        VALUES (@UserId, @Address, @IsDefault, GETDATE())
      `);
    console.log("Added delivery address:", result.recordset[0]);
    res.status(200).json(result.recordset[0]);
  } catch (error) {
    console.error("Error adding delivery address:", error);
    res.status(500).json({ error: "Lỗi server.", details: error.message });
  }
});

// API thêm địa chỉ giao hàng mới (phiên bản khác, tương tự /delivery-addresses)
router.post("/add-delivery-address", async (req, res) => {
  const { userId, address, isDefault } = req.body;
  console.log("Received request to add delivery address:", {
    userId,
    address,
    isDefault,
  });
  if (!userId || !address) {
    console.log("Missing userId or address");
    return res.status(400).json({ error: "userId và address là bắt buộc." });
  }
  try {
    const pool = await connectDB();
    const result = await pool
      .request()
      .input("UserId", sql.Int, userId)
      .input("Address", sql.NVarChar, address)
      .input("IsDefault", sql.Bit, isDefault ? 1 : 0).query(`
        INSERT INTO DeliveryAddresses (UserId, Address, IsDefault, CreatedDate)
        OUTPUT INSERTED.AddressId, INSERTED.UserId, INSERTED.Address, INSERTED.IsDefault
        VALUES (@UserId, @Address, @IsDefault, GETDATE())
      `);
    console.log("Added delivery address:", result.recordset[0]);
    res.status(200).json(result.recordset[0]);
  } catch (error) {
    console.error("Error adding delivery address:", error);
    res.status(500).json({ error: "Lỗi server." });
  }
});

// API lấy lịch sử đơn hàng của người dùng
router.get("/order-history", async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res
      .status(400)
      .json({ error: "Vui lòng cung cấp username trong query parameter." });
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

    const ordersResult = await pool.request().input("userId", sql.Int, userId)
      .query(`
        SELECT 
          o.OrderId, 
          o.OrderDate, 
          o.TotalAmount, 
          o.PaymentMethodId, 
          pm.TenPhuongThuc AS PaymentMethod, 
          o.StatusId, 
          os.StatusName
        FROM Orders o
        JOIN PhuongThucThanhToan pm ON o.PaymentMethodId = pm.Id
        JOIN OrderStatus os ON o.StatusId = os.StatusId
        WHERE o.UserId = @userId
        ORDER BY o.OrderDate DESC
      `);

    const orders = ordersResult.recordset;

    for (let order of orders) {
      const orderDetailsResult = await pool
        .request()
        .input("orderId", sql.Int, order.OrderId).query(`
          SELECT 
            od.OrderDetailId,
            od.FoodId,
            f.FoodName AS FoodName,
            od.SizeId,
            s.SizeName,
            od.ToppingId,
            t.ToppingName,
            od.Quantity,
            od.Price
          FROM OrderDetails od
          JOIN Food f ON od.FoodId = f.FoodId
          LEFT JOIN Size s ON od.SizeId = s.SizeID
          LEFT JOIN Topping t ON od.ToppingId = t.ToppingID
          WHERE od.OrderId = @orderId
        `);

      order.items = orderDetailsResult.recordset;
    }

    res.status(200).json({
      success: true,
      message: "Lấy lịch sử đơn hàng thành công.",
      data: { orders },
    });
  } catch (err) {
    console.error("Error fetching order history:", err);
    res.status(500).json({
      success: false,
      error: "Lỗi khi lấy lịch sử đơn hàng.",
      details: err.message,
    });
  }
});

// API hủy đơn hàng
router.post("/cancel-order", async (req, res) => {
  const { orderId } = req.body;

  if (!orderId) {
    return res.status(400).json({ error: "Vui lòng cung cấp OrderId." });
  }

  try {
    const pool = await connectDB();

    const orderResult = await pool
      .request()
      .input("orderId", sql.Int, orderId)
      .query("SELECT StatusId FROM Orders WHERE OrderId = @orderId");

    if (orderResult.recordset.length === 0) {
      return res.status(404).json({ error: "Không tìm thấy đơn hàng." });
    }

    const statusId = orderResult.recordset[0].StatusId;
    if (statusId !== 1) {
      return res
        .status(400)
        .json({ error: "Đơn hàng không thể hủy ở trạng thái này." });
    }

    await pool
      .request()
      .input("orderId", sql.Int, orderId)
      .query("UPDATE Orders SET StatusId = 5 WHERE OrderId = @orderId");

    res
      .status(200)
      .json({ success: true, message: "Hủy đơn hàng thành công." });
  } catch (err) {
    console.error("Error canceling order:", err);
    res
      .status(500)
      .json({ error: "Lỗi khi hủy đơn hàng.", details: err.message });
  }
});

module.exports = router;
