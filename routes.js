const express = require("express");
const { connectDB, sql } = require("./db");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

router.use(cors());

// Cấu hình multer để lưu ảnh
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
    // Chuẩn hóa đuôi file thành in thường
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
  limits: { fileSize: 5 * 1024 * 1024 },
});

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
    console.log(user.fullName);

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

// API lấy thông tin khách hàng dựa trên username
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
          AvatarUrl AS avatarUrl
        FROM Users 
        WHERE Username = @username
      `);

    if (result.recordset.length === 0) {
      console.log("User not found:", username);
      return res.status(404).json({ error: "Không tìm thấy người dùng." });
    }

    const user = result.recordset[0];
    if (user.avatarUrl) {
      user.avatarUrl = `https://060e-171-251-212-26.ngrok-free.app${user.avatarUrl}`;
    }

    console.log("User info fetched successfully:", user);
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user info:", err);
    res.status(500).json({ error: "Lỗi khi lấy thông tin người dùng." });
  }
});

// API cập nhật thông tin người dùng
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

// API đặt hàng
router.post("/place-order", async (req, res) => {
  const { username, totalAmount, paymentMethod, items, deliveryAddress } =
    req.body;

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

    const allStatuses = await pool
      .request()
      .query("SELECT StatusId, StatusName FROM OrderStatus");
    console.log("All statuses in OrderStatus:", allStatuses.recordset);

    const statusResult = await pool
      .request()
      .query(
        "SELECT StatusId FROM OrderStatus WHERE StatusName = N'Đặt hàng thành công'"
      );

    console.log("Status query result:", statusResult.recordset);

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
      .input("statusId", sql.Int, statusId).query(`
        INSERT INTO Orders (UserId, OrderDate, TotalAmount, PaymentMethodId, StatusId)
        OUTPUT INSERTED.OrderId
        VALUES (@userId, GETDATE(), @totalAmount, @paymentMethodId, @statusId)
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
    res.status(500).json({ error: "Lỗi khi đặt hàng." });
  }
});

// Api lấy lịch sử đơn
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
        CONCAT('https://060e-171-251-212-26.ngrok-free.app', ImageURL) AS image,
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

// API lấy giỏ hàng của người dùng
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
          CONCAT('https://060e-171-251-212-26.ngrok-free.app', f.ImageURL) AS image,
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

// API thêm sản phẩm vào giỏ hàng
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
      return res.status(404).json({ error: "Không tìm thấy người dùng." });
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
        .input("newTotalPrice", sql.Decimal(18, 3), newTotalPrice).query(`
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
        .input("totalPrice", sql.Decimal(18, 3), totalPrice).query(`
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

// API cập nhật số lượng sản phẩm trong giỏ hàng
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
      .input("totalPrice", sql.Decimal(18, 3), totalPrice).query(`
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

// API xóa sản phẩm khỏi giỏ hàng
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
