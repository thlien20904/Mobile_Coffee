// Import Express
const express = require("express");

// Import từng nhóm route riêng biệt
const authRoutes = require("./routes/auth"); // Xử lý đăng ký, đăng nhập
const userRoutes = require("./routes/user"); // Xử lý thông tin người dùng
const productRoutes = require("./routes/product"); // Xử lý sản phẩm
const cartRoutes = require("./routes/cart"); // Xử lý giỏ hàng
const orderRoutes = require("./routes/order"); // Xử lý đơn hàng
const storeRoutes = require("./routes/store"); // Xử lý cửa hàng

// Tạo đối tượng router để gom route
const router = express.Router();

// Sử dụng các route đã import (gắn trực tiếp vào /api nhờ file api.js)
router.use(authRoutes);
router.use(userRoutes);
router.use(productRoutes);
router.use(cartRoutes);
router.use(orderRoutes);
router.use(storeRoutes);

// Export router để dùng ở file api.js
module.exports = router;
