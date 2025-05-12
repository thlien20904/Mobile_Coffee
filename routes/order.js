const express = require("express");
const { connectDB, sql } = require("../db");
const cors = require("cors");

// Khởi tạo router Express cho các endpoint liên quan đến đơn hàng
const router = express.Router();

// Cho phép CORS để client từ domain khác gọi API
router.use(cors());

// API POST: Tạo đơn hàng mới
router.post("/place-order", async (req, res) => {
  // Lấy dữ liệu từ body: username, tổng tiền, phương thức thanh toán, sản phẩm, địa chỉ, voucherId
  const {
    username,
    totalAmount,
    paymentMethod,
    items,
    deliveryAddress,
    voucherId,
  } = req.body;

  // Kiểm tra các trường bắt buộc, trả lỗi 400 nếu thiếu
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
    // Kết nối cơ sở dữ liệu SQL Server
    const pool = await connectDB();

    // Lấy Id người dùng từ username
    const userResult = await pool
      .request()
      .input("username", sql.NVarChar, username)
      .query("SELECT Id FROM Users WHERE Username = @username");

    // Trả lỗi 404 nếu không tìm thấy người dùng
    if (userResult.recordset.length === 0) {
      return res.status(404).json({ error: "Không tìm thấy người dùng." });
    }
    const userId = userResult.recordset[0].Id;

    // Lấy Id phương thức thanh toán
    const paymentMethodResult = await pool
      .request()
      .input("paymentMethod", sql.NVarChar, paymentMethod)
      .query(
        "SELECT Id FROM PhuongThucThanhToan WHERE TenPhuongThuc = @paymentMethod"
      );

    // Trả lỗi 404 nếu phương thức thanh toán không hợp lệ
    if (paymentMethodResult.recordset.length === 0) {
      return res
        .status(404)
        .json({ error: "Phương thức thanh toán không hợp lệ." });
    }
    const paymentMethodId = paymentMethodResult.recordset[0].Id;

    // Lấy Id trạng thái "Đặt hàng thành công"
    const statusResult = await pool
      .request()
      .query(
        "SELECT StatusId FROM OrderStatus WHERE StatusName = N'Đặt hàng thành công'"
      );

    // Trả lỗi 404 nếu trạng thái không hợp lệ
    if (statusResult.recordset.length === 0) {
      return res
        .status(404)
        .json({ error: "Trạng thái đơn hàng không hợp lệ." });
    }
    const statusId = statusResult.recordset[0].StatusId;

    // Thêm đơn hàng vào bảng Orders, trả về OrderId
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

    // Thêm chi tiết đơn hàng (sản phẩm) vào bảng OrderDetails
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

    // Trả về thông báo thành công với OrderId, mã 201
    res.status(201).json({ message: "Đặt hàng thành công!", orderId });
  } catch (err) {
    // Ghi log lỗi và trả lỗi 500 với chi tiết
    console.error("Error placing order:", err);
    res.status(500).json({ error: "Lỗi khi đặt hàng.", details: err.message });
  }
});

