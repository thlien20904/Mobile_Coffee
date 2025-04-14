const express = require("express");
const routes = require("./routes");
const { connectDB } = require("./db");
const cors = require("cors");
const path = require("path");

const app = express();

// Cấu hình CORS
app.use(
  cors({
    origin: "*", // Cho phép tất cả origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Phục vụ file tĩnh từ thư mục "public" (cho ảnh avatar)
app.use(express.static(path.join(__dirname, "public")));

// Phục vụ file tĩnh từ thư mục "images" (cho ảnh sản phẩm)
app.use("/images", express.static(path.join(__dirname, "images")));

// Middleware để thêm header CORS cho các tài nguyên tĩnh (tùy chọn)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

// Sử dụng routes
app.use("/api", routes);

const port = 3000;

(async () => {
  console.log("🔍 Bắt đầu kiểm tra kết nối SQL Server...");
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`🚀 Server chạy tại http://localhost:${port}`);
    });
  } catch (err) {
    console.error(
      "❌ Không thể khởi động server do lỗi kết nối SQL Server:",
      err.message
    );
    process.exit(1);
  }
})();
