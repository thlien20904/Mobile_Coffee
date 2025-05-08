const express = require("express");
const { connectDB, sql } = require("./db");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const router = express.Router();

router.use(cors());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "thuylien2k4@gmail.com",
    pass: "sjxtrgqgodaomlir",
  },
});

const otps = {};

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
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Vui lòng cung cấp email." });
  }

  try {
    const pool = await connectDB();
    const userResult = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query("SELECT * FROM Users WHERE Email = @email");

    if (userResult.recordset.length === 0) {
      return res.status(404).json({ error: "Email không tồn tại." });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    otps[email] = { code: otp, expires: Date.now() + 5 * 60 * 1000 };

    const mailOptions = {
      from: "thuylien2k4@gmail.com",
      to: email,
      subject: "Mã OTP để đặt lại mật khẩu",
      text: `Mã OTP của bạn là: ${otp}. Mã này có hiệu lực trong 5 phút.`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({
      message:
        "Mã OTP đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư hoặc thư rác.",
    });
  } catch (err) {
    console.error("Lỗi trong forgot-password:", err);
    res.status(500).json({ error: "Lỗi khi xử lý yêu cầu." });
  }
});

router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res
      .status(400)
      .json({ error: "Vui lòng cung cấp email và mã OTP." });
  }

  try {
    const storedOtp = otps[email];

    if (!storedOtp) {
      return res
        .status(400)
        .json({ error: "Mã OTP không tồn tại hoặc đã hết hạn." });
    }

    if (storedOtp.expires < Date.now()) {
      delete otps[email];
      return res.status(400).json({ error: "Mã OTP đã hết hạn." });
    }

    if (storedOtp.code !== otp) {
      return res.status(400).json({ error: "Mã OTP không hợp lệ." });
    }

    delete otps[email];
    res.status(200).json({ message: "Xác minh OTP thành công." });
  } catch (err) {
    console.error("Lỗi trong verify-otp:", err);
    res.status(500).json({ error: "Lỗi khi xác minh OTP." });
  }
});

router.post("/reset-password", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Vui lòng cung cấp email và mật khẩu mới." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Email không đúng định dạng." });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Mật khẩu phải có ít nhất 6 ký tự." });
  }

  try {
    const pool = await connectDB();
    const userResult = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query("SELECT * FROM Users WHERE Email = @email");

    if (userResult.recordset.length === 0) {
      return res.status(404).json({ error: "Email không tồn tại." });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    await pool
      .request()
      .input("email", sql.NVarChar, email)
      .input("passwordHash", sql.NVarChar, passwordHash)
      .query(
        "UPDATE Users SET PasswordHash = @passwordHash WHERE Email = @email"
      );

    res.status(200).json({ message: "Cập nhật mật khẩu thành công." });
  } catch (err) {
    console.error("Lỗi trong reset-password:", err);
    res.status(500).json({ error: "Lỗi khi cập nhật mật khẩu." });
  }
});

router.post("/check-username", async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Vui lòng cung cấp tên người dùng." });
  }

  try {
    const pool = await connectDB();
    const result = await pool
      .request()
      .input("username", sql.NVarChar, username)
      .query("SELECT * FROM Users WHERE Username = @username");

    if (result.recordset.length > 0) {
      res
        .status(400)
        .json({ exists: true, message: "Tên người dùng đã được sử dụng." });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (err) {
    console.error("Lỗi khi kiểm tra username:", err);
    res.status(500).json({ error: "Lỗi server." });
  }
});