// API POST: Áp dụng mã voucher
router.post("/apply-voucher", async (req, res) => {
  // Lấy mã voucher và tổng tiền từ body
  const { code, totalAmount } = req.body;
  console.log("Received voucher request:", { code, totalAmount });

  // Kiểm tra dữ liệu đầu vào, trả lỗi 400 nếu thiếu
  if (!code || totalAmount === undefined) {
    console.log("Missing code or totalAmount");
    return res
      .status(400)
      .json({ error: "Vui lòng cung cấp mã voucher và tổng tiền đơn hàng." });
  }

  try {
    // Kết nối cơ sở dữ liệu
    const pool = await connectDB();
    // Lấy thông tin voucher hợp lệ
    const result = await pool.request().input("code", sql.NVarChar, code)
      .query(`
        SELECT VoucherId, Code, DiscountAmount, DiscountPercentage, MinOrderAmount, ExpiryDate, IsActive, MaxUsage, UsedCount
        FROM Vouchers
        WHERE Code = @code AND IsActive = 1 AND ExpiryDate > GETDATE()
      `);

    // Trả lỗi 404 nếu voucher không hợp lệ
    if (result.recordset.length === 0) {
      console.log("No valid voucher found for code:", code);
      return res
        .status(404)
        .json({ error: "Mã voucher không hợp lệ hoặc đã hết hạn." });
    }
    const voucher = result.recordset[0];
    console.log("Found voucher:", voucher);

    // Kiểm tra giới hạn sử dụng voucher, trả lỗi 400 nếu vượt
    if (voucher.MaxUsage && voucher.UsedCount >= voucher.MaxUsage) {
      console.log("Voucher usage limit reached:", code);
      return res
        .status(400)
        .json({ error: "Mã voucher đã được sử dụng hết lượt." });
    }

    // Kiểm tra tổng tiền đạt yêu cầu tối thiểu, trả lỗi 400 nếu không đủ
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

    // Tính giá trị giảm giá
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

    // Cập nhật số lần sử dụng voucher
    await pool
      .request()
      .input("code", sql.NVarChar, code)
      .query(
        "UPDATE Vouchers SET UsedCount = UsedCount + 1 WHERE Code = @code"
      );

    // Trả về thông báo thành công với giảm giá và VoucherId, mã 200
    res.status(200).json({
      message: "Áp dụng voucher thành công!",
      discount: Math.round(discount),
      voucherId: voucher.VoucherId,
    });
  } catch (err) {
    // Ghi log lỗi và trả lỗi 500
    console.error("Detailed error applying voucher:", err.message, err.stack);
    res.status(500).json({ error: "Lỗi server khi áp dụng voucher." });
  }
});

// API GET: Lấy danh sách địa chỉ giao hàng
router.get("/delivery-addresses", async (req, res) => {
  // Lấy userId từ query
  const { userId } = req.query;
  console.log("Received request for delivery-addresses with userId:", userId);

  // Kiểm tra userId, trả lỗi 400 nếu thiếu
  if (!userId) {
    console.log("Missing userId");
    return res.status(400).json({ error: "Vui lòng cung cấp userId." });
  }

  try {
    // Kết nối cơ sở dữ liệu
    const pool = await connectDB();
    // Lấy danh sách địa chỉ, sắp xếp theo IsDefault và CreatedDate
    const result = await pool.request().input("userId", sql.Int, userId).query(`
      SELECT AddressId, Address, IsDefault
      FROM DeliveryAddresses
      WHERE UserId = @userId
      ORDER BY IsDefault DESC, CreatedDate DESC
    `);
    console.log("Delivery addresses fetched:", result.recordset);

    // Trả về danh sách địa chỉ, mã 200
    res.status(200).json(result.recordset);
  } catch (err) {
    // Ghi log lỗi và trả lỗi 500
    console.error("Error fetching delivery addresses:", err);
    res.status(500).json({ error: "Lỗi khi lấy danh sách địa chỉ giao hàng." });
  }
});

// API POST: Thêm địa chỉ giao hàng mới
router.post("/delivery-addresses", async (req, res) => {
  // Lấy userId, address, isDefault từ body
  const { userId, address, isDefault } = req.body;
  console.log("Received request to add delivery address:", {
    userId,
    address,
    isDefault,
  });

  // Kiểm tra dữ liệu đầu vào, trả lỗi 400 nếu thiếu
  if (!userId || !address) {
    console.log("Missing userId or address");
    return res.status(400).json({ error: "userId và address là bắt buộc." });
  }

  try {
    // Kết nối cơ sở dữ liệu
    const pool = await connectDB();
    // Thêm địa chỉ mới, trả về thông tin vừa thêm
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

    // Trả về thông tin địa chỉ, mã 200
    res.status(200).json(result.recordset[0]);
  } catch (error) {
    // Ghi log lỗi và trả lỗi 500
    console.error("Error adding delivery address:", error);
    res.status(500).json({ error: "Lỗi server.", details: error.message });
  }
});

