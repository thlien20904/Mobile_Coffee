const express = require("express");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");
const storeRoutes = require("./routes/store");

const router = express.Router();

// Sử dụng các route từ các file nhỏ
router.use(authRoutes);
router.use(userRoutes);
router.use(productRoutes);
router.use(cartRoutes);
router.use(orderRoutes);
router.use(storeRoutes);

module.exports = router;
