const express = require("express");
const routes = require("./routes");
const { connectDB } = require("./db"); // Import hàm kết nối database
const cors = require("cors"); // Import middleware CORS để cho phép truy cập từ bên ngoài
const path = require("path"); // Import path để xử lý đường dẫn file
// Tạo ứng dụng Express
const app = express();
// Load biến môi trường từ file .env
require("dotenv").config();

// Cấu hình CORS (Cross-Origin Resource Sharing)
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
// Cho phép server tự động parse dữ liệu JSON từ request body
app.use(express.json());

// Sử dụng routes
app.use("/api", routes);
// Cổng mà server sẽ chạy (3000)
const port = 3000;
// Hàm khởi động server, trước khi chạy sẽ kiểm tra kết nối CSDL
(async () => {
  console.log("🔍 Bắt đầu kiểm tra kết nối SQL Server...");
  try {
    await connectDB(); // Gọi hàm kết nối database
    app.listen(port, () => {
      console.log(`🚀 Server chạy tại http://localhost:${port}`);
    });
  } catch (err) {
    console.error(
      "❌ Không thể khởi động server do lỗi kết nối SQL Server:",
      err.message
    );
    process.exit(1); // Dừng chương trình nếu lỗi
  }
})();