router.post("/check-email", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Vui lòng cung cấp email." });
  }

  try {
    const pool = await connectDB();
    const result = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query("SELECT * FROM Users WHERE Email = @email");

    if (result.recordset.length > 0) {
      res.status(400).json({ exists: true, message: "Email đã được sử dụng." });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (err) {
    console.error("Lỗi khi kiểm tra email:", err);
    res.status(500).json({ error: "Lỗi server." });
  }
});

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
      const existingUsername = existingUser.recordset.some(
        (user) => user.Username === username
      );
      const existingEmail = existingUser.recordset.some(
        (user) => user.Email === email
      );

      if (existingUsername && existingEmail) {
        return res
          .status(400)
          .json({ error: "Tên người dùng và email đã được sử dụng." });
      } else if (existingUsername) {
        return res
          .status(400)
          .json({ error: "Tên người dùng đã được sử dụng." });
      } else {
        return res.status(400).json({ error: "Email đã được sử dụng." });
      }
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await pool
      .request()
      .input("username", sql.NVarChar, username)
      .input("email", sql.NVarChar, email)
      .input("passwordHash", sql.NVarChar, hashedPassword)
      .input("fullName", sql.NVarChar, fullName || null)
      .input("phone", sql.NVarChar, phone || null)
      .input("address", sql.NVarChar, address || null)
      .query(
        "INSERT INTO Users (Username, Email, PasswordHash, FullName, Phone, Address, Role) VALUES (@username, @email, @passwordHash, @fullName, @phone, @address, 'User')"
      );

    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (err) {
    console.error("Lỗi khi đăng ký:", err);
    res.status(500).json({ error: "Lỗi khi đăng ký người dùng." });
  }
});

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
    console.log("Kết nối cơ sở dữ liệu thành công");

    const result = await pool
      .request()
      .input("username", sql.NVarChar, username)
      .query("SELECT * FROM Users WHERE Username = @username");

    if (result.recordset.length === 0) {
      console.log("User not found:", username);
      return res.status(400).json({ error: "Tên người dùng không tồn tại." });
    }

    const user = result.recordset[0];
    console.log("User found:", user.FullName);

    let passwordMatch = false;
    const storedPassword = user["PasswordHash"];

    if (!storedPassword) {
      console.log("Mật khẩu không tồn tại trong cơ sở dữ liệu:", username);
      return res.status(400).json({ error: "Mật khẩu không tồn tại." });
    }

    if (storedPassword === password) {
      passwordMatch = true;
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      console.log(`Mật khẩu của ${username} đã được băm: ${hashedPassword}`);
      await pool
        .request()
        .input("username", sql.NVarChar, username)
        .input("passwordHash", sql.NVarChar, hashedPassword)
        .query(
          "UPDATE Users SET PasswordHash = @passwordHash WHERE Username = @username"
        );
      console.log(`Mật khẩu của ${username} đã được cập nhật thành công.`);
    } else {
      passwordMatch = await bcrypt.compare(password, storedPassword);
    }

    if (!passwordMatch) {
      console.log("Password incorrect for user:", username);
      return res.status(400).json({ error: "Mật khẩu không đúng." });
    }

    res.status(200).json({
      message: "Đăng nhập thành công!",
      user: {
        username: user["Username"],
        fullName: user.FullName,
        email: user.Email,
        phone: user.Phone,
        address: user.Address,
        avatarUrl: user.AvatarUrl
          ? `${process.env.NGROK_BASE_URL}${user.AvatarUrl}`
          : null,
        id: user.Id,
      },
    });
  } catch (err) {
    console.error("Error in login:", err.message);
    console.error("Stack trace:", err.stack);
    res.status(500).json({ error: "Lỗi khi đăng nhập.", details: err.message });
  }
});

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
          AvatarUrl AS avatarUrl,
          Id AS id
        FROM Users 
        WHERE Username = @username
      `);

    if (result.recordset.length === 0) {
      console.log("User not found:", username);
      return res.status(404).json({ error: "Không tìm thấy người dùng." });
    }

    const user = result.recordset[0];
    if (user.avatarUrl) {
      user.avatarUrl = `${process.env.NGROK_BASE_URL}${user.avatarUrl}`;
    }

    console.log("User info fetched successfully:", user);
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user info:", err);
    res.status(500).json({ error: "Lỗi khi lấy thông tin người dùng." });
  }
});

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

// Giữ nguyên route cũ nhưng đổi tên để tránh xung đột
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
//api lấy lịch sử đơn
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
//api hủy đơn
router.post("/cancel-order", async (req, res) => {
  const { orderId } = req.body;

  if (!orderId) {
    return res.status(400).json({ error: "Vui lòng cung cấp OrderId." });
  }

  try {
    const pool = await connectDB();

    // Kiểm tra trạng thái đơn hàng
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

    // Cập nhật trạng thái đơn hàng thành "Đã hủy" (giả sử bạn thêm trạng thái này)
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