// API POST: Thêm địa chỉ giao hàng (phiên bản thay thế)
router.post("/add-delivery-address", async (req, res) => {
  // Lấy userId, address, isDefault từ body
  const { userId, address, isDefault } = req.body;
  console.log("Received request to add delivery address:", {
    userId,
    address,
    isDefault,
  });

  // Kiểm tra dữ liệu đầu vào, trả lỗi 400 nếu thiếu
  if (!userId || !address) {
    console.log("Missing userId or address");
    return res.status(400).json({ error: "userId và address là bắt buộc." });
  }

  try {
    // Kết nối cơ sở dữ liệu
    const pool = await connectDB();
    // Thêm địa chỉ mới, trả về thông tin vừa thêm
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

    // Trả về thông tin địa chỉ, mã 200
    res.status(200).json(result.recordset[0]);
  } catch (error) {
    // Ghi log lỗi và trả lỗi 500
    console.error("Error adding delivery address:", error);
    res.status(500).json({ error: "Lỗi server." });
  }
});

// API GET: Lấy lịch sử đơn hàng
router.get("/order-history", async (req, res) => {
  // Lấy username từ query
  const { username } = req.query;

  // Kiểm tra username, trả lỗi 400 nếu thiếu
  if (!username) {
    return res
      .status(400)
      .json({ error: "Vui lòng cung cấp username trong query parameter." });
  }

  try {
    // Kết nối cơ sở dữ liệu
    const pool = await connectDB();

    // Lấy Id người dùng từ username
    const userResult = await pool
      .request()
      .input("username", sql.NVarChar, username)
      .query("SELECT Id FROM Users WHERE Username = @username");

    // Trả lỗi 404 nếu không tìm thấy người dùng
    if (userResult.recordset.length === 0) {
      return res.status(404).json({ error: "Không tìm thấy người dùng." });
    }
    const userId = userResult.recordset[0].Id;

    // Lấy danh sách đơn hàng, JOIN với PhuongThucThanhToan và OrderStatus
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

    // Lấy chi tiết đơn hàng cho từng đơn
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

    // Trả về danh sách đơn hàng, mã 200
    res.status(200).json({
      success: true,
      message: "Lấy lịch sử đơn hàng thành công.",
      data: { orders },
    });
  } catch (err) {
    // Ghi log lỗi và trả lỗi 500
    console.error("Error fetching order history:", err);
    res.status(500).json({
      success: false,
      error: "Lỗi khi lấy lịch sử đơn hàng.",
      details: err.message,
    });
  }
});

// API POST: Hủy đơn hàng
router.post("/cancel-order", async (req, res) => {
  // Lấy orderId từ body
  const { orderId } = req.body;

  // Kiểm tra orderId, trả lỗi 400 nếu thiếu
  if (!orderId) {
    return res.status(400).json({ error: "Vui lòng cung cấp OrderId." });
  }

  try {
    // Kết nối cơ sở dữ liệu
    const pool = await connectDB();

    // Lấy trạng thái đơn hàng
    const orderResult = await pool
      .request()
      .input("orderId", sql.Int, orderId)
      .query("SELECT StatusId FROM Orders WHERE OrderId = @orderId");

    // Trả lỗi 404 nếu không tìm thấy đơn hàng
    if (orderResult.recordset.length === 0) {
      return res.status(404).json({ error: "Không tìm thấy đơn hàng." });
    }
    const statusId = orderResult.recordset[0].StatusId;

    // Kiểm tra trạng thái đơn hàng, trả lỗi 400 nếu không thể hủy
    if (statusId !== 1) {
      return res
        .status(400)
        .json({ error: "Đơn hàng không thể hủy ở trạng thái này." });
    }

    // Cập nhật trạng thái đơn hàng thành hủy (StatusId = 5)
    await pool
      .request()
      .input("orderId", sql.Int, orderId)
      .query("UPDATE Orders SET StatusId = 5 WHERE OrderId = @orderId");

    // Trả về thông báo thành công, mã 200
    res
      .status(200)
      .json({ success: true, message: "Hủy đơn hàng thành công." });
  } catch (err) {
    // Ghi log lỗi và trả lỗi 500
    console.error("Error canceling order:", err);
    res
      .status(500)
      .json({ error: "Lỗi khi hủy đơn hàng.", details: err.message });
  }
});

// Xuất router cho ứng dụng Express
module.exports = router;
